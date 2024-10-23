import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "../controller/userController";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userData = JSON.parse(event.body || "[]");
  try {
    const userCtrl = new UserController();
    await userCtrl.createUsersByTransaction(userData);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Users created` }),
    };
  } catch (error) {
    console.error("Error creating Users:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create Users" }),
    };
  }
};
