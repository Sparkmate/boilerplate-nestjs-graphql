import {
  createParamDecorator,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err: unknown, user: User): any {
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    const req: any = ctx.getContext().req;
    return !!req.user;
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
