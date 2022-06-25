import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Institution } from "./institution.entity";
import { UserCourse } from "./user-course.entity";

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    objectives: string;

    @Column({ nullable: false })
    createdBy: string;

    @Column({ nullable: false })
    updatedBy: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => Institution, (institution) => institution.courses)
    institution: Institution;

    @OneToMany(() => UserCourse, user => user.course)
    users!: UserCourse[]
}