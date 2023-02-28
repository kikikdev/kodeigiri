import {IsString} from 'class-validator';

export class UpdateRoleOfUserDto {

    @IsString() roleCode: string;

}
