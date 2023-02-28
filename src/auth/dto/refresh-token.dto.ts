import {IsString} from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class RefreshTokenDto {

    @IsString()
    @ApiProperty({default:'njAAYyfVJVg2CuJdGJEPMQYS'})
    xTokenRefresh: string;

}
