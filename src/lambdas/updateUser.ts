import { UserController } from "../controller/userController";

export const handler = async (event: any) => {
  console.log("Event: ", JSON.stringify(event));
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User created" }),
    };
  } catch (error) {
    console.error("Error creating User:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create User" }),
    };
  }
};
