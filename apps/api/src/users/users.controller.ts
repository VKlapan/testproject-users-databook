import { Body, Controller, Get, Logger, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../common/decorators/public.decorator';

/**
 * Controller exposing user endpoints.
 */
@Controller()
export class UsersController {
    private readonly logger = new Logger(UsersController.name);
  /**
   * Create UsersController.
   * @param usersService UsersService instance.
   */
  constructor(private readonly usersService: UsersService) {}

  @Get('get-users')
  /**
   * Returns paginated users.
   * @param page Page number.
   * @param limit Items per page.
   * @param search Optional search term.
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
   * Returns a user by id.
   * @param id User id.
   */
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Public()
  @Post("add-user")
  /**
   * Registers a new user (public).
   * @param user CreateUserDto
   * @returns Created user without sensitive fields.
   */
  async addUser(@Body() user: CreateUserDto) {
    const addedUser = await this.usersService.addUser(user);
    this.logger.log(`User with id ${addedUser._id} added.`);
    return addedUser;
  }
}
