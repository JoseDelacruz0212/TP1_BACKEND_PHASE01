import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Column,
    BeforeInsert,
    Entity,
    BeforeUpdate,
    PrimaryGeneratedColumn,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn, } from 'typeorm';
import { Kid } from './kid.entity';
@Entity({ name: 'user' }) 
export class User {
  @PrimaryGeneratedColumn("uuid")
    idUser:string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    userName: string;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    firstName: string;
    @Column({ type: 'date', nullable: false})
    birthdate: Date;
    @Column({ type: 'varchar', length: 255, nullable: false })
    lastName: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    direction: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    city: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    country: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    postal_code: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    phone_number: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    avatarUrl: string;
    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    userEmail: string;
    @Column({ type: 'varchar', length: 250, nullable: false, select: false  })
    passwordUser: string;
    @Column({ type: 'bool', default: true })
    status: boolean;
    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;
    @Column({ type: 'simple-array' })
    roles: string[];
    @OneToMany(() => Kid, Kid => Kid.user)
    Kid: Kid[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.passwordUser) {
      return;
    }
    this.passwordUser = await hash(this.passwordUser, 10);

}
}