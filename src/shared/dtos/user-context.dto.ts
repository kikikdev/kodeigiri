import {IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UserContextDto {

    @IsString()
    @ApiProperty()
    id: number;

    @IsString()
    @ApiProperty()
    email: string;

    @IsString()
    @ApiProperty()
    roleCode: string;

    @IsString()
    @ApiProperty()
    roleName: string;
    
    @IsString()
    @ApiProperty()
    companyCode: string;

    @IsString()
    @ApiProperty()
    companyName: string;

    @IsString()
    @ApiProperty()
    departmentCode: string;

    @IsString()
    @ApiProperty()
    departmentName: string;

    @IsString()
    @ApiProperty()
    locationCode: string;

    @IsString()
    @ApiProperty()
    locationName: string;

    @IsString()
    @ApiProperty()
    positionCode: string;

    @ApiProperty()
    @IsString()
    positionName: string;

    @ApiProperty()
    @IsString()
    positionLevel: number;

    @IsString()
    @ApiProperty()
    permissions: string[] = [];

    @IsString()
    @ApiProperty()
    errorCode: string = '';

    @IsString()
    @ApiProperty()
    errorMessage: string = '';

}

// page,
//     limit,
//     totalPage: Math.ceil(count / limit),
//     totalData: count