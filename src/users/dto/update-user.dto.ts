import {IsEmail, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {

  @IsString() @IsOptional()
  @ApiProperty({default: 'kikik'})
  fullname: string;

  @IsEmail() @IsOptional()
  @ApiProperty({default: 'kikik.dev@gmail.com'})
  email: string;

  @IsString() @IsOptional()
  @ApiProperty({default: 'Elnusa Petrofin'})
  company: string;

  @IsString() @IsOptional()
  @ApiProperty({default: 'Information Technology'})
  department: string;

}
