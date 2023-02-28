import {IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdatePasswordDto {

    @IsString()
    @ApiProperty()
    passwordOld: string;

    @IsString()
    @ApiProperty()
    passwordNew: string;

}
