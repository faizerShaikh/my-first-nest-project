import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomeExceptionsFilter } from './filters/custome-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get('HttpAdapterHost');
  app.useGlobalFilters(new CustomeExceptionsFilter(httpAdapter));
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
