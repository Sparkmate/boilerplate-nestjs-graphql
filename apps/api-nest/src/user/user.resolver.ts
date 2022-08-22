import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('userId', { type: () => String }) userId: string) {
    return this.userService.findOne(userId);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.userId, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('userId', { type: () => String }) userId: string) {
    return this.userService.remove(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  getMe(@CurrentUser() user: User) {
    return this.userService.findOne(user.userId);
  }
}
