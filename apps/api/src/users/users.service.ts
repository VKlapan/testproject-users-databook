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
    return this.userModel.find();
  }
  
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
  async addUser(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  count() {
    return this.userModel.countDocuments();
  }

  async bulkCreate(users: Partial<User>[]) {
    return this.userModel.insertMany(users);
  }
}
