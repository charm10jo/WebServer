import { Module } from '@nestjs/common';
import { ConnectionService } from 'src/connection/connection.service';
import { UserModule } from 'src/user/user.module';
import { Coordinates } from 'src/util/coordinates';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
    imports: [UserModule],
    controllers: [SearchController],
    providers: [SearchService, ConnectionService, Coordinates]
})
export class SearchModule {}
