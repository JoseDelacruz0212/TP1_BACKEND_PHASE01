import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @Column({ nullable: false })
  createdBy: string;

  @Column({ nullable: false })
  updatedBy: string;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => User, (user) => user.courses, { eager: true })
  @JoinColumn([{ name: "userIdUser", referencedColumnName: "idUser" }])
  user!: User;

  @ManyToOne(() => Course, (course) => course.users, { eager: true })
  @JoinColumn([{ name: "courseId", referencedColumnName: "id" }])
  course!: Course;
}
