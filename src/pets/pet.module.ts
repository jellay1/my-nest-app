import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from '../owners/entities/owner.entity.js';
import { Pet } from './entities/pet.entity.js';
import { PetService } from './pet.service.js';
import { PetController } from './pet.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Pet, Owner])],
    controllers: [PetController],
    providers: [PetService],
    exports: [PetService],
})
export class PetModule { }