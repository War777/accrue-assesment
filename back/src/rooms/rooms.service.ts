/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
    getRooms() {
        return [];
    }

    createRoom(name: string, capacity: number) {
        return {
            name,
            capacity,
        }; 
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
