import {IsNumber, IsOptional, IsString,} from 'class-validator';
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class FindPageUserDto {

    @Transform(({value}) => parseInt(value))
    @IsNumber() @IsOptional()
    @ApiProperty()
    page: number = 1;

    @Transform(({value}) => parseInt(value))
    @IsNumber() @IsOptional()
    @ApiProperty()
    limit: number = 20;

    @IsString() @IsOptional()
    @ApiProperty()
    search: string;

    @IsString() @IsOptional()
    @ApiProperty()
    email: string;

    @IsString() @IsOptional()
    @ApiProperty()
    role: string;

    @IsString() @IsOptional()
    @ApiProperty()
    sort: string;

}
