import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {User} from "@prisma/client";
import {FindPageUserDto} from "./dto/find-page-user.dto";
import * as helper from "../shared/utils/helper.utils";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {scrypt as _scrypt} from "crypto";
import {promisify} from "util";
import * as hash from "../shared/utils/hash.utils";
import {transformPermissionList, UserPermissionsDataDto} from "./dto/user-permissions-page.dto";
import {FindPageUserByRoleDto} from "./dto/find-page-user-by-role.dto";
import {transformList, transformObj, UserPageDataDto, UserPageDto} from "./dto/user-page.dto";
import {transformListRole, UserPageByRoleDto} from "./dto/user-page-by-role.dto";
import {UserDeletedDto} from "./dto/user-deleted.dto";
import {UpdateRoleOfUserDto} from "./dto/update-role-of-user.dto";
import {UserEntity} from "./entities/user.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {

    constructor(
        private prisma: PrismaService,
    ) {
    }

    async create(body: CreateUserDto) {

        if (body.role == "") {
            throw new ForbiddenException('user must have an role');
        }

        // user: create
        const user = await this.prisma.user.create({
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
                email: user.email,
            },
            update: {
                roleCode: body.role,
            },
            create: {
                email: user.email,
                roleCode: body.role,
            }
        });

        return user;
    }

    async update(id: number, body: UpdateUserDto): Promise<User> {
        
        const updated = await this.prisma.user.update({
            
            where: {
                id: +id,
            },
            data: {...body},
            
        });

        if(body.email){
            await this.prisma.userHasRoles.upsert({
                where: {
                    email: body.email,
                },
                update: {
                    email: body.email,
                },
                create: {
                    email: body.email,
                }
            });
        }

        return updated;
        
    }

    async findOne(id: number): Promise<User | null> {
        return this.prisma.user.findUnique({where: {id}});
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: {email: email}});
    }

    async findEmailActive(){
        return this.prisma.user.findMany({
            where: {isActive: 'active'},
            select:{id:true,email:true}
        });
    }

    async findOneDetail(id: number): Promise<UserPageDataDto> {
        const detail = await this.prisma.user.findUnique({
            where: {id},
            include: {
                UserHasRoles: {
                    include: {
                        UserRole: true,
                    }
                }
            },
        });

        if (!detail)
            throw new NotFoundException('user tidak ditemukan');

        return transformObj(detail);
    }

    async findPage(query: FindPageUserDto): Promise<UserPageDto> {

        const {page, limit, search, email, role, sort} = query;
        const {skip, take} = helper.getOffset(page, limit);
        const where = {} as any;

        if (search) {
            Object.assign(where, {
                OR: [
                    {fullname: search}
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

        let orderBy = [];
        orderBy = [{createdAt: 'desc'}];
        if (sort) {
            switch (sort) {
                case "email":
                    orderBy = [{email: 'asc'}];
                    break;
                case "createdat":
                    orderBy = [{createdAt: 'asc'}];
                    break;
            }
        }

        const list = await this.prisma.user.findMany({
            where: where,
            skip: skip,
            take: take,
            include: {
                UserHasRoles: {
                    include: {
                        UserRole: true,
                    }
                }
            },
            orderBy: orderBy,
        });

        const count = await this.prisma.user.count({
            where: where,
        });

        const listTransform = transformList(list);

        const meta = helper.getMeta(page, limit, count);

        return {
            data: listTransform, meta
        };
    }

    async findPageByRole(code: string, query: FindPageUserByRoleDto): Promise<UserPageByRoleDto> {

        const {page, limit} = query;
        const {skip, take} = helper.getOffset(page, limit);

        const where = {
            UserHasRoles: {
                roleCode: code,
            }
        } as any;

        const list = await this.prisma.user.findMany({
            where: where,
            skip: skip,
            take: take,
            include: {
                UserHasRoles: true,
            },
        });

        const count = await this.prisma.user.count({
            where: where,
        });

        const listTransform = transformListRole(list);

        const meta = helper.getMeta(page, limit, count);

        return {
            data: listTransform, meta
        };
    }

    async findPermissionList(): Promise<UserPermissionsDataDto[]> {

        const userPermissions = await this.prisma.userPermission.findMany({
            orderBy: [{
                permissionGroups: 'asc',
            }, {
                permissionCode: 'asc',
            }],
        });

        return transformPermissionList(userPermissions);
    }

    async updateRoleByID(user: User, body: UpdateRoleOfUserDto): Promise<boolean> {

        const userHasRoles = await this.prisma.userHasRoles.upsert({
            where: {
                email: user.email,
            },
            update: {
                roleCode: body.roleCode,
            },
            create: {
                email: user.email,
                roleCode: body.roleCode,
            }
        });

        return (!!userHasRoles);
    }

    async updatePassword(user: User, pass: string): Promise<UserEntity> {

        user = await this.prisma.user.update({
            where: {
                email: user.email,
            },
            data: {
                password: await hash.generateHashForPassword(pass),
            },
        }) as UserEntity;

        return user;
    }

    async remove(id: number): Promise<UserDeletedDto> {

        // get user
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
        }

        const deleted = await this.prisma.user.delete({
            where: {id}
        });

        return {
            id: deleted.id,
            email: deleted.email,
        }
    }

    async activeInactive(id: number, isActive: string): Promise<UserDeletedDto | null> {
        if(isActive=='active'){
            const updated = await this.prisma.user.update({
                where: {
                    id: id,
                },
                data: {               
                    isActive: 'inactive',
                },            
            });
            return updated;
        }else{
            const updated = await this.prisma.user.update({
                where: {
                    id: id,
                },
                data: {               
                    isActive: 'active',
                },            
            });
            return updated;
        }
    }

}
