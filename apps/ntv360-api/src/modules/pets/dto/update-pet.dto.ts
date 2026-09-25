import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { CreatePetDto } from './create-pet.dto.js';

export class UpdatePetDto extends PartialType(CreatePetDto) {
    @IsOptional()
    @IsNumber()
    ownerId?: number;
}

// DTO for updating a pet's information