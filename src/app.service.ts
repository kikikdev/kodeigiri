import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): object {
        const obj = {};
        obj[process.env.APP_NAME] = process.env.APP_VERSION;
        obj['LINGKUNGAN'] = process.env.ENV;
        return obj;
    }
}
