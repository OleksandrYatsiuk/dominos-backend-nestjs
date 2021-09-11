import { ModelLanguage } from '@models/language.model';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { CreatePromotionDto } from './create-promotion.dto';

export class UpdatePromotionDto extends OmitType(CreatePromotionDto, ['name', 'description', 'image']) {
    @ApiProperty({
        required: true,
        type: ModelLanguage,
        default: new ModelLanguage()
    })
    name: ModelLanguage;


    @ApiProperty({
        required: false,
        type: ModelLanguage,
        default: new ModelLanguage()
    })
    description: ModelLanguage;


    @ApiProperty({ required: false, type: String, default: null })
    image: string;

}
