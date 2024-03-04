import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Roles } from '../../security/authorization/roles.enum';
import { Crew } from 'src/crew/entities/crew.entity';
import { Parent } from 'src/parents';

@Entity('student')
@Unique(['username'])
@Unique(['email'])
export class Student {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    @PrimaryColumn()
    email: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({
        default: Roles.USER,
        enum: Roles,
        type: 'enum',
    })
    roles: Roles[];

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @ManyToOne(() => Parent, parent => parent.students)
    parent: Parent;

}