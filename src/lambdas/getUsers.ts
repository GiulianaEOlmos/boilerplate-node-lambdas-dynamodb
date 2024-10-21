import { UserController } from "../controller/userController";

export const handler = async () => {
  try {
    const userCtrl = new UserController();
    const users = await userCtrl.getUsers();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User created", response: users }),
    };
  } catch (error) {
    console.error("Error creating User:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create User" }),
    };
  }
};
