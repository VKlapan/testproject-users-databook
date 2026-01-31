import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  birthday: String,
});
