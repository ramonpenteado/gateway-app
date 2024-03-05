import { Student } from 'src/students';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';


@Entity('crew')
export class Crew {
    @PrimaryGeneratedColumn('uuid')
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
}