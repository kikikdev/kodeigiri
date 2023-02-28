import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateUsersRoleDto} from './dto/create-users-role.dto';
import {UpdateUsersRoleDto} from './dto/update-users-role.dto';
import * as helper from "../shared/utils/helper.utils";
import {FindPageRoleDto} from "./dto/find-page-role.dto";
import {RolePageDto, transformListRole} from "./dto/role-page.dto";
import {PrismaService} from "../prisma/prisma.service";
import {transformRoleDetail} from "./dto/role-detail.dto";
import {RoleCreatedDto} from "./dto/role-created.dto";

@Injectable()
export class UsersRolesService {

    constructor(
        private prisma: PrismaService,
    ) {
    }

    async create(body: CreateUsersRoleDto): Promise<RoleCreatedDto> {

        // userRole: findOne
        let userRole = await this.findOne(body.roleCode);

        if (userRole) {
            throw new BadRequestException(['role already exists']);
        }

        // userRole: create
        userRole = await this.prisma.userRole.create({
            data: {
                roleCode: body.roleCode,
                roleName: body.roleName,
            },
        });

        // permissionCodes: loop
        const data: any = [];
        for (const item of body.permissionCodes) {
            data.push({
                roleCode: body.roleCode,
                permissionCode: item,
            })
        }

        // userRolePermission: create
        await this.prisma.userRolePermission.createMany({
            data: data,
            skipDuplicates: true,
        });

        return {
            roleCode: userRole.roleCode,
            roleName: userRole.roleName,
        };
    }

    async findPage(query: FindPageRoleDto): Promise<RolePageDto> {

        const {page, limit, search, email, role} = query;
        const {skip, take} = helper.getOffset(page, limit);
        const where = {} as any;

        if (search) {
            Object.assign(where, {
                OR: [
                    {fullname: search},
                    {email: search}
                ]
            });
        }

        if (email) {
            Object.assign(where, {email: email});
        }

        if (role) {
            Object.assign(where, {
                UserHasRoles: {
                    some: {
                        roleCode: role
                    }
                }
            });
        }

        const userRoles = await this.prisma.userRole.findMany({
            where: where,
            skip: skip,
            take: take,
            include: {
                _count: {
                    select: {
                        UserHasRoles: true,
                        UserRolePermission: true,
                    },
                },
            },
        });

        const count = await this.prisma.userRole.count({
            where: where,
        });

        const userRolesTransform = transformListRole(userRoles);

        const meta = helper.getMeta(page, limit, count);

        return {
            data: userRolesTransform,
            meta
        };
    }

    async findOne(code: string) {
        return await this.prisma.userRole.findUnique({
            where: {
                roleCode: code,
            }
        });
    }

    async findOneDetail(code: string) {
        const userRole = await this.prisma.userRole.findUnique({
            where: {
                roleCode: code,
            },
            include: {
                UserRolePermission: {
                    include: {
                        UserPermission: true,
                    }
                },
            }
        });

        if (userRole) {
            return transformRoleDetail(userRole);
        }

        return [];
    }

    async update(code: string, body: UpdateUsersRoleDto) {

        // userRole: findOne
        let userRole = await this.findOne(code);

        if (!userRole) {
            throw new NotFoundException(['role not found']);
        }

        // permissionCodes: loop
        const data: any = [];
        for (const item of body.permissionCodes) {
            data.push({
                roleCode: code,
                permissionCode: item,
            })
        }

        // userRolePermission: delete
        await this.prisma.userRolePermission.deleteMany({
            where: {
                roleCode: code,
            }
        });

        // userRolePermission: create
        await this.prisma.userRolePermission.createMany({
            data: data,
            skipDuplicates: true,
        });

        return !!userRole;
    }

    async remove(code: string) {
        const deleted = await this.prisma.userRole.delete({
            where: {
                roleCode: code,
            }
        });
        return !!deleted;
    }
}
