import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pet } from '../pets/pet.entity.js';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];
}
