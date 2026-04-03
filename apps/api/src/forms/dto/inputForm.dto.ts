import { Field, InputType } from "@nestjs/graphql";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { InputQuestionDto } from "./inputQuestion.dto";
import { Type } from "class-transformer";

@InputType()
export class InputFormDto{
    @Field()
    @IsString()
    name: string;
  
    @Field()
    @IsString()
    description: string;
  
    @Field(() => [InputQuestionDto])
    @ValidateNested({ each: true })
    @Type(() => InputQuestionDto)
    questions: InputQuestionDto[];
}