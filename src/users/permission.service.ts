import {Injectable} from '@nestjs/common';
// prisma
import {PrismaService} from "../prisma/prisma.service";
import {ResponsePermissionByRoleDto} from "./dto/response-permission-by-role.dto";

@Injectable()
export class PermissionService {

    constructor(
        private prisma: PrismaService,
    ) {
    }

    async findListByRole(roleCode: string): Promise<ResponsePermissionByRoleDto | null> {

        const data = await this.prisma.userRole.findUnique({
            where: {roleCode: roleCode},
            include: {
                UserRolePermission: {
                    include: {
                        UserPermission: true,
                    }
                },
            }
        });

        if (!data) {
            return null;
        }

        return {
            roleCode: data.roleCode,
            roleName: data.roleName,
            permissions: data.UserRolePermission.map((x) => x.permissionCode),
            menus: data.UserRolePermission.filter(f => f.UserPermission.permissionGroups == "Menu").map(x => x.permissionCode),
        };
    }


}
