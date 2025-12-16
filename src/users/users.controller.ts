import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'pino-nestjs';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectPinoLogger(UsersController.name) private logger: PinoLogger,
  ) {}

  @Post('register')
  @ApiOkResponse({ type: UserEntity })
  async register(@Body() dto: CreateUserDto): Promise<UserEntity> {
    this.logger.info(`User with email ${dto.email} registered`);
    return new UserEntity(await this.usersService.create(dto));
  }
}
