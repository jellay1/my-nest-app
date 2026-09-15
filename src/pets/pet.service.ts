import { Injectable, NotFoundException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Owner } from '../owners/owner.entity.js';
import { Pet } from './pet.entity.js';
import { CreatePetDto } from './dto/create-pet.dto.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';

@Injectable()
export class PetService {
    constructor(
        @InjectRepository(Pet)
        private readonly petsRepository: Repository<Pet>,

        @InjectRepository(Owner)
        private readonly ownersRepository: Repository<Owner>,
    ) { }

    async create(createPetDto: CreatePetDto) {
        const owner = await this.ownersRepository.findOneBy({
            id: createPetDto.ownerId,
        });

        if (!owner) {
            throw new NotFoundException(
                `Owner with id ${createPetDto.ownerId} not found`,
            );
        }

        const pet = this.petsRepository.create({
            name: createPetDto.name,
            type: createPetDto.type,
            owner,
        });

        return this.petsRepository.save(pet);
    }

    findAll() {
        return this.petsRepository.find({
            relations: {
                owner: true,
            },
        });
    }

    async findOne(id: number) {
        const pet = await this.petsRepository.findOne({
            where: { id },
            relations: {
                owner: true,
            },
        });

        if (!pet) {
            throw new NotFoundException(`Pet with id ${id} not found`);
        }

        return pet;
    }

    async update(id: number, updatePetDto: UpdatePetDto) {
        const pet = await this.petsRepository.findOneBy({ id });

        if (!pet) {
            throw new NotFoundException(`Pet with id ${id} not found`);
        }

        if (updatePetDto.ownerId !== undefined) {
            const owner = await this.ownersRepository.findOneBy({
                id: updatePetDto.ownerId,
            });

            if (!owner) {
                throw new NotFoundException(
                    `Owner with id ${updatePetDto.ownerId} not found`,
                );
            }

            pet.owner = owner;
        }

        if (updatePetDto.name !== undefined) {
            pet.name = updatePetDto.name;
        }

        if (updatePetDto.type !== undefined) {
            pet.type = updatePetDto.type;
        }

        return this.petsRepository.save(pet);
    }

    async remove(id: number) {
        const pet = await this.findOne(id);
        await this.petsRepository.remove(pet);
        return { message: 'Pet deleted successfully' };
    }
}