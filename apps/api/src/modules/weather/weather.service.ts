import { Injectable } from '@nestjs/common';
import { WeatherApiService } from 'src/commons';
import { GetWeatherDto } from './dto';

@Injectable()
export class WeatherService {
  constructor(private weatherApiService: WeatherApiService) {}

  async getWeatherInfo(query: GetWeatherDto) {
    const { days, current } = query;

    const include = [];
    if (days) include.push('days');
    if (current) include.push('current');

    const data = await this.weatherApiService.query({
      location: query.location,
      date1: query.fromDate,
      date2: query.toDate,
      include,
    });
    return data;
  }
}
