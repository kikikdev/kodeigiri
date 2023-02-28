import {ArgumentsHost, Catch, HttpStatus} from '@nestjs/common';
import {BaseExceptionFilter} from '@nestjs/core';
import {Prisma} from '@prisma/client';
import {Response} from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {

        console.log(`PrismaClientKnownRequestError`);
        console.log(`exception.message ${exception.message}`);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let status, message, messageArray;

        messageArray = exception.message.replace(/\n/g, '').split(';');
        message = messageArray[messageArray.length - 1].trim();
        messageArray = message.split('  ');
        message = messageArray[messageArray.length - 1].trim();

        switch (exception.code) {
            case 'P1017':
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                response.status(status).json({
                    statusCode: status,
                    message: "Server has closed the connection",
                });
                break;
            case 'P2002':
            case 'P2003':
                status = HttpStatus.BAD_REQUEST;
                response.status(status).json({
                    statusCode: status,
                    message: message,
                });
                break;
            default:
                // default 500 error code
                // super.catch(exception, host);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
                response.status(status).json({
                    statusCode: status,
                    message: message.replace(
                        /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''
                    ),
                });
                break;
        }
    }
}

@Catch(Prisma.PrismaClientInitializationError)
export class PrismaClientInitializationError extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientInitializationError, host: ArgumentsHost) {

        console.log(`PrismaClientInitializationError`);
        console.log(`exception.message ${exception.message}`);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let status, message, messageArray;

        status = HttpStatus.INTERNAL_SERVER_ERROR;
        messageArray = exception.message.replace(/\n/g, '').split(';');
        message = messageArray[messageArray.length - 1].trim();
        messageArray = message.split('  ');
        message = messageArray[messageArray.length - 1].trim();

        response.status(status).json({
            statusCode: status,
            message: message.replace(
                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''
            ),
        });
    }
}

@Catch(Prisma.PrismaClientValidationError)
export class PrismaClientExceptionFilter2 extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientValidationError, host: ArgumentsHost) {

        console.log(`PrismaClientValidationError`);
        console.log(`exception.message ${exception.message}`);

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        let status, message, messageArray;

        status = HttpStatus.BAD_REQUEST;
        messageArray = exception.message.replace(/\n/g, '').split(';');
        message = messageArray[messageArray.length - 1].trim();
        messageArray = message.split('  ');
        message = messageArray[messageArray.length - 1].trim();

        response.status(status).json({
            statusCode: status,
            message: message.replace(
                /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''
            ),
        });

    }
}