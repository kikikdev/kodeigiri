import {User, UserHasRoles} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";
import {IsOptional} from 'class-validator';


export class UserPageByRoleDataDto {
    @ApiProperty() id: number;
    @ApiProperty() email: string;
}

export class UserPageByRoleMetaDto {
    @ApiProperty() page: number;
    @ApiProperty() limit: number;
    @ApiProperty() totalPage: number;
    @ApiProperty() totalData: number;
}

export class UserPageByRoleDto {

    @ApiProperty({type: UserPageByRoleDataDto, isArray: true})
    data: UserPageByRoleDataDto[];

    @ApiProperty({type: UserPageByRoleMetaDto, isArray: false})
    meta: UserPageByRoleMetaDto;
}

export function transformObjRole(
    obj: (User & {
        UserHasRoles: UserHasRoles,
    })
): UserPageByRoleDataDto {

    return {
        id: obj.id,
        email: obj.email,
    }
}


export function transformListRole(
    list: (User & {
        UserHasRoles: UserHasRoles,
    })[]
) {
    const t = [];
    list.map((obj) =>
        t.push(transformObjRole(obj))
    );

    return t;
}