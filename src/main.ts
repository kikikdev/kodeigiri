import {HttpAdapterHost, NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {LoggingInterceptor} from "./shared/guards/interceptors/logging.interceptor";
import {
    PrismaClientExceptionFilter,
    PrismaClientExceptionFilter2,
    PrismaClientInitializationError
} from './prisma/prisma-client-exception.filter';
import {RoleAuthGuard} from "./shared/guards/role-auth.guard";
import {JwtAuthGuard} from "./shared/guards/jwt-auth.guard";

async function bootstrap() {

    const app = await NestFactory.create(AppModule);
    (app as any).set('etag', false);
    app.enableCors({
        origin: true,
        credentials: true
    });

    app.use((req, res, next) => {
        res.removeHeader('x-powered-by');
        res.removeHeader('date');
        next();
    });

    app.useGlobalInterceptors(new LoggingInterceptor());
    app.useGlobalGuards(new JwtAuthGuard);
    app.useGlobalGuards(new RoleAuthGuard(new Reflector()));

    // apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
    const {httpAdapter} = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
    app.useGlobalFilters(new PrismaClientInitializationError(httpAdapter));
    app.useGlobalFilters(new PrismaClientExceptionFilter2(httpAdapter));

    // swagger config
    const config = new DocumentBuilder()
        .setTitle('Kodegiri Api NestJS')
        .setDescription('Kodegiri Api NestJS')
        .setVersion(process.env.APP_VERSION + ' ' + process.env.ENV)
        // .addBearerAuth()
        .build();

    //
    //
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        customSiteTitle: 'KODEGIRI API',
        swaggerOptions: {
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });

    await app.listen(process.env.PORT || 8080);

}

bootstrap()