import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UserController } from "../controller/userController";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Event: ", JSON.stringify(event));
  const { userId } = JSON.parse(event.body || "{}");

  try {
    const userCtrl = new UserController();
    const response = await userCtrl.deleteUser(userId);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User deleted`, response }),
    };
  } catch (error) {
    console.error("Error running deleteUser Lambda:", error);
    throw new Error("Failed to run deleteUser Lambda");
  }
};
