import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
// controller
import {AuthController} from './auth.controller';
// service
import {AuthService} from './auth.service';
// passport
import {LocalStrategy} from '../shared/passport/local.strategy';
// module import
import {UsersModule} from "../users/users.module";
import {KeyvalueModule} from "../keyvalue/keyvalue.module";


@Module({
    imports: [UsersModule, PassportModule, KeyvalueModule, JwtModule.register({
        secret: process.env.JWT_SECRETKEY,
        signOptions: {expiresIn: '8h'},
    })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy],
    exports: [AuthService],
})

export class AuthModule {
}
