import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { AnswerDto } from './answer.dto';
import { Type } from 'class-transformer';

@ObjectType()
export class QuestionDto {
  @Field(() => ID)
  @Type(() => Number)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  type: number;

  @Field(() => [AnswerDto])
  answers: AnswerDto[];

  @Field(() => [String])
  rightAnswers?: string[];
}