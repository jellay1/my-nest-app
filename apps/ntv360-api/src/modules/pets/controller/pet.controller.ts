import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { PetService } from '../pet.service.js';
import { CreatePetDto } from '../dto/create-pet.dto.js';
import { UpdatePetDto } from '../dto/update-pet.dto.js';
import { ApiOperation, ApiQuery, ApiTags, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetPetsFilterDto } from '../dto/get-pets-filter.dto.js';

@ApiTags('pets')
@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) { }

    @Post()
    @ApiOperation({ summary: 'Create new pet' })
    @ApiBody({ type: CreatePetDto })
    @ApiResponse({ status: 201, description: 'Pet created successfully' })
    async create(@Body() createPetDto: CreatePetDto) {
        return this.petService.create(createPetDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all pets' })
    @ApiQuery({ name: 'type', required: false, type: String })
    @ApiQuery({ name: 'ownerId', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Return all pets' })
    async findAll(@Query() filter: GetPetsFilterDto) {
        return this.petService.findAll(filter);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get pet by ID' })
    @ApiParam({name: 'id', type: Number, description: 'Pet ID'})
    @ApiResponse({ status: 200, description: 'Return pet with specified ID' })
    @ApiResponse({ status: 404, description: 'Pet not found' })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.petService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update pet by ID' })
    @ApiParam({name: 'id', type: Number, description: 'Pet ID'})
    @ApiBody({ type: UpdatePetDto })
    @ApiResponse({ status: 200, description: 'Pet updated successfully' })
    @ApiResponse({ status: 404, description: 'Pet not found' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePetDto: UpdatePetDto,
    ) {
        return this.petService.update(id, updatePetDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete pet by ID' })
    @ApiParam({name: 'id', type: Number, description: 'Pet ID'})
    @ApiResponse({ status: 200, description: 'Pet deleted successfully' })
    @ApiResponse({ status: 404, description: 'Pet not found' })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.petService.remove(id);
    }
}