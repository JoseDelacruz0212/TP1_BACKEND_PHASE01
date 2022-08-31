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
import { Course } from './course.entity';
import { Question } from './question.entity';
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
    @Column({ type: 'int', nullable: false })
    numberQuestions: number;

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
    @ManyToOne(() => Course , (courses) => courses.evaluations)
    courses: Course;
    @OneToMany(() => Question, (questions) => questions.evaluations)
    questions!: Question[];

}
