import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StatusResponce {
  @Field()
  success: boolean;
}