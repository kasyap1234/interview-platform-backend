// src/questions/schemas/question.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  content: string;

  @Prop()
  company: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
