import { Crew } from '@modules/crew';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToMany, JoinTable, JoinColumn, Unique, OneToOne } from 'typeorm';


@Entity('court')
export class Court {
    @PrimaryGeneratedColumn('uuid')
    @Unique("court_id", ["id"])
    id: string;

    @PrimaryColumn()
    court_name: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    date_time: Date;

    @OneToOne((type) => Crew, (crew) => crew.court)
    @JoinColumn()
    crew: Crew;
}