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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'pino-nestjs';
import { QueryUserDto } from './dto/query-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';

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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return new UserEntity(await this.usersService.findById(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return new UserEntity(await this.usersService.update(id, dto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return new UserEntity(await this.usersService.remove(id));
  }
}
