import {
  WeatherApiConfig,
  WeatherApiService,
  weatherApiConstants,
  weatherApiSchema,
} from '@commons';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [weatherApiConstants],
      validationSchema: Joi.object(weatherApiSchema),
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [WeatherApiService, WeatherApiConfig],
  exports: [WeatherApiService],
})
export class WeatherApiModule {}
