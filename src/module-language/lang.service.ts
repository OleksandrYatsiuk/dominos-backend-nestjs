import { ELanguage } from '@models/language.model';
import { Injectable } from '@nestjs/common';



@Injectable()
export class LangService {

    private _lang: ELanguage = ELanguage.uk;

    getLang(): ELanguage {
        return this._lang;
    }
    setLang(lang: ELanguage): void {
        this._lang = lang;
    }

}
