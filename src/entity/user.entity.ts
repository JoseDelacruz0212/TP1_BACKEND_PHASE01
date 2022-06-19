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
@Entity({ name: 'user' }) 
export class User {
  @PrimaryGeneratedColumn("uuid")
    idUser:string;
    // Base Columns
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    lastName: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    email: string;
    @Column({ type: 'varchar', length: 250, nullable: false, select: false  })
    password: string;
    //Audit Columns
    @Column({ type: 'varchar', length: 255, nullable: true })
    createdBy: string;
    @UpdateDateColumn()
    createdOn:Date;
    @Column({ type: 'varchar', length: 255, nullable: true })
    updatedBy: string;
    @CreateDateColumn()
    updatedOn:Date;
    //Managment user columns
    @Column({ type: 'bool', default: true })
    status: boolean;
    @Column({ type: 'varchar', length: 255, nullable: true })
    avatarUrl: string;
    @Column({ type: 'simple-array' })
    roles: string[];
    @Column({ type: 'bool', default: false })
    isDeleted: boolean;
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);

}
}