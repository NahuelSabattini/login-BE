import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurationMongo } from './configuration/configuration-mongo';
import { AuthModule } from './auth/auth.module';
import { configurationJwt } from './configuration/configuration-jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo, configurationJwt],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongo.MONGO_URL'),
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
