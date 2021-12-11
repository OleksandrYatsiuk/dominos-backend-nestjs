import { ApiProperty } from '@nestjs/swagger';
import { ELanguage } from './language.model';

export class LanguageHeaderDto {
    @ApiProperty({ enum: [ELanguage.uk, ELanguage.ru, ELanguage.en], required: true })
    lang: ELanguage
}