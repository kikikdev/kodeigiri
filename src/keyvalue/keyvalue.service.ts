import {Injectable} from '@nestjs/common';
import {KeyValueStore} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class KeyvalueService {

    constructor(
        private prisma: PrismaService,
    ) {
    }

    async findOne(key: string): Promise<KeyValueStore | null> {

        const data = await this.prisma.keyValueStore.findUnique({where: {key}});
        if (!data) {
            return null;
        }

        return data;
    }

    async create(key: string, value: any, expiredAt: Date): Promise<KeyValueStore | null> {

        return await this.prisma.keyValueStore.upsert({
            where: {
                key: key,
            },
            update: {
                value: value,
                expiredAt: expiredAt,
            },
            create: {
                key: key,
                value: value,
                expiredAt: expiredAt,
            },
        });
    }

    async remove(key: string): Promise<KeyValueStore | null> {

        return await this.prisma.keyValueStore.delete({where: {key}});
    }

}
