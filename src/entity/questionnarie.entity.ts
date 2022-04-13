import { Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn, } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { Kid } from './kid.entity';
@Entity({ name: 'Questionnarie' }) 
export class Questionnarie {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;
    @ManyToOne(() => Kid, kid => kid.questionnarie)
    kid: Kid;
    @OneToMany(() => Evaluation, evaluation => evaluation.questionnarie)
    evaluation: Evaluation[];
}