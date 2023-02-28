import {IsArray, IsObject, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class SigninDto {

    @IsString()
    @ApiProperty({default: 'kikik.dev@gmail.com'})
    email: string;

    @IsString()
    @ApiProperty({default: '12345'})
    password: string;
}

export class TokenDto {

    id: number;
    fullname: string;
    email: string;
    roleCode: string;
    roleName: string;
    companyCode: string;
    companyName: string;
    departmentCode: string;
    departmentName: string;
    locationCode: string;
    locationName: string;
    positionCode: string;
    positionName: string;
    positionLevel: number;
    permissions: string[];
    errorCode: string;
    errorMessage: string;

}

export class SigninResponseDto {

    @IsString()
    @ApiProperty({default: 'JIUzI1NiIsIn.IjoibmlwMDAxIiwiZW1haWwiOiJ0ZXN0MkBtYWlsLmNvbSIsInJvbGVDb2RlIjoic3VwZXJ.njAAYyfVJVg2CuJdGJEPMQYS'})
    access_token: string;

    @IsString()
    @ApiProperty({default: 'njAAYyfVJVg2CuJdGJEPMQYS'})
    access_refresh_token: string;

    @IsObject()
    @ApiProperty({type: TokenDto, isArray: false})
    context: TokenDto;

    @IsArray()
    @ApiProperty({type: String, isArray: true})
    menus: string[];
}

