import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { PetService } from './pet.service.js';
import { CreatePetDto } from './dto/create-pet.dto.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';
import {
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('pets')
@Controller('pets')
export class PetController {
    constructor(private readonly petService: PetService) { }

    @Post()
    create(@Body() createPetDto: CreatePetDto) {
        return this.petService.create(createPetDto);
    }

    @Get()
    findAll() {
        return this.petService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.petService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updatePetDto: UpdatePetDto,
    ) {
        return this.petService.update(id, updatePetDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.petService.remove(id);
    }
}