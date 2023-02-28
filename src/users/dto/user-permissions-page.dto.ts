import {UserPermission} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class UserPermissionsDataDto {

    @ApiProperty() permissionCode: string;
    @ApiProperty() permissionDescription: string;
    @ApiProperty() permissionGroups: string;
}

export function transformPermission(obj: UserPermission): UserPermissionsDataDto {

    return {
        permissionCode: obj.permissionCode,
        permissionDescription: obj.permissionDescription,
        permissionGroups: obj.permissionGroups,
    }
}


export function transformPermissionList(
    list: UserPermission[]
) {

    const t = [];
    list.map((obj) => t.push(transformPermission(obj)));

    return t;
}