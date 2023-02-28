import {ApiProperty} from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime";
import {MetaPaginationDto} from "../../shared/dtos/meta-pagination.dto";
const moment = require('moment');

export class eventDetailDto {

    @ApiProperty()
    id: number;

    @ApiProperty()
    event_name: string;

    @ApiProperty()
    event_date: string;

    @ApiProperty()
    event_time: string;

    @ApiProperty()
    event_location: string;

    @ApiProperty()
    event_image: string;

}

export class eventPageDto {

    @ApiProperty({type: eventDetailDto, isArray: true})
    data: eventDetailDto[];

    @ApiProperty({type: MetaPaginationDto, isArray: false})
    meta: MetaPaginationDto;

}

export function transformeventPage(data: any): eventDetailDto {
    
    return {
        id: data.id,
        event_name: data.event_name,
        event_date: data.event_date,
        event_time: data.event_time,
        event_location: data.event_location,
        event_image: data.event_image,
    }  as eventDetailDto;

}
