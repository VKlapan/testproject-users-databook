import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

/** DTO for creating a user */
export class CreateUserDto {
  /** User full name */
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  /** User email */
  @IsEmail({}, { message: 'Email is invalid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  /** User phone number */
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  /** User birthday (DD-MM-YYYY) */
  @IsString()
  @IsNotEmpty({ message: 'Birthday is required' })
  birthday: string;
} 
