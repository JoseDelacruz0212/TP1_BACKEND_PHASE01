import { Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn, } from 'typeorm';
import { Question } from './question.entity';
import { Questionnarie } from './questionnarie.entity';
import { TypeEvaluation } from './typeEvaluation.entity';
@Entity({ name: 'Evaluation' }) 
export class Evaluation {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: 'int' })
    totalPoints: number;
    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;


    @OneToMany(() => Question, question => question.evaluation)
    @JoinColumn({name:"questionId"})
    question: Question[];
  
    @ManyToOne(() => TypeEvaluation, typeEvaluation => typeEvaluation.evaluation)
    typeEvaluation: TypeEvaluation;
    
    @ManyToOne(() => Questionnarie, questionnarie => questionnarie.evaluation)
    questionnarie: Questionnarie;

}