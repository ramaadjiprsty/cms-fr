import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from 'generated/prisma/client';
import { InjectPinoLogger, PinoLogger } from 'pino-nestjs';
import { Pool } from 'pg'; // <--- Ini wajib ada
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @InjectPinoLogger(PrismaService.name) private readonly logger: PinoLogger,
  ) {
    const isProduction = process.env.NODE_ENV === 'production';

    // 1. Setup Connection Pool
    const connectionString = `${process.env.DATABASE_URL}`;
    const pool = new Pool({ connectionString });

    // 2. Setup Adapter
    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: isProduction
        ? [
            { emit: 'event', level: 'error' },
            { emit: 'event', level: 'warn' },
          ]
        : [
            { emit: 'event', level: 'query' },
            { emit: 'event', level: 'info' },
            { emit: 'event', level: 'warn' },
            { emit: 'event', level: 'error' },
          ],
    } as Prisma.PrismaClientOptions);
  }

  async onModuleInit() {
    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
      (this as any).$on('query', (e) => {
        this.logger.info(e.query);
      });
      (this as any).$on('info', (e) => {
        this.logger.info(e);
      });
    }

    (this as any).$on('error', (e) => {
      this.logger.error(e);
    });
    (this as any).$on('warn', (e) => {
      this.logger.warn(e);
    });

    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
