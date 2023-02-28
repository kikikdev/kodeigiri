import {IsArray} from "class-validator";
import {ApiProperty} from '@nestjs/swagger';

export class UpdateUsersRoleDto {

    @IsArray()
    @ApiProperty() permissionCodes: string[];

}
