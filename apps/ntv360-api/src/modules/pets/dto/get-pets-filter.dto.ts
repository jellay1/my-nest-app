import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';     

export class GetPetsFilterDto {
    @ApiPropertyOptional({ example: 'Dog' })
    @IsOptional()
    @IsString()
    type?: string;  

    @ApiPropertyOptional({ description: 'Filter by owner ID', example: 1 })
    @IsOptional()
    @IsString()
    ownerId?: string;
}