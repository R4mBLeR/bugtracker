import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';

const environment = process.env.NODE_ENV || 'development';
const envFile = environment === 'production' ? '.env.prod' : '.env.dev';
const envPath = path.resolve(process.cwd(), envFile);

console.log(`📁 Loading environment from: ${envPath} (${environment} mode)`);

dotenv.config({ path: envPath });

console.log('✅ Loaded environment variables:');
console.log(`   PORT: ${process.env.PORT || 'not set'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   API_PREFIX: ${process.env.API_PREFIX || 'not set'}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const apiPrefix: string = configService.get('API_PREFIX', 'api');
  app.setGlobalPrefix(apiPrefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE', 'BugTracker API'))
    .setDescription(
      configService.get('SWAGGER_DESCRIPTION', 'API documentation'),
    )
    .setVersion(configService.get('SWAGGER_VERSION', '1.0'))
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  const swaggerPath: string = configService.get('SWAGGER_PATH', 'swagger');
  SwaggerModule.setup(swaggerPath, app, document);

  const port: number = configService.get<number>('PORT', 5050);
  const host: string = configService.get<string>('HOST', '0.0.0.0');
  await app.listen(port, host);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger UI: http://localhost:${port}/${swaggerPath}`);
  console.log(`🌐 API Base URL: http://localhost:${port}/${apiPrefix}`);
  console.log(`⚙️ Environment: ${environment}`);
}

bootstrap();
