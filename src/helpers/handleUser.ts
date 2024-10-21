import { DynamoDB } from "aws-sdk";


export const addUser = async (userData: {
  id: string;
  name: string;
  email: string;
}) => {};

export const deleteUser = async (userData: { id: string }) => {};

export const updateUser = async (userData: {
  id: string;
  name?: string;
  email?: string;
}) => {};
