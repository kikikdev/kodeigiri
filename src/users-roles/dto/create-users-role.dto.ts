import {UsersRoleEntity} from "../entities/users-role.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsString} from "class-validator";

export class CreateUsersRoleDto implements Partial<UsersRoleEntity>{

    @IsString()
    @ApiProperty() roleCode: string;

    @IsString()
    @ApiProperty() roleName: string;

    @IsArray()
    @ApiProperty() permissionCodes: string[];

}
