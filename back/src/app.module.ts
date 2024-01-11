import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsModule } from './rooms/rooms.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { SchedulesModule } from './schedules/schedules.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import Room from './rooms/room.entity';
import Schedule from './schedules/schedule.entity';

const dataBaseConfig: SequelizeModuleOptions = {
    dialect: 'sqlite',
    storage: './db/db.sqlite',
    autoLoadModels: true,
    synchronize: true,
    database: 'booking',
    models: [Room, Schedule],
};

@Module({
    imports: [
        RoomsModule,
        SequelizeModule.forRoot(dataBaseConfig),
        SchedulesModule,
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
