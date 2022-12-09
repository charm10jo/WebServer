import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "src/user/user.repository";
import * as config from 'config'
import { Users } from "src/user/entity/user.entity";
const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userRepository : UserRepository
    ){
        super({
            secretOrKey: jwtConfig.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {
        const { Id } = payload;
        const user: Users = await this.userRepository.findOne({ where : {Id} });
        if(!user){
            throw new NotFoundException('그런 사람 없어요.')
        }
        return user;
    }
}