import { hash } from 'bcrypt';
import {
  Column,
  BeforeInsert,
  Entity,
  BeforeUpdate,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Institution } from './institution.entity';
import { UserCourse } from './user-course.entity';
import { UserEvaluation } from './user-evaluation.entity';
import { UserRoles } from './user-roles.entity';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  idUser: string;
  // Base Columns
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName: string;
  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;
  @Column({ type: 'varchar', length: 250, nullable: false, select: false })
  password: string;
  //Audit Columns
  @Column({ type: 'varchar', length: 255, nullable: true })
  createdBy: string;
  @CreateDateColumn()
  createdOn: Date;
  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy: string;
  @UpdateDateColumn()
  updatedOn: Date;
  //Managment user columns
  @Column({ type: 'bool', default: false })
  status: boolean;
  @Column({ type: 'varchar', length: 255, nullable: true })
  avatarUrl: string;
  @Column({ type: 'simple-array' })
  roles: string[];
  @Column({ type: 'bool', default: false })
  isDeleted: boolean;

  @ManyToOne(() => Institution, (institution) => institution.user, { eager: true })
  @JoinColumn([{ name: "institutionId", referencedColumnName: "id" }])
  institution: Institution;
  @OneToMany(() => UserCourse, (course) => course.user)
  courses: UserCourse[];
  @OneToMany(() => UserEvaluation, (evaluation) => evaluation.user)
  evaluation: UserEvaluation[];
  @OneToMany(() => UserRoles, (rolesActive) => rolesActive.user)
  rolesActive: UserRoles[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }
}
