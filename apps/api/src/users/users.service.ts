import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UsersService {
      constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

    async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
