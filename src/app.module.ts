import {MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import {APP_PIPE} from '@nestjs/core';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {AppService} from './app.service';

// Module
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { EventModule } from './event/event.module';
import { LexicographicallyModule } from './lexicographically/lexicographically.module';
import { MulterModule } from "@nestjs/platform-express";
import { JwtStrategy } from "./shared/passport/jwt.strategy";
import { KeyvalueModule } from './keyvalue/keyvalue.module';
import { UsersRolesModule } from './users-roles/users-roles.module';
import { StorageModule } from './storage/storage.module';

const cookieSession = require('cookie-session');

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MulterModule.register({
            dest: './files',
        }),
        AuthModule,
        UsersModule,
        PrismaModule,
        EventModule,
        LexicographicallyModule,
        UsersRolesModule,
        UsersRolesModule,
        KeyvalueModule,
        StorageModule,
    ],
    
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true,
            }),
        },
        JwtStrategy,
    ],
})

export class AppModule {
    constructor(private configService: ConfigService) {
    }

    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(
                cookieSession({
                    keys: [this.configService.get('COOKIE_KEY')],
                }),
            )
            .forRoutes('*');
        consumer.apply()

    }


}
