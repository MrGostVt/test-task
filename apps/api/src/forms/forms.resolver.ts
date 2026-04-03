import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FormsService } from './forms.service';
import { FormDto } from './dto/form.dto';
import { InputFormDto } from './dto/inputForm.dto';
import { InputUserAnswersDto } from './dto/inputUserAnswers.dto';
import { StatusResponce } from './dto/status.dto';

@Resolver(() => FormDto)
export class FormsResolver {
    constructor(private readonly formsService: FormsService) {}
    @Query(() => [FormDto])
    forms() {
        return this.formsService.get();
    }

    @Query(() => FormDto, { nullable: true, })
    form(@Args('id', { type: () => Int }) id: number) {
        return this.formsService.getForm(id);
    }

    @Query(() => [FormDto], { nullable: true })
    answers(@Args('id', { type: () => Int }) id: number) {
        return this.formsService.getForm(id);
    }
    
    @Mutation(() => StatusResponce)
    createForm(
        @Args('data') data: InputFormDto
    ) {
        return {success: this.formsService.createForm(data)};
    }
    
    @Mutation(() => StatusResponce)
    fillForm(
        @Args('userAnswers') userAnswers: InputUserAnswersDto,
        @Args('formId') formId: number,
    ) {
        return {success: this.formsService.fillForm(formId, userAnswers)};
    }
}
