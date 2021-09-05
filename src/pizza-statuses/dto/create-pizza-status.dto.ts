import { IsMultiRequired } from '@decorators/validation';
import { ModelLanguage } from '@models/language.model';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePizzaStatusDto {

    @ApiProperty({ required: true, type: ModelLanguage, default: new ModelLanguage() })
    @IsMultiRequired({ each: false })
    name: ModelLanguage;

    @ApiProperty({ required: true, type: Number, default: 0 })
    status: number;

}
