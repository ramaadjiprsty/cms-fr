import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from 'pino-nestjs';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CombinedModule } from './combined/combined.module';
import { HarborsModule } from './harbors/harbors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    CombinedModule,
    HarborsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
