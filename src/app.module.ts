import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { OwnersModule } from './owners/owners.module.js';
import { PetModule } from './pets/pet.module.js';
import { TestService } from './test/test.service.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'my-nest-app',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'my_nest_app',
      autoLoadEntities: true,
      synchronize: false, // Set to false to use TypeORM migrations
    }),
    OwnersModule,
    PetModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule { }

//organizational structure of the application, mo dictate sa mga modules, controllers, and services nga gamiton sa application.
// providers: mo control sa services, repositories, and other dependencies nga gamiton sa application.
// imports: mo control sa mga modules nga gamiton sa application, like OwnersModule and PetModule.
// exports: mo control sa mga services nga available sa other modules, like TestService.

/*organizational container for a closely 
related set of capabilities (like controllers, services, and database entities)*/