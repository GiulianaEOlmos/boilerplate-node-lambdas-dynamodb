import { UserController } from "../controller/userController";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
import * as dynamoose from "dynamoose";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

jest.mock("../models/User", () => {
  const mockUserConstructor = jest.fn();
  return {
    User: Object.assign(mockUserConstructor, {
      transaction: {
        create: jest.fn(),
      },
    }),
  };
});

jest.mock("dynamoose", () => {
  const actualDynamoose = jest.requireActual("dynamoose");
  return {
    ...actualDynamoose,
    transaction: jest.fn(),
  };
});

describe("UserController - createUser", () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
  });

  it("should create a user successfully", async () => {
    const mockUserData = { name: "John Doe", email: "john@example.com" };
    const mockUuid = "1234-5678-uuid";

    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
    const mockUserSave = jest.fn().mockResolvedValue({});
    User.mockImplementation(() => ({
      save: mockUserSave,
    }));

    await userController.createUser(mockUserData);

    expect(uuidv4).toHaveBeenCalled();
    expect(mockUserSave).toHaveBeenCalledWith({
      overwrite: false,
      return: "item",
    });
  });

  it("should throw an error if creating user fails", async () => {
    const mockUserData = { name: "John Doe", email: "john@example.com" };
    const mockUuid = "1234-5678-uuid";

    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
    const mockUserSave = jest.fn().mockRejectedValue(new Error("DB Error"));
    User.mockImplementation(() => ({
      save: mockUserSave,
    }));

    await expect(userController.createUser(mockUserData)).rejects.toThrow(
      "Failed to create User Error: DB Error"
    );
  });
});

describe("UserController - deleteUser", () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
  });

  it("should delete a user successfully", async () => {
    const mockUserId = "1234-5678";
    const mockUser = {
      delete: jest.fn().mockResolvedValue({}),
    };
    User.get = jest.fn().mockResolvedValue(mockUser);

    await userController.deleteUser({ userId: mockUserId });

    expect(User.get).toHaveBeenCalledWith(mockUserId);
    expect(mockUser.delete).toHaveBeenCalled();
  });

  it("should throw an error if user is not found", async () => {
    const mockUserId = "1234-5678";
    User.get = jest.fn().mockResolvedValue(null);

    await expect(
      userController.deleteUser({ userId: mockUserId })
    ).rejects.toThrow(`User with ID ${mockUserId} not found`);
  });

  it("should throw an error if deleting user fails", async () => {
    const mockUserId = "1234-5678";
    const mockUser = {
      delete: jest.fn().mockRejectedValue(new Error("Delete Error")),
    };
    User.get = jest.fn().mockResolvedValue(mockUser);

    await expect(
      userController.deleteUser({ userId: mockUserId })
    ).rejects.toThrow("Failed to delete User Error: Delete Error");
  });
});

describe("UserController - updateUser", () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
  });

  it("should update a user successfully", async () => {
    const mockUserId = "1234-5678";
    const mockUserData = {
      userId: mockUserId,
      name: "Jane Doe",
      email: "jane@example.com",
    };
    const mockUser = {
      name: "John Doe",
      email: "john@example.com",
      save: jest.fn().mockResolvedValue(mockUserData),
      userId: mockUserId,
    };
    User.get = jest.fn().mockResolvedValue(mockUser);

    const updatedUser = await userController.updateUser(mockUserData);

    expect(User.get).toHaveBeenCalledWith(mockUserId, { return: "item" });
    expect(mockUser.name).toEqual("Jane Doe");
    expect(mockUser.email).toEqual("jane@example.com");
    expect(mockUser.save).toHaveBeenCalled();

    expect(updatedUser).toMatchObject(mockUserData);
  });

  it("should throw an error if user is not found", async () => {
    const mockUserId = "1234-5678";
    User.get = jest.fn().mockResolvedValue(null);

    await expect(
      userController.updateUser({ userId: mockUserId })
    ).rejects.toThrow(`User with ID ${mockUserId} not found`);
  });
});

describe("UserController - getUsers", () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
  });

  it("should retrieve users successfully", async () => {
    const mockUsers = [
      { userId: "1", name: "User 1" },
      { userId: "2", name: "User 2" },
    ];
    User.scan = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUsers),
    });

    const users = await userController.getUsers();
    expect(users).toEqual(mockUsers);
  });

  it("should throw an error if retrieving users fails", async () => {
    User.scan = jest.fn().mockReturnValue({
      exec: jest.fn().mockRejectedValue(new Error("Scan Error")),
    });

    await expect(userController.getUsers()).rejects.toThrow(
      "Failed to get Users Error: Scan Error"
    );
  });
});

describe("UserController - createUsersByTransaction", () => {
  let userController: UserController;

  beforeEach(() => {
    userController = new UserController();
  });

  jest.mock("../models/User", () => ({
    User: {
      transaction: {
        create: jest.fn(),
      },
    },
  }));

  it("should create users by transaction successfully", async () => {
    const mockUsersData = [
      { name: "User 1", email: "user1@example.com" },
      { name: "User 2", email: "user2@example.com" },
    ];

    const mockTransactionItems = mockUsersData.map((userData) => ({
      userId: "mock-uuid",
      ...userData,
    }));

    (uuidv4 as jest.Mock).mockReturnValue("mock-uuid");

    // Mock `User.transaction.create` to return the expected transaction item
    (User.transaction.create as jest.Mock).mockImplementation(
      (userData) => userData
    );

    // Mock `dynamoose.transaction` to resolve successfully
    (dynamoose.transaction as jest.Mock).mockResolvedValue({});

    await userController.createUsersByTransaction(mockUsersData);

    // Ensure the correct transaction was created and called
    expect(User.transaction.create).toHaveBeenCalledTimes(mockUsersData.length);
    expect(dynamoose.transaction).toHaveBeenCalledWith(mockTransactionItems);
  });

  it("should throw an error if transaction fails", async () => {
    const mockUsersData = [{ name: "User 1", email: "user1@example.com" }];

    (uuidv4 as jest.Mock).mockReturnValue("mock-uuid");

    // Mock `User.transaction.create` as usual
    (User.transaction.create as jest.Mock).mockImplementation(
      (userData) => userData
    );

    // Mock `dynamoose.transaction` to reject with an error
    (dynamoose.transaction as jest.Mock).mockRejectedValue(
      new Error("Transaction Error")
    );

    await expect(
      userController.createUsersByTransaction(mockUsersData)
    ).rejects.toThrow(
      "Failed to create Users by transaction Error: Transaction Error"
    );
  });
});
