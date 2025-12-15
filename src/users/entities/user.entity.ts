import { ApiProperty } from "@nestjs/swagger";
import { Role, User } from "generated/prisma/client.js";

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  id: string;

  @ApiProperty({
    example: "email@example.com"
  })
  email: string;

  @ApiProperty({
    example: "password"
  })
  password: string;

  @ApiProperty({
    example: "John"
  })
  firstName: string;

  @ApiProperty({
    example: "Doe"
  })
  lastName: string;

  @ApiProperty({
    required: false,
    example: "081234567890"
  })
  phoneNumber: string | null;
  profilePic: string | null;
  Role: Role;
  createdAt: Date;
  updatedAt: Date;
}
