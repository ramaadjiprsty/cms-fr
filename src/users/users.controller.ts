import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
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

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async findAll(
    @Query() query: QueryUserDto,
  ): Promise<{ metadata: any; data: UserEntity[] }> {
    this.logger.info('Getting all users');
    const paginatedResponse = await this.usersService.search(query);
    const serializedData = paginatedResponse.data.map(
      (user) => new UserEntity(user),
    );

    return {
      metadata: paginatedResponse.metadata,
      data: serializedData,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: UserEntity })
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return new UserEntity(await this.usersService.findById(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(await this.usersService.update(id, dto));
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return new UserEntity(await this.usersService.remove(id));
  }
}
