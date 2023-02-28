import {ApiProperty} from "@nestjs/swagger";
import * as constant from "../utils/constant.utils";
import {IsDate, IsString} from "class-validator";

export class CheckUpsert {
    action: string = constant.UPSERT_NOACTION;
    key: any;
    data: any;
}

export class ResponseBody400 {
    @ApiProperty({default: 400})
    statusCode: number;
    @ApiProperty({default: "[nik must be a string]"})
    message: string;
    @ApiProperty({default: "Bad Request"})
    error: string;
}

export class ResponseBody401 {
    @ApiProperty({default: 401})
    statusCode: number;
    @ApiProperty({default: "session has expired at 2021-09-09T18:19:55.000Z"})
    message: string;
    @ApiProperty({default: "Unauthorized"})
    error: string;
}

export class ResponseBody403 {
    @ApiProperty({default: 403})
    statusCode: number;
    @ApiProperty({default: "Forbidden resource"})
    message: string;
    @ApiProperty({default: "Forbidden"})
    error: string;
}

export class ResponseBody404 {
    @ApiProperty({default: 404})
    statusCode: number;
    @ApiProperty({default: "Data not found"})
    message: string;
    @ApiProperty({default: "Not Found"})
    error: string;
}

export class ResponseBody500 {
    @ApiProperty({default: 500})
    statusCode: number;
    @ApiProperty({default: "Internal Server Error"})
    message: string;
}

export class CloseContactCreateDto {

    @IsString()
    @ApiProperty()
    contactNIK: string;

    @IsDate()
    @ApiProperty()
    contactDate: Date;

    @IsString()
    @ApiProperty()
    contactLocation: string;

}

export class CloseContactResponseDto extends CloseContactCreateDto {

    @ApiProperty()
    contactName: string;
    @ApiProperty()
    statusName: string;
    @ApiProperty()
    statusDate: Date;
}

