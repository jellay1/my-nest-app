import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEmail } from 'class-validator';  

export class GetOwnerFilterDto {
    @ApiPropertyOptional({ description: 'Filters by email', example: 'john@example.com  ' })
    @IsOptional()
    @IsEmail()
    email?: string;
}