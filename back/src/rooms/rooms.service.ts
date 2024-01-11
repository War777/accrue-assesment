/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Room from './room.entity';
import Schedule from 'src/schedules/schedule.entity';

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

    async getRoom(id) {
        const room = await this.roomRepository.findByPk(id, {
            include: [
                {
                    model: Schedule,
                    as: 'schedule',
                    attributes: [
                        'id',
                        'userName',
                        'startDate',
                        'endDate',
                        'createdAt',
                        'updatedAt',
                    ],
                }
            ],
        });

        return room;
    }

    async createRoom(name: string, capacity: number) {
        const newRoom = await this.roomRepository.create({
            name,
            capacity,
        });

        

        return newRoom;
    }

    async updateRoom(id: number, name: string, capacity: number) {
        const room = await this.roomRepository.findByPk(id);

        await room.update({
            name,
            capacity,
        });

        await room.save();

        return room;
    }

    async deleteRoom(id: number) {
        const room = await this.roomRepository.findByPk(id);

        await room.destroy();

        return room;
    }
}
