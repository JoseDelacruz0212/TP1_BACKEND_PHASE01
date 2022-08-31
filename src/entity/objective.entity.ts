import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Course } from './course.entity';
  
  @Entity({ name: 'objectives' })
  export class Objective {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ nullable: false })
    name: string;
    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    createdBy: string;
  
    @Column({ nullable: false })
    updatedBy: string;
  
    @CreateDateColumn()
    createdOn: Date;
  
    @UpdateDateColumn()
    updatedOn: Date;
  
    @Column({ default: false })
    isDeleted: boolean;
  
    @ManyToOne(() => Course, (course) => course.objectives)
    courses: Course;
  }
  