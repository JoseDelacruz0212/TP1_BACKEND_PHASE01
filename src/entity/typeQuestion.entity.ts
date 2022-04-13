import { Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn, } from 'typeorm';
import { Question } from './question.entity';
@Entity({ name: 'TypeQuestion' }) 
export class TypeQuestion {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: 'varchar', nullable: false })
    typeQuestion: string;
    @Column({ type: 'simple-array', nullable: false })
    options: string[];
    @UpdateDateColumn()
    updateDate:Date;
    @OneToMany(() => Question, question => question.typeQuestion)
    question: Question[];
}