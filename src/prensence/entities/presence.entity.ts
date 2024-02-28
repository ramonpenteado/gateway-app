import { Classes } from 'src/classes/entities/classes.entity';
import { User } from 'src/users';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne } from 'typeorm';

@Entity()
export class Presence {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @ManyToMany(() => User, user => user.id)
    users: User[];

    @OneToOne(() => Classes, classes => classes.id)
    class: Classes;
}