/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Room from './room.entity';

@Module({
  imports: [SequelizeModule.forFeature([Room])],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
