import {User} from "@prisma/client";
import {ApiProperty} from "@nestjs/swagger";

export class UserEntity implements User {
    @ApiProperty() id: number;
    @ApiProperty() fullname: string;
    @ApiProperty() email: string;
    @ApiProperty() password: string;
    @ApiProperty() company: string;
    @ApiProperty() department: string;
    @ApiProperty() isLoggedIn: boolean;
    @ApiProperty() lastDateLogin: Date;
    @ApiProperty() isActive: any;
    @ApiProperty() createdAt: Date;
    @ApiProperty() createdBy: string;
    @ApiProperty() updatedAt: Date;
    @ApiProperty() updatedBy: string;

}
