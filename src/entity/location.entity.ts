import { Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn, } from 'typeorm';
@Entity({ name: 'Location' }) 
export class Location {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    latitude: string;
    @Column({ type: 'varchar', length: 255, nullable: true})
    longitude: string;
    @Column({ type: 'varchar', length: 255, nullable: true})
    description: string;
    @Column({ type: 'varchar', length: 255, nullable: true})
    urlImage: string;
    @CreateDateColumn()
    createDate:Date;
    @UpdateDateColumn()
    updateDate:Date;
}