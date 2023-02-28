import {UserPermission, UserRole, UserRolePermission} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class RoleDetailDto {
    @ApiProperty() roleCode: string;
    @ApiProperty() roleName: string;
    @ApiProperty() rolePermissions: RoleDetailPermissionDto[];
}

export class RoleDetailPermissionDto {
    @ApiProperty() permissionCode: string;
    @ApiProperty() permissionDescription: string;
    @ApiProperty() permissionGroups: string;
}

export function transformRoleDetail(
    obj: UserRole & {
        UserRolePermission: (UserRolePermission & {
            UserPermission: UserPermission
        })[]
    }
): RoleDetailDto {

    const getPermissions: any = (list: (UserRolePermission & { UserPermission: UserPermission })[]) => {
        const t = [];
        list.map(o => {
            t.push({
                permissionCode: o.UserPermission?.permissionCode,
                permissionDescription: o.UserPermission?.permissionDescription,
                permissionGroups: o.UserPermission?.permissionGroups,
            });
        })
        return t;
    }


    return {
        roleCode: obj.roleCode,
        roleName: obj.roleName,
        rolePermissions: getPermissions(obj.UserRolePermission) ?? [],
    }
}

