import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CombinedService } from './combined.service';

@Controller('combined')
export class CombinedController {
  constructor(private readonly apisixService: CombinedService) {}

  @Get()
  async getCombined() {
    try {
      return await this.apisixService.getCombinedData();
    } catch (error) {
      throw new HttpException(
        'Terjadi kesalahan pada server internal',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
