import { ApiProperty } from "@nestjs/swagger";

export interface ILanguage {
    uk: string;
    ru: string;
    en: string;
}

export enum ELanguage {
    uk = 'uk',
    ru = 'ru',
    en = 'en'
}

export class ModelLanguage implements Readonly<ILanguage> {
    @ApiProperty({ type: String, default: '' })
    readonly uk: string;
    @ApiProperty({ type: String, default: '' })
    readonly ru: string;
    @ApiProperty({ type: String, default: '' })
    readonly en: string;
    constructor({ uk = '', ru = '', en = '' }: Partial<ILanguage> = {}) {
        this.uk = uk;
        this.ru = ru;
        this.en = en;
    }
}