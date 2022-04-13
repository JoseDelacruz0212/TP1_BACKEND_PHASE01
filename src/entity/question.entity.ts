import { Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn, } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { TypeQuestion } from './typeQuestion.entity';
@Entity({ name: 'Question' }) 
export class Question {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: 'varchar', length: 4000, nullable: true })
    question: string;
    @Column({ type: 'varchar', length: 4000, nullable: true })
    answer: string;
    @Column({ type: 'int', nullable: true })
    pointQuestion: number;
    @Column({ type: 'varchar', length: 255, nullable: true })
    code: string;
    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;
    @ManyToOne(() => Evaluation, evaluation => evaluation.question)
    evaluation: Evaluation;
    @ManyToOne(() => TypeQuestion, typeQuestion => typeQuestion.question)
    typeQuestion: TypeQuestion;


}