import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';

import { CreateUserDto } from './dto/create-user.dto';
@Controller('newUser')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<User> {
    // Construct CreateUserDto instance
    const createUserDto: CreateUserDto = {
      email,
      password: password,
      // Include other necessary properties if any
    };
    const result = await this.usersService.create(createUserDto);
    return result;
  }
}
