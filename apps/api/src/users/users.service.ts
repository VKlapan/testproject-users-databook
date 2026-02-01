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

  async getUsers(options: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = options;

    const query: any = {};

    if (search) {
      // Екранізуємо спецсимволи для regex
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Часткове співпадіння для name/email/phone
      query.$or = [
        { name: { $regex: escapedSearch, $options: 'i' } },
        { email: { $regex: escapedSearch, $options: 'i' } },
        { phone: { $regex: escapedSearch, $options: 'i' } },
      ];
    }


    const total = await this.userModel.countDocuments(query);
    const totalPages = Math.max(Math.ceil(total / limit), 1);

  
    const currentPage = page > totalPages ? totalPages : page;

    const users = await this.userModel
      .find(query)
      .skip((currentPage - 1) * limit)
      .limit(limit)
      .exec();

    return {
      data: users,
      total,
      currentPage,
      pages: Math.ceil(total / limit),
    };
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
