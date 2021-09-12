import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { LangService } from 'src/module-language/lang.service';
import { ELanguage } from '@models/language.model';

@Injectable()
export class LangInterceptor implements NestInterceptor {
  constructor(private _ls: LangService) {

  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    const lang = request.headers['lang'] as ELanguage || this._ls.getLang();
    this._ls.setLang(lang);
    return next.handle();
  }
}
