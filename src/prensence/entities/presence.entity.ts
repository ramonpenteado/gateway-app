import { Crew } from 'src/crew/entities/crew.entity';
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