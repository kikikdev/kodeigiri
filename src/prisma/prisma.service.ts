/*
import {INestApplication, Injectable, OnModuleInit} from '@nestjs/common';
import {Prisma, PrismaClient} from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
    implements OnModuleInit {

    constructor() {
        // pass PrismaClientOptions e.g. logging levels or error formatting
        super({
            log: [
                { emit: 'stdout', level: 'query' },
                { emit: 'stdout', level: 'info' },
                { emit: 'stdout', level: 'warn' },
                { emit: 'stdout', level: 'error' },
            ],
            errorFormat: 'pretty',
        });
        this.$use(async (params, next) => {
            const before = Date.now()
            const result = await next(params)
            const after = Date.now()
            console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)
            return result
        });
        // this.$on<any>('query', (event: Prisma.Queryevent) => {
        //     console.log('Query: ' + event.query);
        //     console.log('Params: ' + event.params);
            // console.log('Duration: ' + event.duration + 'ms');
        // });
    }

    async onModuleInit() {
        // await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async (event) => {
            console.log(event.name);
            await app.close();
        });

    }

}
*/
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit {

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });    
  }

  exceptions(e: any) {
    let error, msg;
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      error = 'KnownRequestError';
    } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
      error = 'UnknownRequestError';
    } else if (e instanceof Prisma.PrismaClientRustPanicError) {
      error = 'RustPanicError';
    } else if (e instanceof Prisma.PrismaClientInitializationError) {
      error = 'InitializationError';
    } else if (e instanceof Prisma.PrismaClientValidationError) {
      error = 'ValidationError';
    }
    switch (error) {
      case 'KnownRequestError':
        switch (e.code) {
          case 'P2002':
            msg = `Unique constraint failed on the constraint: ${e.meta['target']}`;
            break;
          case 'P2003':
            msg = `Foreign key constraint failed on the field: ${e.meta['field_name']}`;
            break;
          case 'P2011':
            msg = `Null constraint violation on the ${e.meta['constraint']}`;
            break;
          case 'P2022':
            msg = `The column ${e.meta['column']} does not exist in the current database.`;
            break;
          case 'P2025':
            msg = `An operation failed because it depends on one or more records that were required but not found. ${e.meta['cause']}`;
            break;
          case 'P2012':
            msg = `Missing a required value at ${e.path}`
            break;
          default:
            msg = `${error} ${e.code} - ${e.message}`;
            break;
        }
        break;
      case 'UnknownRequestError':
        switch (e.code) {
          default:
            msg = `${error} ${e.code} - ${e.message}`;
            break;
        }
        break;
      case 'RustPanicError':
        switch (e.code) {
          default:
            msg = `${error} ${e.code} - ${e.message}`;
            break;
        }
        break;
      case 'InitializationError':
        switch (e.code) {
          default:
            msg = `${error} ${e.code} - ${e.message}`;
            break;
        }
        break;
      case 'ValidationError':
        msg = `${error} - ${e.message
          .replace(/\n/g, '')
          .split(')')
          .slice(-1)[0]
          .trim()}`;
        break;
      default:
        msg = `${e.code} - ${e.message}`;
        break;
    }
    return msg;
  }
}
