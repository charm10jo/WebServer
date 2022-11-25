import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRepository } from 'src/util/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { Users } from './entity/user.entity';

@CustomRepository(Users)
export class UserRepository extends Repository<Users> {
  async signup(user): Promise<Users> {
    const { Id, password, name, gender, korIns, privIns, birthday } = user;
    const result = this.create({
      Id,
      password,
      name,
      gender,
      korIns,
      privIns,
      birthday,
    });

    try {
      return await this.save(result);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('아이디가 중복됩니다.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
