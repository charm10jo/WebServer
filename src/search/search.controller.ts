import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception/exceptionfilter';
import { SearchAddressValidationPipe } from './pipes/search-address-validation.pipe';
import { SearchDivisionValidationPipe } from './pipes/search-division-validation.pipe';
import { SearchLanguageValidationPipe } from './pipes/search-language-validation.pipe';
import { SearchPriorityValidationPipe } from './pipes/search-priority-validation.pipe';
import { Hospitals } from './search.entity';
import { SearchService } from './search.service';

//@UseFilters(HttpExceptionFilter)
@Controller()
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Get('/:division/:address/:language')
  async getAll(
    @Param('division', SearchDivisionValidationPipe) division: number,
    @Param('address', SearchAddressValidationPipe) address: number,
    @Param('language', SearchLanguageValidationPipe) language: number,
    @Query('priority', SearchPriorityValidationPipe) priority: number,
  ) : Promise<[]>
   {
    return this.searchService.getAll(division, address, language, priority);
  }
 
}
