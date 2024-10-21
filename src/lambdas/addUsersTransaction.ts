export const handler = async () => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "addUsersTransaction Lambda triggered" }),
    };
  } catch (error) {
    console.error("Error starting addUsersTransaction Lambda:", error);
    throw new Error("Failed to trigger addUsersTransaction Lambda");
  }
};
