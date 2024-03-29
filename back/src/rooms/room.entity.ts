import {
    AutoIncrement,
    Column,
    CreatedAt,
    Default,
    DeletedAt,
    HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import Schedule from '../schedules/schedule.entity';

@Table({
    tableName: 'rooms',
})
class Room extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    name: string;

    @Column
    capacity: number;

    @Default(true)
    @Column
    enabled: boolean;

    @CreatedAt
    @Column
    createdAt: Date;

    @UpdatedAt
    @Column
    updatedAt: Date;

    @DeletedAt
    @Column
    deletedAt: Date;

    @HasMany(() => Schedule, 'roomId')
    schedule: Schedule[];
}

export default Room;
