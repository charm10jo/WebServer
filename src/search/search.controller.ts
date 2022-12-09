import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/exceptionfilter';
import { SearchAddressValidationPipe } from './pipes/search-address-validation.pipe';
import { SearchDivisionValidationPipe } from './pipes/search-division-validation.pipe';
import { SearchLanguageValidationPipe } from './pipes/search-language-validation.pipe';
import { SearchPriorityValidationPipe } from './pipes/search-priority-validation.pipe';
import { SearchService } from './search.service';
import { SearchDto } from './dto/searchdto';
import { SearchBodyValidationPipe } from './pipes/search-body-validation.pipe';
import { SearchLatitudeValidationPipe } from './pipes/search-latitude-validation.pipe';
import { SearchLongitudeValidationPipe } from './pipes/search-longitude-validation.pipe';

//@UseFilters(HttpExceptionFilter)
//@UseGuards(AuthGuard())
@Controller()
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Post('/')
  async getHospital(
    @Body(SearchBodyValidationPipe) SearchDto: SearchDto
    ) {
    const { division, language, priority, latitude, longitude } = SearchDto;

    const result = await this.searchService.getHospital(division, language, priority, latitude, longitude);

    return {result : result}
  }

  @Get('/:division/:language/:priority')
  async getAll(
    @Param('division', SearchDivisionValidationPipe) division: number,
    @Param('language', SearchLanguageValidationPipe) language: number,
    @Param('priority', SearchPriorityValidationPipe) priority: number,
    @Query('latitude', SearchLatitudeValidationPipe  ) latitude: number,
    @Query('longitude', SearchLongitudeValidationPipe ) longitude: number,
  ) 
   {
    return this.searchService.getHospital(division, language, priority, latitude, longitude);
  }
 
}
