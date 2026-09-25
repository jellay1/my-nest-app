import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnerDto } from './create-owner.dto.js';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateOwnerDto extends PartialType(CreateOwnerDto) {
    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    password?: string;
}

// DTO for updating an owner's information