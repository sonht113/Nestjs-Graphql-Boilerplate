import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';

async function bootstrap() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: isDevelopment,
      // whitelist: true,
      skipUndefinedProperties: true,
    }),
  );

  app.use(
    graphqlUploadExpress({
      maxFiles: 10,
      maxFileSize: 1000000000,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: !isDevelopment,
      contentSecurityPolicy: !isDevelopment,
    }),
  );

  await app.listen(process.env.PORT, () =>
    console.log(`Server started on port = ${process.env.PORT}`),
  );
}
bootstrap();
