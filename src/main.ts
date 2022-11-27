import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule, IS_DEV } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 8080;
const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  const logger: Logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule, {
    // 开启日志级别打印
    logger: IS_DEV ? ['log', 'debug', 'error', 'warn'] : ['error', 'warn'],
  });
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
  SwaggerModule.setup(PREFIX, app, document); //swagger3访问路径为
  // await app.listen(3000);
  await app.listen(PORT, () => {
    logger.log(
      `服务已经启动,接口请访问:http://wwww.localhost:${PORT}/${PREFIX}`,
    );
  });
}
bootstrap();
