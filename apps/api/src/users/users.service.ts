import { Model } from 'mongoose';
import { Injectable, Inject, Logger, InternalServerErrorException } from '@nestjs/common';
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

  private readonly logger = new Logger(UsersService.name);

  /**
   * Returns paginated users with optional search by name, email or phone.
   * @param options Pagination and optional search params.
   * @returns Promise<{data: User[]; total: number; currentPage: number; pages: number}>
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
   * @returns Promise<User | null>
   */
  async getUserById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
  /**
   * Create a new user.
   *
   * Duplicate key and Mongoose validation errors are handled by the global
   * MongoExceptionFilter. Unexpected errors are logged and a generic 500 is
   * returned to the client.
   * @param user Data to create a user.
   * @returns Created User document.
   */
  async addUser(user: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      return await newUser.save();
    } catch (error: any) {
      if (error?.code === 11000 || error?.name === 'ValidationError') {
        throw error;
      }

      this.logger.error('Failed to create user', error?.stack || error?.message || String(error));

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  /**
   * Returns number of users.
   * @returns Promise<number>
   */
  count() {
    return this.userModel.countDocuments();
  }

  /**
   * Inserts multiple users in bulk.
   * Performs unordered insert (ordered: false). Logs errors but does not throw;
   * returns count of successfully inserted documents.
   * @param users Array of user partials.
   * @returns Promise<{count: number}>
   */
  async bulkCreate(users: Partial<User>[]): Promise<{ count: number }> {
    try {
      const result = await this.userModel.insertMany(users, { ordered: false });
      return { count: result.length };
    } catch (error: any) {
      this.logger.error('Bulk insert encountered errors', error?.stack || error?.message || String(error));
      return { count: 0 };
    }
  }
}
