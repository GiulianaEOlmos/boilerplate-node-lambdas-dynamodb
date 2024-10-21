import * as dynamoose from "dynamoose";

const UserSchema = new dynamoose.Schema({
  userId: {
    type: String,
    hashKey: true,
  },
  name: String,
  email: String,
});

export const User = dynamoose.model(process.env.TABLE_NAME!, UserSchema);
