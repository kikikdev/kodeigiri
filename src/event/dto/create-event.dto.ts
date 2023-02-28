import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class CreateeventDto {

    @IsString()
    @ApiProperty({type: String, isArray: false})
    event_name: string;

    @IsString()
    @ApiProperty({type: String, isArray: false})
    event_date: string;

    @IsString()
    @ApiProperty({type: String, isArray: false})
    event_time: string;

    @IsString()
    @ApiProperty({type: String, isArray: false})
    event_location: string;

    @IsString()
    @ApiProperty({type: String, isArray: false})
    event_image: string;

}

