import { Module } from '@nestjs/common';
import { CombinedService } from './combined.service';
import { CombinedController } from './combined.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [CombinedService],
  controllers: [CombinedController],
})
export class CombinedModule {}
