import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { OwnersService } from '../owners.service.js';
import { CreateOwnerDto } from '../dto/create-owner.dto.js';
import { UpdateOwnerDto } from '../dto/update-owner.dto.js';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery} from '@nestjs/swagger';
import { GetOwnerFilterDto } from '../dto/get-owner-filter.dto.js';

@ApiTags('owners')
@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new owner' }) 
    @ApiBody({ type: CreateOwnerDto })     
    @ApiResponse({ status: 201, description: 'The owner has been successfully created.' }) 
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    async create(@Body() createOwnerDto: CreateOwnerDto) {
        return this.ownersService.create(createOwnerDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all owners' })
    @ApiQuery({ name: 'email', required: false, type: String, description: 'Filter by owner email', example:"john.doe@example.com" })
    @ApiResponse({status: 200, description: 'Successfully retrieved all owners' })
    async findAll(@Query() filter: GetOwnerFilterDto) {
        return this.ownersService.findAll(filter);
    }

    @Get(':id')
    @ApiOperation({summary: "Get owner by ID"})
    @ApiParam({name: "id", type: Number, description: "Owner ID"})
    @ApiResponse({ status: 200, description: "Successfully retrieved the owner" })
    @ApiResponse({ status: 404, description: "Owner not found" })
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ownersService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({summary: "Update owner by ID"})
    @ApiParam({name: "id", type: Number, description: "Owner ID"})
    @ApiBody({ type: UpdateOwnerDto })
    @ApiResponse({ status: 200, description: "Successfully updated the owner" })
    @ApiResponse({ status: 404, description: "Owner not found" })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOwnerDto: UpdateOwnerDto,
    ) {
        return this.ownersService.update(id, updateOwnerDto);
    }

    @Delete(':id')
    @ApiOperation({summary: "Delete owner by ID"})
    @ApiParam({name: "id", type: Number, description: "Owner ID"})
    @ApiResponse({ status: 200, description: "Successfully deleted the owner" })
    @ApiResponse({ status: 404, description: "Owner not found" })
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.ownersService.remove(id);
    }
}