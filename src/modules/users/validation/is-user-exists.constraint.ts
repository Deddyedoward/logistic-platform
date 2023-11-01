import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { UsersService } from '../users.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserExistsConstraint implements ValidatorConstraintInterface {
    constructor(private userService: UsersService) {}

    async validate(email: string, args: ValidationArguments) {
        const user = await this.userService.findOneByEmail(email);
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Email found, please use another email.';
    }
}