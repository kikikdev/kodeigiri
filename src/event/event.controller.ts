import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { Role } from '../shared/decorators/roles.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as role from '../shared/utils/role.utils';
import { CreateeventDto } from './dto/create-event.dto';
import { UpdateeventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import { eventPageDto } from './dto/event-page.dto';
import { FindeventDto } from './dto/find-event.dto';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  //--------------------------------------------------GET

  @Get('get-event')
  @Role(role.GET_DASHBOARDSCOPE)
  @ApiOperation({ summary: 'get event page' })
  @ApiResponse({ status: 200, type: eventPageDto, isArray: false })
  async findPage(@Query() query: FindeventDto) {
    const data = await this.eventService.findPage(query);
    if (!data) {
      throw new NotFoundException('event not found');
    }
    return data;
  }

  //--------------------------------------------------GET BY ID

  @Get(':id/find-event')
  @Role(role.FIND_DASHBOARDSCOPE)
  @ApiOperation({ summary: 'find event by id' })
  @ApiResponse({ status: 200, type: CreateeventDto, isArray: false })
  async findByID(@Param('id') id: string) {
    const event = await this.eventService.findOne(+id);
    if (!event) {
      throw new NotFoundException('event not found');
    }
    return await event;
  }

  //--------------------------------------------------POST

  @Post('create-event')
  @Role(role.CREATE_DASHBOARDSCOPE)
  @ApiOperation({ summary: 'create event' })
  @ApiResponse({ status: 201, type: CreateeventDto, isArray: false })
  async createevent(@Body() body: CreateeventDto) {
    return await this.eventService.createevent(body);
  }

  //--------------------------------------------------PATCH

  @Patch(':id/event')
  @Role(role.UPDATE_DASHBOARDSCOPE)
  @ApiOperation({ summary: 'update event' })
  @ApiResponse({ status: 201, type: CreateeventDto, isArray: false })
  async update(@Param('id') id: string, @Body() body: UpdateeventDto) {
    const event = await this.eventService.findOne(+id);
    if (!event) {
      throw new NotFoundException('event not found');
    }
    return await this.eventService.update(+id, body);
  }

  //--------------------------------------------------DELETE

  @Delete(':id')
  @ApiOperation({ summary: 'remove event' })
  @Role(role.REMOVE_DASHBOARDSCOPE)
  @ApiResponse({ status: 201, isArray: false })
  async remove(@Param('id') id: string) {
    const data = await this.eventService.delete(+id);
    if (!data) {
      throw new NotFoundException('event not found');
    }

    return data;
  }
}
