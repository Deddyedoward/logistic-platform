import { DataSource } from 'typeorm';
import { Users } from './users.entity';

export const usersProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Users),
    inject: ['DATA_SOURCE'],
  },
];
