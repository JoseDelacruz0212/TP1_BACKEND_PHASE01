import { Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn, } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { TypeQuestion } from './typeQuestion.entity';
@Entity({ name: 'generalquestions' }) 
export class GeneralQuestions {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: 'nvarchar' ,nullable: false })
    typeQuestion: string;
    @Column({ type: 'nvarchar',length:15000,nullable: false })
    jsonData: string;
    @Column({ type: 'int' ,nullable: false })
    numberMonth: number;
    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;
}