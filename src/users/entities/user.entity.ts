import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role, User } from 'generated/client';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  id: string;

  @ApiProperty({
    example: 'email@example.com',
  })
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({
    example: 'John',
  })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
  })
  lastName: string;

  @ApiProperty({
    required: false,
    example: '081234567890',
  })
  @ApiProperty({
    required: false,
    example: '081234567890',
  })
  phoneNumber: string | null;

  profilePic: string | null;

  @Exclude()
  Role: Role;

  createdAt: Date;

  updatedAt: Date;
}
