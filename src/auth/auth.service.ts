import {BadRequestException, ForbiddenException, Injectable, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {nanoid} from 'nanoid'
// service
import {UsersService} from '../users/users.service';
import {PrismaService} from "../prisma/prisma.service";
import {PermissionService} from "../users/permission.service";
import {KeyvalueService} from "../keyvalue/keyvalue.service";
// dto
import {SigninDto, SigninResponseDto} from "./dto/create-user.dto";
import {CreateUserDto, ResponseCreateUserDto} from "../users/dto/create-user.dto";
import {RefreshTokenDto} from "./dto/refresh-token.dto";
import {UserContextDto} from "../shared/dtos/user-context.dto";
// utils
import * as hash from "../shared/utils/hash.utils";
import {UpdatePasswordDto} from "./dto/update-password.dto";

const moment = require('moment');

@Injectable()
export class AuthService {

    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
        private usersService: UsersService,
        private permissionService: PermissionService,
        private keyvalueService: KeyvalueService,
    ) {
    }

    async signinGenerate(id: number): Promise<any> {

        // get detail user
        const userDetail = await this.usersService.findOneDetail(id);

        // generate token
        const context = {
            id: userDetail.id,
            roleCode: userDetail.roleCode,
            roleName: userDetail.roleName,
            email: userDetail.email,
        } as UserContextDto;

        const accessToken = this.jwtService.sign(context, {
            secret: process.env.JWT_SECRETKEY,
        });

        // get permissions
        let permissions = [];
        let menus = [];

        const rolePermission = await this.permissionService.findListByRole(userDetail.roleCode);
        if (rolePermission) {
            permissions = rolePermission.permissions;
            menus = rolePermission.menus;
        }

        const plaintextRefreshToken = nanoid();
        const hashRefreshToken = await hash.generateHash(plaintextRefreshToken, process.env.HASH_SALT)
        const expiredAt = moment().add(24, 'hours').toDate();

        // save has refresh token
        await this.keyvalueService.create('token.' + userDetail.email, {
            xToken: hashRefreshToken,
            xRefreshToken: hashRefreshToken,
            xPermissions: permissions,
        }, expiredAt);

        return {
            accessToken,
            plaintextRefreshToken,
            context,
            menus,
        }
    }

    async signin(body: SigninDto): Promise<SigninResponseDto> {

        // get user
        const user = await this.usersService.findOneByEmail(body.email)
        if (!user) {
            throw new ForbiddenException('unregistered user');
        }

        const [salt, storedHash] = user.password.split('.');

        const passHash = await hash.generateHash(body.password, salt);

        if (storedHash !== passHash) {
            throw new BadRequestException('invalid login or wrong password');
        }

        // generated
        const gen = await this.signinGenerate(user.id);

        return {
            access_token: gen.accessToken,
            access_refresh_token: gen.plaintextRefreshToken,
            context: gen.context,
            menus: gen.menus,
        };
    }

    async signout(user: UserContextDto): Promise<boolean> {
        // remove has refresh token
        const removed = await this.keyvalueService.remove('token.' + user.email);
        return (!!removed);
    }


    async signup(body: CreateUserDto) {

        const {email, password} = body;

        // See if email is in use
        let user = await this.usersService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException('email in use');
        }

        if (body.role == "") {
            throw new ForbiddenException('user must have an role');
        }

        // user: create
        const users = await this.prisma.user.create({
            data: {
                fullname: body.fullname,
                email: body.email,
                password: await hash.generateHashForPassword(body.password),
                company: body.company,
                department: body.department,
            }
        });

        // userHasRoles: upsert
         await this.prisma.userHasRoles.upsert({
            where: {
                email: users.email,
            },
            update: {
                roleCode: body.role,
            },
            create: {
                email: users.email,
                roleCode: body.role,
            }
        });

        return {
            id: users.id,
            email: users.email,
        } as ResponseCreateUserDto;
    }

    async refreshtoken(context: UserContextDto, body: RefreshTokenDto) {

        const {xTokenRefresh} = body;

        let data = await this.keyvalueService.findOne('token.' + context.email);
        if (!data) {
            throw new ForbiddenException('invalid_token_refresh');
        }

        if (new Date().getTime() > data.expiredAt.getTime()) {
            throw new ForbiddenException('expired_token_refresh');
        }

        const stored = data.value as any;

        const hashRefreshToken = await hash.generateHash(xTokenRefresh, process.env.HASH_SALT);
        if (hashRefreshToken !== stored.xRefreshToken) {
            throw new ForbiddenException('invalid_token_refresh');
        }

        const gen = await this.signinGenerate(context.id);

        return {
            access_token: gen.accessToken,
            access_refresh_token: gen.plaintextRefreshToken,
        } as SigninResponseDto;
    }

    async updatePassword(context: UserContextDto, body: UpdatePasswordDto) {

        const {passwordOld, passwordNew} = body;

        // get user
        let user = await this.usersService.findOneByEmail(context.email)
        if (!user) {
            throw new ForbiddenException('unregistered user');
        }

        const [salt, storedHash] = user.password.split('.');

        const passHash = await hash.generateHash(passwordOld, salt);

        if (storedHash !== passHash) {
            throw new BadRequestException('invalid or wrong old password');
        }

        user = await this.usersService.updatePassword(user, passwordNew);

        return !!user;
    }

}
