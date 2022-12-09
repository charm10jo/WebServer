import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HttpExceptionFilter } from 'src/exception/exceptionfilter';
import { GetUser } from 'src/util/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entity/user.entity';
import { UserService } from './user.service';

//@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  signup(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<Users> {
    const { Id, password, confirm } = createUserDto;

    if (!Id || !password || !confirm)
      throw new Error('입력값이 없어요. 파이프는 어떻게 통과했담?');

    if (password !== confirm) throw new Error('비번이 확인란과 불일치하는데요');

    return this.userService.signup(createUserDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) loginUserDto: LoginUserDto): Promise< {accessToken:string} > {
    const { Id, password } = loginUserDto;
    if (!Id || !password)
      throw new Error('입력값이 없어요. 파이프는 어떻게 통과했담?');

    return this.userService.login(loginUserDto);
  }

  // @Post('/auth')
  // @UseGuards(AuthGuard())
  // auth(@GetUser() user:Users){
  //   console.log('user', user)
  // }
}
