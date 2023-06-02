import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response';
import { LoginUserInputDto } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { UserDto } from 'src/user/dto/user.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginUserInput: LoginUserInputDto) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => UserDto)
  signup(@Args('loginUserInput') loginUserInput: LoginUserInputDto) {
    return this.authService.signup(loginUserInput);
  }
}
