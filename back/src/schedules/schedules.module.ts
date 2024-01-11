import { Module } from '@nestjs/common';
import { SchedulesController } from './schedules.controller';
import { SchedulesService } from './schedules.service';
import Schedule from './schedule.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
    imports: [SequelizeModule.forFeature([Schedule])],
    controllers: [SchedulesController],
    providers: [SchedulesService],
})
export class SchedulesModule {}
