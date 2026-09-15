import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from '../owners/owner.entity.js';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    type: string;

    @ManyToOne(() => Owner, { onDelete: 'CASCADE', nullable: false })

    @JoinColumn({ name: 'ownerId' })
    owner: Owner;
}
