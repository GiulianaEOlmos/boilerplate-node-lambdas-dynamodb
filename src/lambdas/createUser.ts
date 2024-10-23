import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "../controller/userController";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userData = JSON.parse(event.body || "{}");
  try {
    const userCtrl = new UserController();
    const response = await userCtrl.createUser(userData);
    console.log("User created:", response);
    console.log({ userData });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User created`, response }),
    };
  } catch (error) {
    console.error("Error creating User:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create User" }),
    };
  }
};
