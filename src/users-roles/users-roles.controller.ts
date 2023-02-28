import {Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import {UsersRolesService} from './users-roles.service';
import {CreateUsersRoleDto} from './dto/create-users-role.dto';
import {UpdateUsersRoleDto} from './dto/update-users-role.dto';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FindPageUserDto} from "../users/dto/find-page-user.dto";
import {RoleDetailDto} from "./dto/role-detail.dto";
import {Role} from "../shared/decorators/roles.decorator";
import * as role from "../shared/utils/role.utils";
import {RoleCreatedDto} from "./dto/role-created.dto";

@Controller('users-roles')
@ApiTags('Users: Roles')
export class UsersRolesController {
    constructor(private readonly usersRolesService: UsersRolesService) {
    }

    @Post()
    @Role(role.CREATE_USER_ROLE)
    @ApiOperation({summary: 'create new user-role'})
    @ApiResponse({status: 201, type: RoleCreatedDto, isArray: false})
    async createOne(@Body() body: CreateUsersRoleDto) {
        return await this.usersRolesService.create(body);
    }

    @Get('code/:code')
    @Role(role.FIND_USER_ROLE_BY_CODE)
    async findOne(@Param('code') code: string) {
        return await this.usersRolesService.findOne(code);
    }

    @Get(':code')
    @Role(role.FIND_USER_ROLE_DETAIL)
    @ApiOperation({summary: 'fint detail user-role'})
    @ApiResponse({status: 201, type: RoleDetailDto, isArray: false})
    async findOneDetail(@Param('code') code: string) {
        const data = await this.usersRolesService.findOneDetail(code);
        if (!data) throw new NotFoundException('Role not found');
        return data;
    }

    @Get()
    @Role(role.FIND_USER_ROLE_PAGE)
    @ApiOperation({summary: 'get user-role page'})
    @ApiResponse({status: 200, type: null, isArray: false})
    async findPage(@Query() query: FindPageUserDto) {
        return await this.usersRolesService.findPage(query);
    }

    @Patch(':code')
    @Role(role.UPDATE_USER_ROLE)
    @ApiOperation({summary: 'update user-role'})
    @ApiResponse({status: 201, type: null, isArray: false})
    async update(
        @Param('code') code: string,
        @Body() body: UpdateUsersRoleDto
    ) {
        return await this.usersRolesService.update(code, body);
    }

    @Delete(':code')
    @Role(role.REMOVE_USER_ROLE)
    @ApiOperation({summary: 'update user-role'})
    @ApiResponse({status: 201, type: Boolean, isArray: false})
    async remove(@Param('code') code: string) {
        const role = await this.usersRolesService.findOne(code);
        if (!role) {
            throw new NotFoundException('role not found');
        }

        return await this.usersRolesService.remove(code);
    }
}
