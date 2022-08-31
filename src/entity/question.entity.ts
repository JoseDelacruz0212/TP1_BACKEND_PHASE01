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
    
    @Column({ type: 'varchar', length: 3000, nullable: false })
    question: string;
      
    @Column({ type: 'varchar', length: 255, nullable: false })
    answer: string;
      
    @Column({ type: 'bit', nullable: false })
    hasAnswer: Boolean;
      
    @Column({ type: 'varchar', length: 255, nullable: false })
    type: string;
      
    @Column({ type: 'int', nullable: false })
    points: number;

    @Column({ type: 'bit', nullable: false })
    isSensitive:Boolean;
    @CreateDateColumn()
    createdOn: Date;
  
    @UpdateDateColumn()
    updatedOn: Date;
  
    @Column({ nullable: false })
    createdBy: string;
  
    @Column({ nullable: false })
    updatedBy: string;
  
    @Column({ default: false })
    isDeleted: boolean;

    @ManyToOne(() => Evaluation, (evaluations) => evaluations.questions)
    evaluations!: Evaluation;

    @OneToMany(() => Option, (options) => options.questions)
    options!: Option[];
  }
  