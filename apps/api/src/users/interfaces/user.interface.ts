import { Document } from 'mongoose';

/**
 * User document interface.
 */
export interface User extends Document {
  /** Full name */
  name: string;
  /** Email address */
  email: string;
  /** Phone number */
  phone: string;
  /** Birthday in DD-MM-YYYY format */
  birthday: string;
} 
