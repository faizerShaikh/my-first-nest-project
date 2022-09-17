import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GenericController } from '../generic/generic.controller';
import { ResponseDTO } from '../generic/interfaces/response.interface';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController extends GenericController<User, UserDto> {
  constructor(private userService: UsersService) {
    super(userService);
  }

  @Post('/register')
  createObj(body: UserDto): Promise<ResponseDTO<User>> {
    return this.userService.create(body);
  }

  @Post('/signin')
  signinUser(@Body() body: UserDto) {
    return this.userService.signin(body);
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }
}
