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
    readonly uk: string;
    readonly ru: string;
    readonly en: string;
    constructor({ uk = null, ru = null, en = null }: Partial<ILanguage> = {}) {
        this.uk = uk;
        this.ru = ru;
        this.en = en;
    }
}