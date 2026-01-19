import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

// Принудительно загружаем .env файл ДО всего
import * as dotenv from 'dotenv';
import * as path from 'path';

// Определяем путь к .env файлу
const envPath = path.resolve(process.cwd(), '.env');
console.log(`📁 Loading .env from: ${envPath}`);

// Загружаем .env
dotenv.config({ path: envPath });

// Проверяем загруженные переменные
console.log('✅ Loaded environment variables:');
console.log(`   PORT: ${process.env.PORT || 'not set'}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   API_PREFIX: ${process.env.API_PREFIX || 'not set'}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // 1. Сначала устанавливаем глобальный префикс
  const apiPrefix: string = configService.get('API_PREFIX', 'api');
  app.setGlobalPrefix(apiPrefix);

  // 2. Затем настраиваем Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE', 'BugTracker API'))
    .setDescription(
      configService.get('SWAGGER_DESCRIPTION', 'API documentation'),
    )
    .setVersion(configService.get('SWAGGER_VERSION', '1.0'))
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // 3. Настраиваем Swagger UI
  const swaggerPath: string = configService.get('SWAGGER_PATH', 'swagger');
  SwaggerModule.setup(swaggerPath, app, document);

  // 4. Запускаем сервер
  const port: number = configService.get<number>('PORT', 3000);
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger UI: http://localhost:${port}/${swaggerPath}`);
  console.log(`🌐 API Base URL: http://localhost:${port}/${apiPrefix}`);
  console.log(
    `⚡ Environment: ${configService.get('NODE_ENV', 'development')}`,
  );
}

bootstrap();
