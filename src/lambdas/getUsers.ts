import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "../controller/userController";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Event: ", JSON.stringify(event));
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
