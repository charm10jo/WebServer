import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entity/user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<Users> {
    const {
      Id,
      password,
      name,
      phoneNumber,
      gender,
      birthday,
      korIns,
      privIns,
    } = createUserDto;

    const salt = await bcrypt.genSalt(+this.configService.get<number>('SALT'));
    const hashed = await bcrypt.hash(password, salt);

    const user = {
      Id,
      password:hashed,
      name,
      phoneNumber,
      gender,
      birthday,
      korIns,
      privIns,
    };

    return await this.userRepository.signup(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<{accessToken:string}> {
    const { Id, password } = loginUserDto;
    const user = await this.userRepository.findOneBy({ Id });

    if (!user) throw new NotFoundException('그런 사람 없어요.');

    if (user && (await bcrypt.compare(password, user.password))) {
    //if(user && (user.password === password)){

      const payload = { user }
      const accessToken = this.jwtService.sign(payload);

      return {accessToken}

    } else {
      throw new UnauthorizedException('비번이 다릅니다.');
    }
  }
}
