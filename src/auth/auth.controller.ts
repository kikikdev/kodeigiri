import {Body, Controller, Get, Patch, Post,} from '@nestjs/common';
import {ApiHeader, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
// service
import {UsersService} from '../users/users.service';
import {AuthService} from './auth.service';
// dto
import {CreateUserDto, ResponseCreateUserDto} from "../users/dto/create-user.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {SigninDto, SigninResponseDto} from "./dto/create-user.dto";
// decorator
import {CurrentUser} from "../shared/decorators/current-user.decorator";
import {Role} from "../shared/decorators/roles.decorator";
// utils
import * as role from "../shared/utils/role.utils";
import {UpdatePasswordDto} from "./dto/update-password.dto";
import {USER_LOGGED_IN} from "../shared/utils/role.utils";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) {
    }

    @Post('signin')
    @ApiOperation({summary: 'signin'})
    @ApiResponse({status: 201, type: SigninResponseDto, isArray: false})
    async signin(@Body() body: SigninDto): Promise<SigninResponseDto> {
        return await this.authService.signin(body);
    }

    @Post('signout')
    @Role(role.USER_LOGGED_IN)
    @ApiOperation({summary: 'signout'})
    @ApiResponse({status: 201, type: Boolean, isArray: false})
    @ApiHeader({name: 'Authorization', description: 'Bearer Token'})
    async signOut(@CurrentUser() context) {
        return await this.authService.signout(context);
    }

    @Post('signup')
    @Role(role.USER_SIGNUP)
    @ApiOperation({summary: 'signup'})
    @ApiResponse({status: 201, type: ResponseCreateUserDto, isArray: false})
    @ApiHeader({name: 'Authorization', description: 'Bearer Token'})
    async createUser(@Body() body: CreateUserDto) {
        return await this.authService.signup(body);
    }

    @Post('refreshtoken')
    @Role(role.USER_LOGGED_IN)
    @ApiOperation({summary: 'refresh token'})
    @ApiResponse({status: 201, type: ResponseCreateUserDto, isArray: false})
    @ApiHeader({name: 'Authorization', description: 'Bearer Token'})
    async refreshtoken(@CurrentUser() context, @Body() body: RefreshTokenDto) {
        return await this.authService.refreshtoken(context, body);
    }

    @Get('whoami')
    @Role(role.USER_LOGGED_IN)
    @ApiOperation({summary: 'who am i'})
    @ApiResponse({status: 200, type: SigninDto, isArray: false})
    whoAmI(@CurrentUser() context) {
        return context;
    }

    @Patch('/updatePassword')
    @Role(role.AUTH_UPDATE_PASSWORD)
    @ApiOperation({summary: 'update role of user'})
    @ApiResponse({status: 201, type: Boolean, isArray: false})
    async updatePassword(
        @CurrentUser() context,
        @Body() body: UpdatePasswordDto,
    ) {
        return await this.authService.updatePassword(context, body);
    }

}
