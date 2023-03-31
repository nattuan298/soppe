"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const aws_sdk_1 = require("aws-sdk");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const options = new swagger_1.DocumentBuilder()
        .setTitle('Back-end Template')
        .setDescription('The Back-end Template API description')
        .setVersion('1.0')
        .addTag('template')
        .addBearerAuth({
        type: 'http',
        name: 'Authorization',
        in: 'header',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    aws_sdk_1.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.enableCors();
    app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map