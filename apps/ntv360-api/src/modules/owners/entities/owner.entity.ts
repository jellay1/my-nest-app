import { Column, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Pet } from '../../pets/entities/pet.entity.js';

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

  @OneToMany('Pet', 'owner')
  pets: Pet[];

  @DeleteDateColumn()
  deletedAt: Date;
}
