import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthEntity } from './entities/auth.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({type: AuthEntity})
    async login(@Body() dto: LoginDto): Promise<AuthEntity> {
        return this.authService.login(dto.email, dto.password);
    
    }
}
