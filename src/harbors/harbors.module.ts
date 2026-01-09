import { Module } from '@nestjs/common';
import { HarborsService } from './harbors.service';
import { HarborsController } from './harbors.controller';

@Module({
  controllers: [HarborsController],
  providers: [HarborsService],
})
export class HarborsModule {}
