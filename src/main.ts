import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfiguration, AppConfiguration } from './config/configuration';
import { ResponseInterceptor } from './config/interceptors/response.interceptor';
import { HttpExceptionFilter } from './config/interceptors/exception.filter';

const configureSwagger = (app: INestApplication) => {
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Airdrop API')
    .setDescription('The Khoi Toc Bet API description')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  SwaggerModule.setup(`docs`, app, swaggerDoc);
};

const configureValidation = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfiguration>(appConfiguration.KEY);
  app.enableShutdownHooks();

  configureSwagger(app);
  configureValidation(app);
  app.enableCors();

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(appConfig.port);
}
bootstrap().then();
