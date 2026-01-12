import { ApiProperty } from '@nestjs/swagger';
import { Harbor } from 'generated/client';

export class HarborEntity implements Harbor {
  constructor(partial: Partial<HarborEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'Harbor 1',
  })
  name: string;

  @ApiProperty({
    example: 'Jakarta',
  })
  location: string;
}

