import { buildMessage, ValidateBy, ValidationOptions } from 'class-validator';


export const MATCH = 'match';


export function match(actual: string, expected: string): boolean {
    return actual === expected;
}


export function Match(property: string, validationOptions?: ValidationOptions) {

    return ValidateBy({
        name: MATCH,
        constraints: [property],
        validator: {
            validate: (value, args): boolean => match(value, args.object[args.constraints[0]]),
            defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property not matched with $constraint1',
                validationOptions),
        },
    }, validationOptions)
}