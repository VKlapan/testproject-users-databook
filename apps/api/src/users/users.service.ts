import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    async getAllUsers() : Promise<string> {
        return `This action returns all users from UsersService`;
    }
}
