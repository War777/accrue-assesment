/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import Room from './rooms/room.entity';

const dataBaseConfig: SequelizeModuleOptions = {
    dialect: 'sqlite',
    storage: './db/db.sqlite',
    autoLoadModels: true,
    synchronize: true,
    database: 'booking',
    models: [Room],
};

@Module({
  imports: [
    RoomsModule,
    SequelizeModule.forRoot(dataBaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
