import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

console.log('📁 Vercel environment');
console.log(`✅ Environment variables:`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'not set'}`);
console.log(`   API_PREFIX: ${process.env.API_PREFIX || 'not set'}`);

let cachedApp: any;

async function createApp() {
  if (cachedApp) {
    return cachedApp;
  }

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

  if (process.env.NODE_ENV !== 'production') {
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

    console.log(`📚 Swagger UI: /${swaggerPath}`);
  }

  await app.init();
  cachedApp = app;
  return cachedApp;
}

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  async function bootstrap() {
    const app = await createApp();
    const configService = app.get(ConfigService);
    const port = configService.get('PORT', 5050);
    const host = configService.get('HOST', '0.0.0.0');

    await app.listen(port, host);
    console.log(`🚀 Application is running on: http://localhost:${port}`);
  }
  bootstrap();
}

export default async function handler(req: any, res: any) {
  try {
    const app = await createApp();
    const instance = app.getHttpAdapter().getInstance();
    return instance(req, res);
  } catch (error) {
    console.error('❌ Error handling request:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
    });
  }
}
