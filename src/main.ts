import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3001, async() => {
    console.log('3001만큼 사랑해')
  })
}
bootstrap();
