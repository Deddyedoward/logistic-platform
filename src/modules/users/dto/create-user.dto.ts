import { IsString, IsEmail, IsNotEmpty, IsAlpha, IsDefined } from 'class-validator';
import { IsUserExists } from '../validation/is-user-exists.validation';

export class CreateUserDto {
  @IsDefined()
  @IsString({
    message: 'Firstname is must string.',
  })
  @IsNotEmpty({
    message: 'Firstname is cannot empty.',
  })
  @IsAlpha('en-US', {
    message: 'Firstname is must alphabetics [a-z].',
  })
  firstname: string;

  @IsDefined()
  @IsString({
    message: 'Lastname is must alphabetics [a-z].',
  })
  @IsNotEmpty({
    message: 'Lastname is cannot empty.',
  })
  @IsAlpha('en-US', {
    message: 'Lastname is must alphabetics [a-z].',
  })
  lastname: string;

  @IsDefined()
  @IsEmail(
    {
      host_blacklist: [],
    },
    {
      message: 'Email is must valid.',
    },
  )
  @IsUserExists()
  email: string;

  @IsDefined()
  @IsString({
    message: 'Username is must alphabetics [a-z].',
  })
  username: string;

  @IsDefined()
  @IsString({
    message: 'Password is must alphabetics [a-z].',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  status: string
}
