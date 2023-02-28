import * as helper from '../shared/utils/helper.utils';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateeventDto } from './dto/create-event.dto';
import { UpdateeventDto } from './dto/update-event.dto';
import { Event } from '@prisma/client';
import { FindeventDto } from './dto/find-event.dto';
import { transformeventPage } from './dto/event-page.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async createevent(body: CreateeventDto) {
    const event = await this.prisma.event.create({
      data: { ...body },
    });

    return event;
  }

  async findPage(query: FindeventDto): Promise<Event> {
    const { page, limit, event_name, sort } = query;
    const { skip, take } = helper.getOffset(page, limit);
    const where = {} as any;

    if (event_name) {
      Object.assign(where, { subject: event_name });
    }

    let orderBy = [];
    orderBy = [{ id: 'asc' }];
    if (sort) {
      switch (sort) {
        case 'id':
          orderBy = [{ id: 'desc' }];
          break;
      }
    }

    const list = await this.prisma.event.findMany({
      where: where,
      skip: skip,
      take: take,
      orderBy: orderBy,
    });

    const count = await this.prisma.event.count({
      where: where,
    });

    const listTransform = list.map((v) => transformeventPage(v));

    const meta = helper.getMeta(page, limit, count);

    return {
      data: listTransform,
      meta: meta,
    } as any as Event;
  }

  async findOne(id: number): Promise<Event | null> {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async update(
    id: number,
    body: UpdateeventDto,
  ): Promise<Event> {
    const updated = await this.prisma.event.update({
      where: {
        id: +id,
      },
      data: { ...body },
    });

    return updated;
  }

  async delete(id: number): Promise<Event | null> {
    const updated = await this.prisma.event.delete({
      where: {
        id: id,
      },
    });
    return updated;
  }
}
