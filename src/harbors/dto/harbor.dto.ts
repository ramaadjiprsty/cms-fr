import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHarborDto {
  @ApiProperty({ example: 'Tanjung Priok' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Jakarta Utara' })
  @IsString()
  @IsNotEmpty()
  location: string;
}

export class UpdateHarborDto extends PartialType(CreateHarborDto) {}