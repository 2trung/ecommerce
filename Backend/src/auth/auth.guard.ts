import {
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers?.authorization?.split(' ')[1] || '';
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
      request.user = decoded;
      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new HttpException('Token expired', 401);
      else throw new HttpException('Invalid token', 403);
    }
  }
}
