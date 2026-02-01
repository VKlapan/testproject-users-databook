import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
/**
 * Service for user-related data operations.
 *
 * Provides methods for listing, retrieving and creating users.
 */
export class UsersService {
  /**
   * Create users service.
   * @param userModel Mongoose model for User
   */
      constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  /**
   * Get paginated users with optional search.
   * @param options pagination and optional search params
   */
  async getUsers(options: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = options;

    const query: any = {};

    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

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

  /**
   * Get single user by id.
   * @param id user's id
   */
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
  /**
   * Add new user to database.
   * @param user CreateUserDto
   * @returns created User document
   */
  async addUser(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * Count all users.
   * @returns number of users
   */
  count() {
    return this.userModel.countDocuments();
  }

  /**
   * Insert users in bulk.
   * @param users array of user partials
   */
  async bulkCreate(users: Partial<User>[]) {
    return this.userModel.insertMany(users);
  }
}
