// src/questions/dto/create-question.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  readonly company: string;
}
