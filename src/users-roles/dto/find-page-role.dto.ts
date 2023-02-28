import {IsNumber, IsOptional, IsString,} from 'class-validator';
import {Transform} from "class-transformer";

export class FindPageRoleDto {

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => parseInt(value))
    page: number = 1;

    @IsNumber()
    @IsOptional()
    @Transform(({value}) => parseInt(value))
    limit: number = 20;

    @IsString()
    @IsOptional()
    search: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    role: string;

}
