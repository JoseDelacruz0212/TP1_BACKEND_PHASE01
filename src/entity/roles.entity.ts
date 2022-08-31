import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserCourse } from './user-course.entity';
import { UserRoles } from './user-roles.entity';
@Entity({ name: 'roles' })
export class Roles {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    @Column({ nullable: false })
    description: string;
    @Column({ nullable: false })
    permissions: string;
    @Column({ nullable: false })
    createdBy: string;
    @Column({ nullable: false })
    updatedBy: string;
    @CreateDateColumn()
    createdOn: Date;
    @UpdateDateColumn()
    updatedOn: Date;
    @Column({ default: false })
    isDeleted: boolean;
    @OneToMany(() => UserRoles, (user) => user.user)
    users!: UserCourse[];
}
