import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {PermissionService} from "./permission.service";

@Module({
    imports: [UsersModule],
    controllers: [UsersController],
    providers: [UsersService, PermissionService],
    exports: [UsersService, PermissionService],
})

export class UsersModule {
    
}
