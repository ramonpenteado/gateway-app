import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Roles } from '../../security/authorization/roles.enum';
import { Crew } from '@modules/crew';
import { Parent } from '@modules/parents';

@Entity('student')
@Unique(['username'])
@Unique(['email'])
@Unique('student_id', ['id'])
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

    @ManyToOne(() => Parent, (parent) => parent.students)
    parent: Parent;

    @ManyToOne(() => Crew, (crew) => crew.students)
    @JoinColumn({ foreignKeyConstraintName: 'fk_student_crew' })
    crew: Crew;

}