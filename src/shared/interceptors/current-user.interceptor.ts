import {CallHandler, ExecutionContext, Injectable, NestInterceptor,} from '@nestjs/common';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(
        // private authService: AuthService,
    ) {
    }

    async intercept(context: ExecutionContext, handler: CallHandler) {
        const request = context.switchToHttp().getRequest();
        const {userId} = request.session || {};

        if (userId) {
            // const user = await this.authService.findOne(userId);
            // // const user = {} as any;
            request.currentUser = {
                name: 'andi',
                note: 'interceptor'
            };
        }

        return handler.handle();
    }
}
