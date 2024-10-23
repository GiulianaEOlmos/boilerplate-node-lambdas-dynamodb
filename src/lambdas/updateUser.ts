import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "../controller/userController";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Event: ", JSON.stringify(event));
  const userData = JSON.parse(event.body || "{}");

  try {
    const userCtrl = new UserController();
    const response = await userCtrl.updateUser(userData);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User updated", response }),
    };
  } catch (error) {
    console.error("Error creating User:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create User" }),
    };
  }
};
