import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { LoginUserInputDto } from './dto/login-user.input';
import { LoginResponseDto } from './dto/login-response';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.getUser(username);
    const valid = await bcrypt.compare(password, user?.password);
    if (user && valid) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(loginUserInput: LoginUserInputDto): Promise<LoginResponseDto> {
    const user = await this.userService.getUser(loginUserInput.username);
    const { password, ...result } = user;

    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: result,
    };
  }

  async signup(loginUserInput: LoginUserInputDto): Promise<User> {
    const user = await this.userService.getUser(loginUserInput.username);
    if (user) {
      throw new Error('User already exists!');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);
    return this.userService.createUser({ ...loginUserInput, password });
  }
}
