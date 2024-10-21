export const handler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "getUsers Lambda triggered" }),
    };
  } catch (error) {
    console.error("Error starting getUsers Lambda:", error);
    throw new Error("Failed to trigger getUsers Lambda");
  }
};
