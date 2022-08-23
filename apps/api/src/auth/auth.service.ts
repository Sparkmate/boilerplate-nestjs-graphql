import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AuthHelper } from "./auth.helper";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import { CreateUserInput } from "./dto/create-user.input";
import { LoginUserInput } from "./dto/login-user.input";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(AuthHelper)
    private readonly helper: AuthHelper,
  ) {}

  public async register(body: CreateUserInput): Promise<User | never> {
    const { email, password }: CreateUserInput = body;
    console.log("ici", email, password);
    let user: User = await this.userService.findOneByEmail(email);

    if (user) {
      throw new HttpException("Conflict", HttpStatus.CONFLICT);
    }

    user = new User();

    user.email = email;
    user.password = this.helper.encodePassword(password);

    return this.userService.save(user);
  }

  public async login(body: LoginUserInput): Promise<{ token: string } | never> {
    const { email, password }: LoginUserInput = body;
    const user: User = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new HttpException("No user found", HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException("No user found", HttpStatus.NOT_FOUND);
    }

    const token = this.helper.generateToken(user);
    return { token };
  }

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }
}
