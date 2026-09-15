import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from '../owners/owner.entity.js';
import { Pet } from './pet.entity.js';
import { PetService } from './pet.service.js';
import { PetController } from './pet.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Pet, Owner])],
    controllers: [PetController],
    providers: [PetService],
    exports: [PetService],
})
export class PetModule { }