import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GenericController } from '../generic/generic.controller';
import { ResponseDTO } from '../generic/interfaces/response.interface';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/public-route.decorator';

@Controller('users')
export class UsersController extends GenericController<User, UserDto> {
  constructor(private userService: UsersService) {
    super(userService);
  }

  @Public()
  @Post('/register')
  createObj(body: UserDto): Promise<ResponseDTO<User>> {
    return this.userService.create(body);
  }

  @Public()
  @Post('/signin')
  signinUser(@Body() body: UserDto) {
    return this.userService.signin(body);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
}
