import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class GetWeatherDto {
  @ApiProperty({
    description: 'location of weather query',
    example: 'hoi an, viet nam',
  })
  @IsString()
  location: string;

  @ApiProperty({
    description: 'get weather from date',
    example: '2020-10-01',
  })
  @IsString()
  @IsOptional()
  fromDate?: string;

  @ApiProperty({
    description: 'get weather to date',
    example: '2020-10-01',
  })
  @IsString()
  @IsOptional()
  toDate?: string;

  @ApiProperty({
    description: 'include days weather',
    example: true,
  })
  @IsBooleanString()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  days?: boolean;

  @ApiProperty({
    description: 'include current weather',
    example: true,
  })
  @IsBooleanString()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  current?: boolean;
}
