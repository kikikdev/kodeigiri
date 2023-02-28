import {IsNumber, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

const moment = require('moment');

export class FindeventDto {


    @IsNumber()
    @IsOptional()
    @Transform(({value}) => parseInt(value))
    page: number = 1;

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => parseInt(value))
    limit: number = 20;

    @IsString() @IsOptional()
    @ApiProperty()
    event_name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    sort: string;

}
