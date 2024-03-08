import { Court } from '@modules/court';
import { Student } from '@modules/students';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToMany, Unique, OneToOne } from 'typeorm';


@Entity('crew')
export class Crew {
    @PrimaryGeneratedColumn('uuid')
    @Unique("crew_id", ["id"])
    id: string;

    @PrimaryColumn()
    crew_name: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @OneToMany(() => Student, student => student.crew)
    students: Student[]

    @OneToOne((type) => Court, (court) => court.crew)
    court: Court;
}