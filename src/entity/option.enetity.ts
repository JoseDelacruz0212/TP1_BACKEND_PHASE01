import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';

@Entity({ name: 'options' })
export class Option {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 3000, nullable: false })
  label: string;
  @ManyToOne(() => Question, (questions) => questions.options)
  questions!: Question;
}
