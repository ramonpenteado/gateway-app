import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, Unique, JoinColumn, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { Roles } from '../../security/authorization/roles.enum';
import { Crew } from 'src/crew/entities/crew.entity';
import { Student } from 'src/students';

@Entity('parent')
@Unique(['username'])
@Unique(['email'])
export class Parent {
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

    @OneToMany(() => Student, student => student.parent)
    @JoinColumn({ foreignKeyConstraintName: 'fk_parent_student' })
    students: Parent;

}