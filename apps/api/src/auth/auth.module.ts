import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { AuthHelper } from "./auth.helper";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import configuration from "../config/configuration";

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: "60d" },
    }),
  ],
  providers: [JwtStrategy, AuthHelper, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
