import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => UserDto)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserDto])
  @UseGuards(JwtAuthGuard)
  users() {
    return this.userService.getUsers();
  }

  @Query(() => UserDto)
  @UseGuards(JwtAuthGuard)
  user(@Args('username') username: string) {
    return this.userService.getUser(username);
  }

  @Mutation(() => UserDto)
  create(@Args('body') body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
