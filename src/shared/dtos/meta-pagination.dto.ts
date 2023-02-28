import {ApiProperty} from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime";

export class MetaPaginationDto {

    @ApiProperty()
    page: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    totalPage: number;

    @ApiProperty()
    totalData: number;

}

export class MetaProjectPlanningDto {

    @ApiProperty()
    total_duration: any;

    @ApiProperty()
    total_weight: any;

    @ApiProperty()
    total_budged: any;

}

export class MetaProjectPlanningActualizationDto {

    @ApiProperty()
    planning_start_date: any;

    @ApiProperty()
    planning_finish_date: any;

    @ApiProperty()
    actualization_start_date: any;

    @ApiProperty()
    actualization_finish_date: any;

    @ApiProperty()
    running_day: any;

    @ApiProperty()
    running_date: any;

    @ApiProperty()
    planning_previous_cumulative: any;

    @ApiProperty()
    planning_total_cumulative: any;

    @ApiProperty()
    actualization_previous_cumulative: any;

    @ApiProperty()
    actualization_total_cumulative: any;

    @ApiProperty()
    deviation: any;

    @ApiProperty()
    progress_status: any;
    
}

