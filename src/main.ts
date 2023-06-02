import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { graphqlUploadExpress } from 'graphql-upload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.use(
    graphqlUploadExpress({
      maxFiles: 10,
      maxFileSize: 1000000000,
    }),
  );

  await app.listen(3000);
}
bootstrap();
