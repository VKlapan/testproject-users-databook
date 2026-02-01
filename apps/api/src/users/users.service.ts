import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
/**
 * Service managing user data.
 */
export class UsersService {
  /**
   * Injects the `User` mongoose model.
   * @param userModel Mongoose model for User
   */
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  /**
   * Returns paginated users with optional search by name, email or phone.
   * @param options Pagination and optional search params.
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
   * Returns a single user by id.
   * @param id User id.
   * @returns User document or null.
   */
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
  /**
   * Adds a new user to the database.
   * @param user Data to create a user.
   * @returns Created User document.
   */
  async addUser(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  /**
   * Returns number of users.
   * @returns Count of users.
   */
  count() {
    return this.userModel.countDocuments();
  }

  /**
   * Inserts multiple users in bulk.
   * @param users Array of user partials.
   */
  async bulkCreate(users: Partial<User>[]) {
    return this.userModel.insertMany(users);
  }
}
