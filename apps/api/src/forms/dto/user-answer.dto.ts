import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class UserAnswerDto {
  @Field(() => ID)
  @Type(() => Number)
  questionId: number;

  @Field(() => [String])
  answers: (number | string)[];
}