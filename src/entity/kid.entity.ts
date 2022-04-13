import { Transform } from 'class-transformer';
import { Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn, } from 'typeorm';
import { Questionnarie } from './questionnarie.entity';
import { User } from './user.entity';
@Entity({ name: 'Kid' }) 
export class Kid {
    
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column({ type: 'date', nullable: true})
    birthdate: Date;
    @Column({ type: 'varchar', length: 255, nullable: true })
    firstName: string;
    @Column({ type: 'varchar', length: 255, nullable: true})
    lastName: string;
    @Column({ type: 'varchar', length: 255, nullable: true})
    gender: string;
    @Column({ type: 'varchar', length: 255, nullable: true})
    dni: string;
    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;
    @ManyToOne(() => User, user => user.Kid)
    @JoinColumn({name:"userId"})
    user: User;
    @OneToMany(() => Questionnarie, questionnarie => questionnarie.kid)
    questionnarie: Questionnarie[];

}