import { v4 as uuidv4 } from "uuid";
import { User } from "../models/User";

export class UserController {
  async createUser(userData: { name: string; email: string }) {
    const user = new User({ userId: uuidv4(), ...userData });
    await user.save();
  }

  async deleteUser(userData: { userId: string }) {}

  async updateUser(userData: { id: string; name?: string; email?: string }) {}

  async getUsers() {
    return await User.scan().exec();
  }

  async createUsersByTransaction() {}
}
