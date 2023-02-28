import {ApiProperty} from "@nestjs/swagger";

export class UserDeletedDto {

    @ApiProperty() id: number;
    @ApiProperty() email: string;
}
