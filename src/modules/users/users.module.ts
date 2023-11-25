import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { usersProvider } from './users.provider';
import { UsersService } from './users.service';
import { DatabaseModule } from '../../common/database/database.module';
import { IsUserExistsConstraint } from './validation/is-user-exists.constraint';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    ...usersProvider, 
    UsersService, 
    IsUserExistsConstraint
  ],
  exports: [UsersService]
})
export class UsersModule {}
