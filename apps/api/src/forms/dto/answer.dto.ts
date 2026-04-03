import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@ObjectType()
export class AnswerDto {
    @Field(() => ID)
    @Type(() => Number)
    id: number;
  
    @Field()
    value: string;
}