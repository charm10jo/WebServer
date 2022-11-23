import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/util/typeorm-ex.module';
import { Users } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import * as config from 'config'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
const jwtConfig = config.get('jwt');

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConfig.secret,
            signOptions:{
                expiresIn: 3600
            }
        }),
        TypeOrmExModule.forCustomRepository([UserRepository])],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
