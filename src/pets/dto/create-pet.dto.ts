import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePetDto {
    @ApiProperty({ example: 'Buddy' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Dog' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ example: 1 })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    ownerId: number;
}

// DTO for creating a new pet