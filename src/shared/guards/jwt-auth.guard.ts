import {ExecutionContext, Injectable,} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {TokenExpiredError} from 'jsonwebtoken'
import * as constant from "../utils/constant.utils";
import {TokenDto} from "../../auth/dto/create-user.dto";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        return super.canActivate(context);
    }

    handleRequest(err, user, info) {

        if (err || info) {

            if (err) {
                // throw err || new UnauthorizedException();
                user = {
                    errorCode: constant.TOKEN_ERROR,
                    errorMessage: err.message,
                } as TokenDto;
            }

            if (info instanceof TokenExpiredError) {
                // do stuff when token is expired
                // throw err || new UnauthorizedException('token expired');
                user = {
                    errorCode: constant.TOKEN_EXPIRED,
                    errorMessage: info.expiredAt.toISOString(),
                } as TokenDto;
            }
        }

        // You can throw an exception based on either "info" or "err" arguments
        return user;
    }
}
