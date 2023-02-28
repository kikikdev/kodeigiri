import {IsNumber, IsOptional,} from 'class-validator';
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class FindPageUserByRoleDto {

    @Transform(({value}) => parseInt(value))
    @IsNumber() @IsOptional()
    @ApiProperty()
    page: number = 1;

    @Transform(({value}) => parseInt(value))
    @IsNumber() @IsOptional()
    @ApiProperty()
    limit: number = 20;

}
