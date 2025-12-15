import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'pino-nestjs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {bufferLogs: true});
  app.useLogger(app.get(Logger))

  const config = new DocumentBuilder()
  .setTitle("CMS")
  .setVersion("1.0")
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
