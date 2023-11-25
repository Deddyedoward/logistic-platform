import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { Users } from '../users.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { StatusEnum } from '../../../common/constant/status.enum';
import { BadRequestException } from '@nestjs/common';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let userRepositoryMock: Record<string, jest.Mock>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { 
          provide: 'USER_REPOSITORY', 
          useFactory: () => {
            userRepositoryMock = {
              create: jest.fn(),
              find: jest.fn(),
            };
            return userRepositoryMock;
          },
        }
      ]
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('create', () => {
    it('should success and return an user', async () => {
        const data:CreateUserDto = {
            firstname: 'Hello',
            lastname: 'World',
            email: 'hello.world@gmail.com',
            username: 'Admin',
            password: '123456',
            status: StatusEnum.PENDING
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

    it('should throw error and failed to create an user', async() => {
        const data:CreateUserDto = {
          firstname: 'Hello',
          lastname: 'World',
          email: 'hello.world@gmail.com',
          username: 'Admin',
          password: '123456',
          status: StatusEnum.PENDING
        }

        jest.spyOn(usersService, 'create').mockRejectedValueOnce({});

        await expect(usersController.create(data)).rejects.toEqual(
          new BadRequestException('Sorry, something went wrong...')
        );
    })
  })
});
