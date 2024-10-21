export const handler = async (event: any) => {
  console.log("Event: ", JSON.stringify(event));
  try {
  } catch (error) {
    console.error("Error running deleteUser Lambda:", error);
    throw new Error("Failed to run deleteUser Lambda");
  }
};
