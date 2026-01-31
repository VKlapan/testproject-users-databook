import { Document } from 'mongoose';

export interface User extends Document {
  name: string;
  phone: string;
  birthday: string;
}
