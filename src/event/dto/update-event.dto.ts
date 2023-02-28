import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsNumber } from "class-validator";

const moment = require('moment');

export class UpdateeventDto {
    
    @IsString() @IsOptional()
    @ApiProperty({type: String, isArray: false})
    event_name: string;

    @IsString() @IsOptional()
    @ApiProperty({type: Date, isArray: false})
    event_date: string;

    @IsString() @IsOptional()
    @ApiProperty({type: 'timestamp', isArray: false})
    event_time: string;

    @IsString() @IsOptional()
    @ApiProperty({type: String, isArray: false})
    event_location: string;

    @IsString() @IsOptional()
    @ApiProperty({type: String, isArray: false})
    event_image: string;
}
