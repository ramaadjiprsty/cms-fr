import { Role, User } from "generated/prisma/client.js";

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string | null;
  profilePic: string | null;
  Role: Role;
  createdAt: Date;
  updatedAt: Date;
}
