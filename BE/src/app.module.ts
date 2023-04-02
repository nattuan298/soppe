import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { UploadModule } from './modules/upload/upload.module';
import { ProductsModule } from './modules/products/products.module';
import { FavouriteProductsModule } from './modules/favourite-products/favourite-products.module';
import { BannersModule } from './modules/banners/banners.module';
import { AddressModule } from './modules/address/address.module';
import { OrdersModule } from './modules/orders/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }),
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
          },
          defaults: {
            from: `"No Reply" <${process.env.MAIL_USERNAME}>`,
          },
        },
        template: {
          dir: process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UsersModule,
    AuthModule,
    UploadModule,
    ProductsModule,
    FavouriteProductsModule,
    BannersModule,
    AddressModule,
    OrdersModule,
  ],
})
export class AppModule {}
