import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  firstname: string;

  @Column({ length: 100, nullable: false })
  lastname: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 18 })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
