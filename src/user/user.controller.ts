import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('/')
  getUserInfo(@Req() request: Request) {
    const id = (request as any).user.id;
    return this.userService.getUserInfo(id);
  }
}
