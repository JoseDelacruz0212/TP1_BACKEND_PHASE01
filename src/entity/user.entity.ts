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
    IdUser:string;
    // Base Columns
    @Column({ type: 'varchar', length: 255, nullable: false })
    Name: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    LastName: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    Email: string;
    @Column({ type: 'varchar', length: 250, nullable: false, select: false  })
    Password: string;
    //Audit Columns
    @Column({ type: 'varchar', length: 255, nullable: true })
    CreatedBy: string;
    @UpdateDateColumn()
    CreatedOn:Date;
    @Column({ type: 'varchar', length: 255, nullable: true })
    UpdatedBy: string;
    @CreateDateColumn()
    UpdatedOn:Date;
    //Managment user columns
    @Column({ type: 'bool', default: true })
    Status: boolean;
    @Column({ type: 'varchar', length: 255, nullable: true })
    AvatarUrl: string;
    @Column({ type: 'simple-array' })
    Roles: string[];
    @Column({ type: 'bool', default: false })
    IsDeleted: boolean;
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.Password) {
      return;
    }
    this.Password = await hash(this.Password, 10);

}
}