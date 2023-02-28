import {ApiProperty} from "@nestjs/swagger";

export class RoleCreatedDto {
    @ApiProperty() roleCode: string;
    @ApiProperty() roleName: string;
}
