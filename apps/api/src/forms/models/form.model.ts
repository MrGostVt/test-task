import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class Answer {
  @Field(() => ID)
  id: string;

  @Field()
  value: string;
}

@ObjectType()
export class Form {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => [Answer], { nullable: true })
  answers?: Answer[];
}