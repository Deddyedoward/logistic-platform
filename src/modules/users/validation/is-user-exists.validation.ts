import { ValidationOptions, registerDecorator } from "class-validator";
import { IsUserExistsConstraint } from "./is-user-exists.constraint";

export function IsUserExists(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsUserExistsConstraint,
      });
    };
}