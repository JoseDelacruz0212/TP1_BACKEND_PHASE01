import { Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn, } from 'typeorm';
import { Evaluation } from './evaluation.entity';
@Entity({ name: 'TypeEvaluation' }) 
export class TypeEvaluation {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: 'varchar', nullable: true })
    typeEvaluation: string;
    @Column({ type: 'int', nullable: true })
    numberMonth: number;
    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;
    @ManyToOne(() => Evaluation, evaluation => evaluation.typeEvaluation)
    evaluation: Evaluation;
}