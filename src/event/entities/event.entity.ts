import { ApiProperty } from "@nestjs/swagger";
import { Event } from "@prisma/client";

export class EventEntity implements Event {

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
