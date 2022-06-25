import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity({ name: 'users_courses' })
export class UserCourse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.courses)
  user!: User;

  @ManyToOne(() => Course, (course) => course.users)
  course!: Course;
}
