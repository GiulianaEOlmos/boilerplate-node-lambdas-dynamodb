import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
import * as dynamoose from "dynamoose";

export class UserController {
  async createUser(userData: { name: string; email: string }) {
    try {
      const user = new User({ userId: uuidv4(), ...userData });
      return await user.save({ overwrite: false, return: "item" });
    } catch (error) {
      throw new Error("Failed to create User");
    }
  }

  async deleteUser(userData: { userId: string }) {
    try {
      const user = new User(userData);
      return await user.delete();
    } catch (error) {
      throw new Error("Failed to delete User");
    }
  }

  async updateUser(userData: { id: string; name?: string; email?: string }) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      throw new Error("Failed to update User");
    }
  }

  async getUsers() {
    try {
      return await User.scan().exec();
    } catch (error) {
      throw new Error("Failed to get Users");
    }
  }

  //https://dynamoosejs.com/guide/Transaction
  async createUsersByTransaction(usersData: { name: string; email: string }[]) {
    try {
      const transactionItems = usersData.map((userData) => {
        return User.transaction.create({
          userId: uuidv4(),
          ...userData,
        });
      });

      await dynamoose.transaction(transactionItems);
    } catch (error) {
      throw new Error("Failed to create Users by transaction");
    }
  }
}
