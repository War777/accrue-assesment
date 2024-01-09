/* eslint-disable prettier/prettier */
import {
    Column,
    Table,
    Model,
    AutoIncrement,
    PrimaryKey,
    Default,
    CreatedAt,
    DeletedAt,
    UpdatedAt,
} from 'sequelize-typescript';

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
}

export default Room;