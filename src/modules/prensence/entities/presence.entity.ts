import { Crew } from '@modules/crew';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('presence')
export class Presence {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @OneToOne(() => Crew, crew => crew.id)
    crew: Crew;
}