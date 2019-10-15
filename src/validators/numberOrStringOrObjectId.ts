import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validator} from "class-validator";
import { isNumber, isString } from "util";
import * as mongoose from 'mongoose';

@ValidatorConstraint({ name: 'NumberOrString', async: false })
export class NumberOrStringOrObjectId implements ValidatorConstraintInterface {

    validate(text: string, args: ValidationArguments) {
        return true;
    }

    defaultMessage(args: ValidationArguments) { 
        return 'Is not a number or a string';
    }

}