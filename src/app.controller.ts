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
import { SearchBodyValidationPipe } from './search/pipes/search-body-validation.pipe';


@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('/hospital')
  async getHospital(
    @Body(SearchBodyValidationPipe) SearchDto: SearchDto
    ) {
    const { division, language, priority, latitude, longitude } = SearchDto;

    const result = await this.appService.getHospital(division, language, priority, latitude, longitude);

    return {result : result}
  }
}
