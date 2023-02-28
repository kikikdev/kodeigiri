import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {TokenDto} from "../../auth/dto/create-user.dto";
import {KeyvalueService} from "../../keyvalue/keyvalue.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        private keyvalueService: KeyvalueService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRETKEY,
        });
    }

    async validate(payload: any): Promise<TokenDto> {

        const {email} = payload as TokenDto;

        const data = await this.keyvalueService.findOne('token.' + email);
        payload.permissions = data ? data.value['xPermissions'] : [];
        return payload;
    }
}