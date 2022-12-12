import { Module } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { UserModule } from '../user/user.module';
import { Coordinates } from '../util/coordinates';
import { SortService } from '../util/sort.service';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
    imports: [UserModule],
    controllers: [SearchController],
    providers: [SearchService, ConnectionService, Coordinates, SortService],
    exports: [Coordinates, SortService]
})
export class SearchModule {}
