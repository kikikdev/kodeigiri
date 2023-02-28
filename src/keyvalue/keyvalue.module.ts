import {Module} from '@nestjs/common';
import {KeyvalueService} from './keyvalue.service';
import {KeyvalueController} from './keyvalue.controller';

@Module({
    controllers: [KeyvalueController],
    providers: [KeyvalueService],
    exports: [KeyvalueService],
})
export class KeyvalueModule {
}
