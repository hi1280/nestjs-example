import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import admin from 'firebase-admin';
import * as serviceAccount from './firebase.json';
import helmet from 'helmet';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  let logger = null;
  if (process.env.NODE_ENV === 'development') {
    logger = ['log', 'error', 'warn', 'debug', 'verbose'];
  } else {
    logger = ['error', 'warn'];
  }
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  app.use(helmet());
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const config = new DocumentBuilder()
    .setTitle('Posts example')
    .setDescription('The posts API description')
    .setVersion('1.0')
    .addTag('posts')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('reference', app, document);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
  await app.listen(3000);
}
bootstrap();
