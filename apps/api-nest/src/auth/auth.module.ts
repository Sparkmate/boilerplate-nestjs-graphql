import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthHelper } from './auth.helper';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../config/constants';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [JwtStrategy, AuthHelper, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
