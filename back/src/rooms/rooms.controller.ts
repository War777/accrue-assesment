/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomDto } from './dto/room.dto';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Get()
    getRooms(){
        return this.roomsService.getRooms();
    }

    @Post()
    createRoom(@Body() newRoom: RoomDto) {
        console.log('newRoom', newRoom);
        return this.roomsService.createRoom(newRoom.name, newRoom.capacity);
    }

    @Put(':id')
    updateRoom(@Param('id') id: string, @Body() updatedRoom: RoomDto) {
        console.log('update room', updatedRoom);
        return this.roomsService.updateRoom(
            parseInt(id),
            updatedRoom.name,
            updatedRoom.capacity,
        );
    }

    @Delete(':id')
    deleteRoom(@Param('id') id: string) {
        console.log('delete room', id);
        return this.roomsService.deleteRoom(parseInt(id));
    }
}
