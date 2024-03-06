import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';


@Entity('court')
export class Court {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn()
    court_name: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}