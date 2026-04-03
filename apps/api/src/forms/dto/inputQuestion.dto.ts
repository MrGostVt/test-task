import { Field, ID, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";

@InputType()
export class InputAnswersDto {
    @Field(() => ID )
    @Type(() => Number)
    @IsNumber({allowNaN: false})
    id: number;
  
    @Field()
    @IsString()
    value: string;
}

@InputType()
export class InputQuestionDto{
    @Field(() => ID)
    @Type(() => Number)
    @IsNumber({allowNaN: false})
    id: number;

    @Field()
    @IsString()
    title: string;

    @Field(() => Int)
    @IsNumber()
    @Min(0)
    @Max(3)
    type: number;

    @Field(() => [InputAnswersDto])
    @ValidateNested({ each: true })
    @Type(() => InputAnswersDto)
    answers: InputAnswersDto[];

    @Field(() => [String], { nullable: true })
    @IsOptional()
    rightAnswers?: string[];
}