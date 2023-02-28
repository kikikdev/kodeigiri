import {IsEmail, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @IsString()
    @ApiProperty({default: 'kikik'})
    fullname: string;

    @IsEmail()
    @ApiProperty({default: 'kikik.dev@gmail.com'})
    email: string;

    @IsString()
    @ApiProperty({default: 'cGFzc3dvcmQ='})
    password: string;

    @IsString()
    @ApiProperty({default: 'Elnusa Petrofin'})
    company: string;

    @IsString()
    @ApiProperty({default: 'Information Technology'})
    department: string;

    @IsString() @IsOptional()
    @ApiProperty({default: 'admin'})
    role: string;

}

export class ResponseCreateUserDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

}
