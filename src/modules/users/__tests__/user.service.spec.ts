import { Test } from '@nestjs/testing';
import { UserService } from '../users.service';
import { Users } from '../users.entity';
import { CreateUserDto } from '../dto/status.dto';

describe('UserService', () => {
  let userService: UserService;
  let userRepositoryMock: Record<string, jest.Mock>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
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

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should success insert a record to table and return an user', async () => {
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

        userRepositoryMock.create.mockReturnValue(result);
        const user = await userService.create(data);

        expect(user).toEqual(result);
        expect(userRepositoryMock.create).toHaveBeenCalledWith(data);
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

        userRepositoryMock.find.mockReturnValue([result]);
        const user = await userService.findAll();

        expect(user).toEqual([result]);
        expect(userRepositoryMock.find).toHaveBeenCalledWith();
    });
  });
});
