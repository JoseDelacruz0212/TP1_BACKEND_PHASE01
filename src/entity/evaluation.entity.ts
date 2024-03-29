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
import { Course } from './course.entity';
import { Question } from './question.entity';
import { UserEvaluation } from './user-evaluation.entity';
@Entity({ name: 'evaluations' })
export class Evaluation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'datetime' })
    availableOn: Date;

    @Column({ type: 'int', nullable: false })
    duration: number;
    @Column({ type: 'int', nullable: false,default:0 })
    status: number;
    @Column({ type: "text", nullable: true})
    json:string;
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
    @ManyToOne(() => Course, (courses) => courses.evaluations, { eager: true })
    @JoinColumn([{ name: "coursesId", referencedColumnName: "id" }])
    courses: Course;
    @OneToMany(() => Question, (questions) => questions.evaluations)
    questions!: Question[];
    @OneToMany(() => UserEvaluation, (user) => user.evaluation)
    users!: UserEvaluation[];

    flag:boolean;

}
