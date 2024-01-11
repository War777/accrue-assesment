import {
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DeletedAt,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import Room from 'src/rooms/room.entity';

@Table({
    tableName: 'schedules',
})
class Schedule extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    userName: string;

    @Column
    startDate: Date;

    @Column
    endDate: Date;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    @DeletedAt
    @Column
    deletedAt: Date;

    @ForeignKey(() => Room)
    @Column
    roomId: number;

    @BelongsTo(() => Room, 'roomId')
    room: Room;
}

export default Schedule;
