import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ValidationException } from './validation.exception';


export interface ICustomValidationError {
    field: string;
    value: string;
    key: string;
    originMessage: { [x: string]: string };
}

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {

    constructor(private _i18n: I18nService) { }

    async catch(exception: ValidationException, host: ArgumentsHost) {

        const result = [];
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const messages: ICustomValidationError[] = exception.validationErrors.map(e =>
        ({
            field: e.property,
            value: e.value,
            key: Object.keys(e.constraints)[0],
            originMessage: e.constraints
        }));



        for (let index = 0; index < messages.length; index++) {
            const message = messages[index];
            this._transform(message);
            const field = await this._i18n.translate(`fields.${message.field}`);
            const msg = await this._i18n.translate(`validations.${message.key}`,
                { args: { field, value: message.value } });
            result.push({ field: message.field, message: msg })
        }


        response.status(HttpStatus.BAD_REQUEST).json({ validation: result })
    }



    private _transform(message: ICustomValidationError): void {
        switch (message.key) {
            case 'min':
                message.value = message.originMessage[message.key].replace(/^\D+/g, '');
                break;
            case 'max':
                message.value = message.originMessage[message.key].replace(/^\D+/g, '');
                break;
            default:
                break;
        }
    }
}