import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Evaluation } from './evaluation.entity';
import { Option } from './option.enetity';
  
  @Entity({ name: 'questions' })
  export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({ type: 'varchar', length: 3000, nullable: true })
    question: string;
      
    @Column({ type: 'varchar', length: 255, nullable: true })
    answer: string;
      
    @Column({ type: 'bit', default:false ,nullable: true})
    hasAnswer: Boolean;
      
    @Column({ type: 'varchar', length: 255, nullable: true})
    type: string;
      
    @Column({ type: 'int', nullable: true })
    points: number;

    @Column({ type: 'bit', default:false,nullable: true })
    isSensitive:Boolean;
    @CreateDateColumn()
    createdOn: Date;
  
    @UpdateDateColumn()
    updatedOn: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => Evaluation, (evaluations) => evaluations.questions)
    evaluations!: Evaluation;

    @OneToMany(() => Option, (options) => options.questions)
    options!: Option[];
  }
  