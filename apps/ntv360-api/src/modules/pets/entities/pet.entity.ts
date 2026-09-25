import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from '../../owners/entities/owner.entity.js';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column()
    ownerId: number;

    @ManyToOne(() => Owner, (owner) => owner.pets, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'ownerId' })
    owner: Owner;
}
