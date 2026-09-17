import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { OwnersService } from './owners.service.js';
import { CreateOwnerDto } from './dto/create-owner.dto.js';
import { UpdateOwnerDto } from './dto/update-owner.dto.js';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('owners')
@Controller('owners')
export class OwnersController {
    constructor(private readonly ownersService: OwnersService) { }

    @Post()
    create(@Body() createOwnerDto: CreateOwnerDto) {
        return this.ownersService.create(createOwnerDto);
    }

    @Get()
    findAll() {
        return this.ownersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ownersService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateOwnerDto: UpdateOwnerDto,
    ) {
        return this.ownersService.update(id, updateOwnerDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ownersService.remove(id);
    }
}