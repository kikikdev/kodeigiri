import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query,} from '@nestjs/common';
// service
import {UsersService} from './users.service';
// entity
// dto
import {FindPageUserDto} from "./dto/find-page-user.dto";
// decorator
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {PermissionService} from "./permission.service";
import {ResponsePermissionByRoleDto} from "./dto/response-permission-by-role.dto";
import {Role} from "../shared/decorators/roles.decorator";
import * as role from "../shared/utils/role.utils";
import {UserPermissionsDataDto} from "./dto/user-permissions-page.dto";
import {FindPageUserByRoleDto} from "./dto/find-page-user-by-role.dto";
import {UserPageDataDto, UserPageDto} from "./dto/user-page.dto";
import {UserPageByRoleDto} from "./dto/user-page-by-role.dto";
import {UserDeletedDto} from "./dto/user-deleted.dto";
import {CurrentUser} from "../shared/decorators/current-user.decorator";
import {UpdateRoleOfUserDto} from "./dto/update-role-of-user.dto";

@Controller('users')
@ApiTags('Users')
// @Serialize(UserDto)
export class UsersController {

    constructor(
        private usersService: UsersService,
        private permissionService: PermissionService,
    ) {
    }

    /* users */

    @Post()
    @ApiOperation({summary: 'create new user'})
    @Role(role.CREATE_USER)
    @ApiResponse({status: 201, type: UserDeletedDto, isArray: false})
    async createOne(@Body() body: CreateUserDto) {
        const check_email = await this.usersService.findOneByEmail(body.email);
        if (check_email) {
            throw new NotFoundException('Email sudah terdaftar');
        }

        const user = await this.usersService.create(body);
        return {
            email: user.email,
        } as UserDeletedDto;
    }
    
    @Get()
    @ApiOperation({summary: 'get user page'})
    @Role(role.FIND_USER_PAGE)
    @ApiResponse({status: 200, type: UserPageDto, isArray: false})
    findPage(@Query() query: FindPageUserDto) {
        return this.usersService.findPage(query);
    }

    @Patch(':id')
    @Role(role.UPDATE_ORGANIZATION)
    @ApiOperation({summary: 'update user'})
    @ApiResponse({status: 201, type: UpdateUserDto, isArray: false})
    async create(
        @Param('id') id: string,
        @Body() body: UpdateUserDto,
    ) {
        const users = await this.usersService.findOne(+id);
        if (!users) {
            throw new NotFoundException('user not found');
        }
        return await this.usersService.update(+id, body);
    }

    @Get('role/:code')
    @ApiOperation({summary: 'get user page by role'})
    @Role(role.FIND_USER_PAGE_ROLE)
    @ApiResponse({status: 200, type: UserPageByRoleDto, isArray: false})
    findPageByRole(
        @Param('code') code: string,
        @Query() query: FindPageUserByRoleDto,
    ) {
        return this.usersService.findPageByRole(code, query);
    }

    @Get('permissions')
    @ApiOperation({summary: 'get user permission page'})
    @Role(role.FIND_USER_PERMISSION)
    @ApiResponse({status: 200, type: UserPermissionsDataDto, isArray: true})
    findPermissionList() {
        return this.usersService.findPermissionList();
    }

    @Get(':role/permissions')
    @Role(role.FIND_USER_ROLE_PERMISSION)
    @ApiOperation({summary: 'get user page'})
    @ApiResponse({status: 200, type: ResponsePermissionByRoleDto, isArray: false})
    async findListPermission(@Param('role') roleCode: string) {
        const data = await this.permissionService.findListByRole(roleCode);
        if (!data) {
            throw new NotFoundException('permission not found');
        }
        return data;
    }

    @Get(':id')
    @Role(role.FIND_USER_BY_ID)
    @ApiOperation({summary: 'get user detail by id'})
    @ApiResponse({status: 200, type: UserPageDataDto, isArray: false})
    findOneDetail(@Param('id') id: string) {
        return this.usersService.findOneDetail(+id);
    }

    @Get('email/active')
    @Role(role.FIND_USER_BY_ID)
    @ApiOperation({summary: 'get user email'})
    @ApiResponse({status: 200, type: UserDeletedDto, isArray: false})
    findEmailActive() {
        return this.usersService.findEmailActive();
    }

    @Patch(':id/role')
    @Role(role.UPDATE_USER_ROLE)
    @ApiOperation({summary: 'update role of user'})
    @ApiResponse({status: 201, type: Boolean, isArray: false})
    async updateRoleByID(
        @CurrentUser() context,
        @Param('id') id: string,
        @Body() body: UpdateRoleOfUserDto,
    ) {
        const user = await this.usersService.findOne(+id);
        if (!user) {
            throw new NotFoundException('user tidak ditemukan');
        }

        return await this.usersService.updateRoleByID(user, body);
    }

    @Delete(':id')
    @ApiOperation({summary: 'remove user'})
    @Role(role.REMOVE_USER)
    @ApiResponse({status: 201, type: UserDeletedDto, isArray: false})
    async removeOne(@Param('id') id: string) {

        const data = await this.usersService.remove(+id);
        if (!data) {
            throw new NotFoundException('user not found');
        }

        return data;
    }

    @Delete(':id/soft-delete')
    @ApiOperation({summary: 'active and inactive users'})
    @Role(role.REMOVE_ORGANIZATION)
    @ApiResponse({status: 201, type: UserDeletedDto, isArray: false})
    async activeInactive(@Param('id') id: string) {

        const users = await this.usersService.findOne(+id);
        if (!users) {
            throw new NotFoundException('user not found');
        }

        const data = await this.usersService.activeInactive(+id, users.isActive);
        if (!data) {
            throw new NotFoundException('user not found');
        }

        return data;
    }

    /* permissions */

}
