import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<Users>,
  ) {}

  async create(data: any) {
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
