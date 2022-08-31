import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Roles } from './roles.entity';
import { User } from './user.entity';

@Entity({ name: 'users_roles' })
export class UserRoles {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.roles)
  user!: User;

  @ManyToOne(() => Roles, (roles) => roles.users)
  roles!: Roles;
}
