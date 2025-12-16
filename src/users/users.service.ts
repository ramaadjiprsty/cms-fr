import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { Prisma } from 'generated/client';
import { QueryUserDto } from './dto/query-user.dto';

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

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prismaService.user.findMany();

    if (!users) {
      throw new HttpException('No users found', 404);
    }

    return users.map((user) => new UserEntity(user));
  }

  // async findByEmail(email: string): Promise<UserEntity> {
  //   const user = await this.prismaService.user.findUnique({
  //     where: { email },
  //   });

  //   if (!user) {
  //     throw new HttpException(`User with email ${email} not found`, 404);
  //   }

  //   return new UserEntity(user);
  // }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, 404);
    }

    return new UserEntity(user);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findById(id);

    if (!user) {
      throw new HttpException(`User with ID ${id} not found`, 404);
    }

    await this.prismaService.user.delete({
      where: {
        id,
      },
    });

    return new UserEntity(user);
  }

  async search(
    query: QueryUserDto,
  ): Promise<{ metadata: any; data: UserEntity[] }> {
    const { search, page, limit, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {};

    if (search) {
      where.OR = [
        {
          firstName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const orderBy: Prisma.UserOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [users, total] = await this.prismaService.$transaction([
      this.prismaService.user.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      this.prismaService.user.count({ where }),
    ]);

    return {
      metadata: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
      data: users.map((user) => new UserEntity(user)),
    };
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
    return this.prismaService.user.update({
      where: { id },
      data: dto,
    });
  }
}
