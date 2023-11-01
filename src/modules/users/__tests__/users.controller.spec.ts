import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UserService } from '../users.service';
import { Users } from '../users.entity';
import { UsersModule } from '../users.module';
import { CreateUserDto } from '../dto/status.dto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UserService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
    }).compile();

    usersService = moduleRef.get<UserService>(UserService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('create', () => {
    it('should success and return an user', async () => {
        const data:CreateUserDto = {
            firstname: 'Hello',
            lastname: 'World',
            email: 'hello.world@gmail.com',
            username: 'Admin',
            password: '123456'
        }

        const result: Users = {
            id: 1,
            status: 'active',
            ...data,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        }

        jest.spyOn(usersService, 'create').mockImplementation(async () => result);
        expect(await usersController.create(data)).toEqual(result);
    })
  })

  describe('findAll', () => {
    it('should return an array of users ', async () => {
        const result: Users = {
            id: 1,
            firstname: 'abc',
            lastname: 'def',
            email: 'email@m.com',
            status: 'active',
            username: 'dd',
            password: '123',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        }

        jest.spyOn(usersService, 'findAll').mockImplementation(async () => [result]);
        expect(await usersController.findAll()).toEqual([result]);
    });
  });
});
