import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, async() => {
    console.log('3000만큼 사랑해')
  })
}
bootstrap();
