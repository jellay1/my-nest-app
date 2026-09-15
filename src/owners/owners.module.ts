import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owner.entity.js';
import { OwnersService } from './owners.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([Owner])],
    providers: [OwnersService],
    exports: [OwnersService],
})
export class OwnersModule { }