import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Course } from './course.entity';
import { Evaluation } from './evaluation.entity';
  import { User } from './user.entity';
  
  @Entity({ name: 'users_evaluations' })
  export class UserEvaluation {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text' })
    json: string;
    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    points: number;

    @ManyToOne(() => User, (user) => user.courses, { eager: true })
    @JoinColumn([{ name: "userIdUser", referencedColumnName: "idUser" }])
    user!: User;
  
    @ManyToOne(() => Evaluation, (evaluation) => evaluation.users, { eager: true })
    @JoinColumn([{ name: "evaluationId", referencedColumnName: "id" }])
    evaluation!: Evaluation;

    @CreateDateColumn()
    createdOn: Date;
  
    @UpdateDateColumn()
    updatedOn: Date;
  
    @Column({ nullable: true })
    createdBy: string;
  
    @Column({ nullable: true })
    updatedBy: string;
  
  }
  