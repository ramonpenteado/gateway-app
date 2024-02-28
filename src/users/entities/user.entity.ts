import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import { Roles } from '../../security/authorization/roles.enum';
import { Presence } from 'src/prensence/entities/presence.entity';
@Entity()
export class User {
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
        default: Roles.USER,
        enum: Roles,
        type: 'enum',
    })
    roles: Roles[];

    @ManyToMany(() => Presence, (presence) => presence.users)
    @JoinTable()
    presence: Presence[];
}