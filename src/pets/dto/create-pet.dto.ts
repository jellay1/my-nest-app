import { ApiProperty } from '@nestjs/swagger';
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
    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

}

// DTO for creating a new pet