import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './entities/owner.entity.js';
import { OwnersService } from './owners.service.js';
import { Pet } from '../pets/entities/pet.entity.js';
import { OwnersController } from './owners.controller.js';

@Module({
    imports: [TypeOrmModule.forFeature([Owner, Pet])],
    controllers: [OwnersController],
    providers: [OwnersService],
    exports: [OwnersService],
})
export class OwnersModule { }