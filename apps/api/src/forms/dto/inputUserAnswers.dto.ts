import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

@InputType()
export class InputUserAnswerDto{
    @Field(() => ID)
    @Type(() => Number)
    @IsNumber({allowNaN: false})
    questionId: number;
  
    @Field(() => [String])
    @IsArray()
    answers: (number | string)[];
}

@InputType()
export class InputUserAnswersDto{
    @Field(() => [InputUserAnswerDto])
    @ValidateNested({ each: true })
    @Type(() => InputUserAnswerDto)
    answers: InputUserAnswerDto[];
}