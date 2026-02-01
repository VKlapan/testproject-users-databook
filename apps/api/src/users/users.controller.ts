import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Get("get-users")
  async getAllUsers() {
    return this.usersService.getAllUsers();
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
