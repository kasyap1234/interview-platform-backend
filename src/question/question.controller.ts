// src/questions/question.controller.ts
import {
  Param,
  Get,
  Post,
  Put,
  Delete,
  Controller,
  Req,
  Body,
} from '@nestjs/common';

import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { LocalAuthGuard } from 'src/auth/local-auth.strategy';
// import { RolesGuard } from 'src/auth/roles.guard';
// import { Roles } from 'src/auth/roles.decorator';
// import { UseGuards } from '@nestjs/common';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('admin', 'user')
  async create(@Req() req, @Body() createQuestionDto: CreateQuestionDto) {
    // The logged-in user's information is available in req.user
    // You can use this information to set the author of the question, if needed
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  async findAll() {
    return this.questionService.findAll();
  }
 
  @Get(':id')
  async findOne(@Param('id') _id: string) {
    return this.questionService.findOneById(_id);
  }
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
  @Get(':company')
  async findByCompany(@Param('company') company: string) {
    return this.questionService.findByCompany(company);
  }
}
