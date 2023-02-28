import {CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException} from '@nestjs/common';
import {Reflector} from "@nestjs/core";
import {TokenDto} from "../../auth/dto/create-user.dto";
import * as constant from "../utils/constant.utils";

export class RoleAuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ) {
    }

    canActivate(context: ExecutionContext): boolean {

        // capture route permission
        // const permissionRoute = this.reflector.get<string>('roles', context.getHandler());
        // if (!permissionRoute) {
        //     return true;
        // }

        // // get user-owned permission
        // const request = context.switchToHttp().getRequest();
        // if (!request.user) {
        //     throw new UnauthorizedException('UNAUTHORIZED_LOGGED_IN');
        // }

        // const user = request.user as TokenDto;

        // if (user.errorCode === constant.TOKEN_EXPIRED) {
        //     throw new UnauthorizedException('UNAUTHORIZED_TOKEN_EXPIRED');
        // }

        // if (user.errorCode === constant.TOKEN_ERROR) {
        //     throw new UnauthorizedException('UNAUTHORIZED_TOKEN_ERROR');
        // }

        // if (!user.permissions.includes(permissionRoute)) {
        //     throw new ForbiddenException(user.roleName+ ' don\'t have ' + permissionRoute + ' access');
        // }

        return true;
    }

}
