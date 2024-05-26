import { Module } from '@nestjs/common';
import { AuthModule, WeatherApiModule } from 'src/commons';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [WeatherApiModule, AuthModule],
})
export class WeatherModule {}
