// src/users/user.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  //this.logger.log(`Creating new user with email: ${createUserDto.email}`);
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({
      ...createUserDto,
      email: createUserDto.email.toLowerCase(),
    });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    this.logger.log(`Finding user by email: ${email}`);
    return this.userModel.findOne({ email }).exec();
  }

 
}
