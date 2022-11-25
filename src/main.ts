import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as https from 'https';
import * as http from 'http';
const configService = new ConfigService();
const fs = require('fs');
const server = express();

const CA = configService.get('CA');
const KEY = configService.get('KEY');
const CERT = configService.get('CERT');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();

  try {
    const httpsOptions = {
      ca: fs.readFileSync(`${CA}`),
      key: fs.readFileSync(`${KEY}`),
      cert: fs.readFileSync(`${CERT}`),
    };

    https.createServer(httpsOptions, server).listen(3000, async () => {
      console.log(`HTTPS:// 3000만큼 사랑해`);
    });
  } catch (error) {
    console.log('HTTPS 서버가 실행되지 않습니다.');
    console.log(error);

    http.createServer(server).listen(3000, () => {
      console.log(`http:// 3000만큼 사랑해`);
    });
  }
}
bootstrap();
