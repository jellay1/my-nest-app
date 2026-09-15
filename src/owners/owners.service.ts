import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Owner } from './owner.entity.js';
import { CreateOwnerDto } from './dto/create-owner.dto.js';
import { UpdateOwnerDto } from './dto/update-owner.dto.js';

@Injectable()
export class OwnersService {
    constructor(
        @InjectRepository(Owner)
        private readonly ownersRepository: Repository<Owner>,
    ) { }

    async create(createOwnerDto: CreateOwnerDto) {
        const existingOwner = await this.ownersRepository.findOneBy({
            email: createOwnerDto.email,
        });

        if (existingOwner) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(createOwnerDto.password, 10);

        const owner = this.ownersRepository.create({
            ...createOwnerDto,
            password: hashedPassword,
        });

        try {
            const savedOwner = await this.ownersRepository.save(owner);
            const { password: _password, ...ownerWithoutPassword } = savedOwner;
            return ownerWithoutPassword;
        } catch (error: any) {
            if (error?.code === 'ER_DUP_ENTRY' || error?.code === '23505') {
                throw new ConflictException('Email already exists');
            }

            throw error;
        }
    }

    async update(id: number, updateOwnerDto: UpdateOwnerDto) {
        const owner = await this.ownersRepository.findOne({
            where: { id },
        });

        if (!owner) {
            throw new NotFoundException(`Owner with ID ${id} not found`);
        }

        if (updateOwnerDto.password !== undefined) {
            owner.password = await bcrypt.hash(updateOwnerDto.password, 10)
        }

        if (updateOwnerDto.name !== undefined) {
            owner.name = updateOwnerDto.name;
        }

        if (updateOwnerDto.email !== undefined) {
            const existingOwner = await this.ownersRepository.findOneBy({
                email: updateOwnerDto.email,
            });

            if (existingOwner && existingOwner.id !== id) {
                throw new ConflictException('Email alredy exists');
            }
            owner.email = updateOwnerDto.email;
        }
        const updatedOwner = await this.ownersRepository.save(owner);

        const { password: _password, ...ownerWithoutPassword } = updatedOwner;

        return ownerWithoutPassword;
    }
    async findOne(id: number) {
        const owner = await this.ownersRepository.findOne({
            where: { id },
        });

        if (!owner) {
            throw new NotFoundException(`Owner with ID ${id} not found`);
        }

        const { password, ...ownerWithoutPassword } = owner;

        return ownerWithoutPassword;
    }
    async findAll() {
        const owners = await this.ownersRepository.find();

        return owners.map(({ password, ...owner }) => owner);
    }
    async remove(id: number) {
        const owner = await this.ownersRepository.findOne({
            where: { id },
        });

        if (!owner) {
            throw new NotFoundException(`Owner with ID ${id} not found`);
        }

        await this.ownersRepository.remove(owner);

        return {
            message: `Owner with ID ${id} deleted successfully`,
        };
    }
}
