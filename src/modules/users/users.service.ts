import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUtil } from '../auth/auth.util';
import { StatusEnum } from '../../common/constant/status.enum';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Users>,
    private authUtil: AuthUtil
  ) {}

  async create(data: CreateUserDto) {
    data.password = await this.authUtil.hash(data.password);
    data.status = StatusEnum.PENDING;
    return await this.userRepository.save(data);
  }

  async update(data: any) {
    return await this.userRepository.update({email: data.email}, data);
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOneByEmail(email: string): Promise<Users> {
    return this.userRepository.findOne({ where: { email: email }})
  }
}
