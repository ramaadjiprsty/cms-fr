import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'email@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    example: 'password',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'John',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @IsOptional()
  @IsPhoneNumber('ID')
  @ApiProperty({
    required: false,
    example: '081234567890',
  })
  phoneNumber?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
