import {UserRole} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class UsersRoleEntity implements UserRole {

    @ApiProperty() roleCode: string;
    @ApiProperty() roleName: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() createdBy: string;
    @ApiProperty() updatedAt: Date;
    @ApiProperty() updatedBy: string;

}
