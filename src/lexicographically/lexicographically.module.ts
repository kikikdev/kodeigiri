import { Module } from '@nestjs/common';
import { LexicographicallyController } from './lexicographically.controller';

@Module({
  imports: [LexicographicallyModule],
  controllers: [LexicographicallyController],
  providers: [],
})
export class LexicographicallyModule {}
