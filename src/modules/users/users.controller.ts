import { BadRequestException, Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { StatusEnum } from 'src/common/constant/status.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
        let payload: CreateUserDto = {
          ...createUserDto,
          status: StatusEnum.PENDING
        }

        return await this.usersService.create(payload);
    } catch (err) {
        throw new BadRequestException('Sorry, something went wrong...');
    }
  }

  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto): Promise<any> {
    try {
        return await this.usersService.update(updateUserDto);
    } catch (err) {
        console.log(err)
        throw new BadRequestException('Failed to update user...');
    }
  }
}
