import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get('get-users')
  async getUsers(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') search: string, // може бути name/email/phone
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;

    return this.usersService.getUsers({ page: pageNum, limit: limitNum, search });
  }
  
  @Get("get-user/:id")
  async getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post("add-user")
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
