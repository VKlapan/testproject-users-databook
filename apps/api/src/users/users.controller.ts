import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Controller that handles user-related endpoints.
 * Routes: GET /get-users, GET /get-user/:id, POST /add-user
 */
@Controller()
export class UsersController {
    /**
     * Construct a new UsersController
     * @param usersService Users service
     */
    constructor(private readonly usersService: UsersService) {}

  @Get('get-users')
  /**
   * Return paginated users.
   * @param page page number (string; parsed to int)
   * @param limit items per page (string; parsed to int)
   * @param search optional search string (name/email/phone)
   */
  async getUsers(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string,
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    return this.usersService.getUsers({ page: pageNum, limit: limitNum, search });
  }

  @Get("get-user/:id")
  /**
   * Get a user by id.
   * @param id user id
   */
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post("add-user")
  /**
   * Add a new user.
   * @param user CreateUserDto
   * @returns created user or undefined on failure
   */
  async addUser(@Body() user: CreateUserDto) {
    const addedUser = await this.usersService.addUser(user);
    if (!addedUser) {
      console.error('Failed to add user');
      return;
    }
    console.log(`User with id ${addedUser._id} added.`);
    return addedUser;
  }
}
