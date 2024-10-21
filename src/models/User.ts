import * as dynamoose from "dynamoose";

const UserSchema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: String,
  email: String,
  age: Number,
});

export const User = dynamoose.model(process.env.TABLE_NAME!, UserSchema);
