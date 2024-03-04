import { Crew } from "src/crew/entities/crew.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('schedule')
export class Schedule {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @Column()
    isActive: boolean;

    @OneToOne(() => Crew, crew => crew.id)
    @JoinColumn()
    crew: Crew;
}