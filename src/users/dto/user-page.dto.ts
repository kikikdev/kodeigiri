import {
    User,
    UserHasRoles,
    UserRole
} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
const moment = require('moment');

export class UserPageEmployeeDto {
    @ApiProperty() email: string;
    @ApiProperty() employeeName: string;
    @ApiProperty() companyCode: string;
    @ApiProperty() companyName: string;
    @ApiProperty() departmentCode: string;
    @ApiProperty() departmentName: string;
    @ApiProperty() locationCode: string;
    @ApiProperty() locationName: string;
    @ApiProperty() positionCode: string;
    @ApiProperty() positionName: string;
    @ApiProperty() positionLevel: number;
}

export class UserPageDataDto {
    @ApiProperty() id: number;
    @ApiProperty() fullname: string;
    @ApiProperty() email: string;
    @ApiProperty() company: string;
    @ApiProperty() department: string;
    @ApiProperty() isLoggedIn: boolean;
    @ApiProperty() roleCode: string;
    @ApiProperty() roleName: string;
    @ApiProperty() createdAt: string;
    @ApiProperty() isActive: string;
}

export class UserPageMetaDto {
    @ApiProperty() page: number;
    @ApiProperty() limit: number;
    @ApiProperty() totalPage: number;
    @ApiProperty() totalData: number;
}

export class UserPageDto {

    @ApiProperty({type: UserPageDataDto, isArray: true})
    data: UserPageDataDto[];

    @ApiProperty({type: UserPageMetaDto, isArray: false})
    meta: UserPageMetaDto;
}

export function transformObj(
    obj: (User & {
        UserHasRoles: UserHasRoles & {
            UserRole: UserRole
        }
    })
): UserPageDataDto {

    return {
        id: obj.id,
        fullname: obj.fullname,
        email: obj.email,
        company: obj.company,
        department: obj.department,
        isLoggedIn: obj.isLoggedIn,
        roleCode: obj.UserHasRoles?.UserRole?.roleCode,
        roleName: obj.UserHasRoles?.UserRole?.roleName,
        createdAt: moment(obj.createdAt).format(),
        isActive: obj.isActive,
    }
}


export function transformList(
    list: (User & {
        UserHasRoles: UserHasRoles & {
            UserRole: UserRole
        }
    })[]
) {

    const t = [];
    list.map((obj) => t.push(transformObj(obj)));

    return t;
}