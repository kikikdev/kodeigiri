import {Controller, Get} from '@nestjs/common';
import {AppService} from './app.service';
import {Role} from "./shared/decorators/roles.decorator";
import * as role from "./shared/utils/role.utils";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {
    ResponseBody400,
    ResponseBody401,
    ResponseBody403,
    ResponseBody404,
    ResponseBody500
} from "./shared/dtos/global.dto";

@ApiTags('A Root')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): object {
        return this.appService.getHello();
    }

    @Get('responseAPI')
    @Role(role.USER_LOGGED_IN)
    @ApiOperation({summary: 'list response API'})
    @ApiResponse({status: 400, type: ResponseBody400, isArray: false})
    @ApiResponse({status: 401, type: ResponseBody401, isArray: false})
    @ApiResponse({status: 403, type: ResponseBody403, isArray: false})
    @ApiResponse({status: 404, type: ResponseBody404, isArray: false})
    @ApiResponse({status: 500, type: ResponseBody500, isArray: false})
    ResponseAPI() {
        return {
            ResponseBody400,
            ResponseBody401,
            ResponseBody403,
            ResponseBody404,
            ResponseBody500
        };
    }

}
