import { Args, Field, Mutation, ObjectType, Resolver } from "@nestjs/graphql";
import { LoginUserInput } from "./dto/login-user.input";
import { User } from "../user/entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { AuthService } from "./auth.service";

@ObjectType()
export abstract class JwtToken {
  @Field()
  token: string;
}

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.authService.register(createUserInput);
  }

  @Mutation(() => JwtToken)
  login(@Args("loginUserInput") loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
