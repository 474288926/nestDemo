import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    //管道 --- 验证
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter()); //异常过滤器
  app.useGlobalInterceptors(new WrapResponseInterceptor());
  //配置swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('nestjs-api-文档') //文档标题
    .setDescription('nestjs-api-说明') //文档描述
    .setVersion('1.0') //文档版本
    .addBearerAuth()
    .build(); //创建
  //创建swagger
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  //启动swagger
  SwaggerModule.setup('doc', app, document); //访问路径为 localhost:3000/doc
  await app.listen(3000);
}
bootstrap();
