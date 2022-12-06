import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SearchDto } from './search/dto/searchdto';


@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get('/hospital')
  async getHospital(@Body(ValidationPipe) searchDto: SearchDto) {
    const { division, address, language, priority, latitude, longitude } = searchDto;
    return this.appService.getHospital(division, language, priority, latitude, longitude);
  }
}
