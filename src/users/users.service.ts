import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';

export const roundOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(dto.password, roundOfHashing);
    dto.password = hashedPassword;

    const totalEmailExist = await this.prismaService.user.count({
      where: { email: dto.email },
    });

    if (totalEmailExist > 0) {
      throw new HttpException('Email already exists', 400);
    }

    return new UserEntity(await this.prismaService.user.create({ data: dto }));
  }
}
