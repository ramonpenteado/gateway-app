import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

export enum ROLES  {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @PrimaryColumn()
    username: string;

    @Column()
    password: string;

    @Column({default: true})
    isActive: boolean;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;

    @Column()
    name: string;

    @PrimaryColumn()
    email: string;

    @Column({
        default: ROLES.USER,
        enum: ROLES,
        type: 'enum',
    })
    role: ROLES;
}