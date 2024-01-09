/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Room from './room.entity';

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room)
        private roomRepository: typeof Room,
    ) {}

    async getRooms() {
        const rooms = await this.roomRepository.findAll();

        return rooms;
    }

    async createRoom(name: string, capacity: number) {
        const newRoom = await this.roomRepository.create({
            name,
            capacity,
        });

        return newRoom; 
    }

    updateRoom(id: number, name: string, capacity: number) {
        return {
            id,
            name,
            capacity,
        }; ; 
    }

    deleteRoom(id: number) {
        return id;
    }
}
