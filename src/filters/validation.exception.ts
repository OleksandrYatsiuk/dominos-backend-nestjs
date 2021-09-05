import { BadRequestException, ValidationError } from '@nestjs/common';

export class ValidationException extends BadRequestException {
    private _validationErrors: ValidationError[];
    constructor(validationErrors: ValidationError[]) {
        super(validationErrors);
        this.validationErrors = validationErrors
    }

    get validationErrors() {
        return this._validationErrors;
    }
    set validationErrors(val: ValidationError[]) {
        this._validationErrors = val;
    }
}