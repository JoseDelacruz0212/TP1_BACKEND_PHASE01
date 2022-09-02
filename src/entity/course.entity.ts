import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Institution } from './institution.entity';
import { UserCourse } from './user-course.entity';
import { Objective } from './objective.entity';
import { Evaluation } from './evaluation.entity';
@Entity({ name: 'courses' })
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  createdBy: string;

  @Column({ type: 'varchar', length: 255, nullable: true})
  updatedBy: string;

  @CreateDateColumn()
  createdOn: Date;

  @UpdateDateColumn()
  updatedOn: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @ManyToOne(() => Institution, (institution) => institution.courses)
  @JoinColumn([{ name: "institutionId", referencedColumnName: "id" }])
  institution: Institution;

  @OneToMany(() => UserCourse, (user) => user.course)
  users!: UserCourse[];

  @OneToMany(() => Objective , (objectives) => objectives.courses)
  objectives: Objective[];

  @OneToMany(() => Evaluation, (evaluations) => evaluations.courses)
  evaluations!: Evaluation[];

}
