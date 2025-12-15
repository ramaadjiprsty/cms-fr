import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOkResponse({type: UserEntity})
  async register(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return new UserEntity(await this.usersService.create(dto));
  }
}
