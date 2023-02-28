import {ApiProperty} from "@nestjs/swagger";

export class ResponsePermissionByRoleDto {

  @ApiProperty()
  roleCode: string;

  @ApiProperty()
  roleName: string;

  @ApiProperty()
  permissions: string[];

  @ApiProperty()
  menus: string[];

}
