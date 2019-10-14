import { AppModule } from './app.module';
import { NestFactory  } from '@nestjs/core';
const options = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(options);
  await app.listen(3000);
  console.log('%c SERVIDOR LEVANTADO', 'color: #00FF00');
}
bootstrap();
