import {Controller, Get, Param} from '@nestjs/common';
import {KeyvalueService} from './keyvalue.service';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ResponseBody404} from "../shared/dtos/global.dto";

@Controller('keyvalue')
export class KeyvalueController {

    constructor(private readonly keyvalueService: KeyvalueService) {
    }

    // @Get(':key')
    // @ApiOperation({summary: 'get employee by id'})
    // @ApiResponse({status: 200, type: null, isArray: false})
    // @ApiResponse({status: 404, type: ResponseBody404, isArray: false})
    findOne(@Param('key') key: string) {
        return this.keyvalueService.findOne(key);
    }
}
