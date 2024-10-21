import { updateUser } from "../helpers/handleUser";

export const handler = async (event: any) => {
  console.log("Event: ", JSON.stringify(event));
  try {
  } catch (error) {
    console.error("Error running updateUser Lambda:", error);
    throw new Error("Failed to run updateUser Lambda");
  }
};
