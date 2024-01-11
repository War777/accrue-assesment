import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Schedule from './schedule.entity';
import { ScheduleDto } from './dto/schedule.dto';

@Injectable()
export class SchedulesService {
    constructor(
        @InjectModel(Schedule)
        private scheduleRepository: typeof Schedule,
    ) {}

    async getSchedules() {
        const rooms = await this.scheduleRepository.findAll();

        return rooms;
    }

    async getSchedule(id) {
        const rooms = await this.scheduleRepository.findByPk(id);

        return rooms;
    }

    async createSchedule(newScheduleData: ScheduleDto) {
        const { userName, startDate, endDate, roomId } = newScheduleData;

        const newSchedule = await this.scheduleRepository.create({
            userName,
            startDate,
            endDate,
            roomId,
        });

        return newSchedule;
    }

    updateSchedule(id: number, name: string, capacity: number) {
        return {
            id,
            name,
            capacity,
        };
    }

    async deleteSchedule(id: number) {
        const schedule = await this.scheduleRepository.findByPk(id);

        schedule.destroy();

        return schedule;
    }
}
