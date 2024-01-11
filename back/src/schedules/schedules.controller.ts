import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ScheduleDto } from './dto/schedule.dto';
import { SchedulesService } from './schedules.service';

@Controller('schedules')
export class SchedulesController {
    constructor(private scheduleService: SchedulesService) {}

    @Get()
    getSchedules() {
        return this.scheduleService.getSchedules();
    }

    @Post()
    createSchedule(@Body() newSchedule: ScheduleDto) {
        return this.scheduleService.createSchedule(newSchedule);
    }

    // TO DO: Will implement this once I get done with the Read Me files
    // @Put(':id')
    // updateSchedule(@Param('id') id: string, @Body() updatedRoom: ScheduleDto) {
    //     return this.scheduleService.updateSchedule(
    //         parseInt(id),
    //         updatedRoom.name,
    //         updatedRoom.capacity,
    //     );
    // }

    @Delete(':id')
    deleteSchedule(@Param('id') id: string) {
        console.log('delete room', id);
        return this.scheduleService.deleteSchedule(parseInt(id));
    }
}
