import { hash } from 'bcrypt';
import { Column,
    BeforeInsert,
    Entity,
    BeforeUpdate,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn, } from 'typeorm';
import { Institution } from './institution.entity';
import { UserCourse } from './user-course.entity';
@Entity({ name: 'users' }) 
export class User {
  @PrimaryGeneratedColumn("uuid")
    idUser:string;
    // Base Columns
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    lastName: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;
    @Column({ type: 'varchar', length: 250, nullable: false, select: false  })
    password: string;
    //Audit Columns
    @Column({ type: 'varchar', length: 255, nullable: true })
    createdBy: string;
    @UpdateDateColumn()
    createdOn:Date;
    @Column({ type: 'varchar', length: 255, nullable: true })
    updatedBy: string;
    @CreateDateColumn()
    updatedOn:Date;
    //Managment user columns
    @Column({ type: 'bool', default: true })
    status: boolean;
    @Column({ type: 'varchar', length: 255, nullable: true })
    avatarUrl: string;
    @Column({ type: 'simple-array' })
    roles: string[];
    @Column({ type: 'bool', default: false })
    isDeleted: boolean;

    @OneToMany(() => Institution, (institution) => institution.user)
    institutions: Institution[];

    @OneToMany(() => UserCourse, course => course.user)
    courses: UserCourse[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);

}
}