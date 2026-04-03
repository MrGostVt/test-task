import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserAnswerDto } from './user-answer.dto';
import { QuestionDto } from './question.dto';
import { Type } from 'class-transformer';

@ObjectType()
export class FormDto {
  @Field(() => ID)
  @Type(() => Number)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [QuestionDto])
  questions: QuestionDto[];

  @Field(() => [[UserAnswerDto]])
  userAnswers?: UserAnswerDto[][];
}