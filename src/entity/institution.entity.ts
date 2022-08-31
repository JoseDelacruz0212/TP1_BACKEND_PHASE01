import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity({ name: 'institutions' })
export class Institution {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  direction: string;

  @Column({ unique: true, nullable: false })
  code: string;

  @OneToMany(() => User, (user) => user.institution)
  user: User[];

  @OneToMany(() => Course, (course) => course.institution)
  courses: Course[];
}
