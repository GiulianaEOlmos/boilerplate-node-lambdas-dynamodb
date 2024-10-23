import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";
import * as dynamoose from "dynamoose";

export class UserController {
  async createUser(userData: { name: string; email: string }) {
    try {
      const user = new User({ userId: uuidv4(), ...userData });
      await user.save({
        overwrite: false,
        return: "item",
      });
    } catch (error) {
      throw new Error(`Failed to create User ${error}`);
    }
  }

  async deleteUser(userData: { userId: string }) {
    try {
      const user = new User(userData);
      await user.delete();
      return user;
    } catch (error) {
      throw new Error(`Failed to delete User ${error}`);
    }
  }

  async updateUser(userData: {
    userId: string;
    name?: string;
    email?: string;
  }) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw new Error(`Failed to update User ${error}`);
    }
  }

  async getUsers() {
    try {
      return await User.scan().exec();
    } catch (error) {
      throw new Error(`Failed to get Users ${error}`);
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

      const response = await dynamoose.transaction(transactionItems);
      console.log({ response });
      return response;
    } catch (error) {
      throw new Error(`Failed to create Users by transaction ${error}`);
    }
  }
}
