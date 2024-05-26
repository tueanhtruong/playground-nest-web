import { ApiKeyAuthGuard, ResponseInterceptor } from '@commons';
import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetWeatherDto } from './dto';
import { WeatherService } from './weather.service';

@ApiTags('Weather')
@UseInterceptors(ResponseInterceptor)
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiBearerAuth()
  @UseGuards(ApiKeyAuthGuard)
  @Get()
  getWeatherInfo(@Query() query: GetWeatherDto) {
    return this.weatherService.getWeatherInfo(query);
  }
}
