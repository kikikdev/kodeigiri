import {UserRole} from "@prisma/client";

export class RolePageDto {
    data: RoleDataDto[];
    meta: RoleMetaDto;
}

export class RoleDataDto {
    roleCode: string;
    roleName: string;
    UserHasRoles: number;
    UserRolePermission: number;
}

export class RoleMetaDto {
    page: number;
    limit: number;
    totalPage: number;
    totalData: number;
}

export function transformRole(
    obj: (UserRole & {
        _count: {
            UserHasRoles: number,
            UserRolePermission: number
        }
    })
): RoleDataDto {

    return {
        roleCode: obj.roleCode,
        roleName: obj.roleName,
        UserHasRoles: obj._count.UserHasRoles,
        UserRolePermission: obj._count.UserRolePermission,
    }
}


export function transformListRole(
    list: (UserRole & {
        _count: {
            UserHasRoles: number,
            UserRolePermission: number
        }
    })[]
) {

    const t = [];
    list.map((obj) => t.push(transformRole(obj)));

    return t;
}