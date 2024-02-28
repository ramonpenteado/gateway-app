import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';


@Entity()
export class Classes {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn()
    class_name: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}