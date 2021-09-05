import { IsMultiRequired } from "@decorators/validation";
import { ModelLanguage } from "@models/language.model";
import { ApiProperty } from "@nestjs/swagger";

export class CreateIngredientDto {
    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @IsMultiRequired({ each: false })
    name: ModelLanguage;
}
