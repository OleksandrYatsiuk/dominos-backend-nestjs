import { ILanguage } from '@models/language.model';
import { buildMessage, registerDecorator, ValidationOptions } from 'class-validator';


export const MULTI_REQUIRED = 'isMultiRequired';
export const PARTIAL_MULTI_REQUIRED = 'isPartialMultiRequired';

/**
 * Checks is multi language fields contains value
 */
export function isMultiRequired(value: ILanguage): boolean {
    return Object.values(value).every(val => val);
}

/**
 * Checks is  at least one field contains value
 */
export function isPartialMultiRequired(value: ILanguage): boolean {
    return Object.values(value).some(key => key);
}

export function IsMultiRequired(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: validationOptions?.each ? MULTI_REQUIRED : PARTIAL_MULTI_REQUIRED,
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: ILanguage) {
                    return validationOptions?.each ? isMultiRequired(value) : isPartialMultiRequired(value)
                },
                defaultMessage: buildMessage(() => validationOptions?.each ?
                    '$property must be filled in all languages.' : '$property must be filled in at least one language.',
                    validationOptions
                ),
            },
        });
    };
}