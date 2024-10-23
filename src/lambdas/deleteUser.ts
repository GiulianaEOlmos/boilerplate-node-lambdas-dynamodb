import { UserController } from "../controller/userController";

export const handler = async (event: any) => {
  console.log("Event: ", JSON.stringify(event));
  try {
    const userCtrl = new UserController();
    const response = await userCtrl.deleteUser(event.body.id);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `User deleted`, response }),
    };
  } catch (error) {
    console.error("Error running deleteUser Lambda:", error);
    throw new Error("Failed to run deleteUser Lambda");
  }
};
