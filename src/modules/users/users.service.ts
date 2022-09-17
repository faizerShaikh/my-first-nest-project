import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { Post } from '../posts/post.entity';
import { Book } from '../books/entities/book.entity';
import { InjectModel } from '@nestjs/sequelize';
import { GenericService } from '../generic/generic.service';
import { ResponseDTO } from '../generic/interfaces/response.interface';

@Injectable()
export class UsersService extends GenericService<User, UserDto> {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    super(User, [
      { model: Post },
      { model: Book, through: { attributes: [] } },
    ]);
  }

  async create(user: UserDto): Promise<ResponseDTO<User>> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    let newUser = await this.userModel.create<User>(user);
    newUser.password = undefined;
    return {
      data: newUser,
      success: true,
      messages: 'User Created Successfully',
    };
  }

  async findOneByEmail(email: string): Promise<ResponseDTO<User>> {
    const data = await this.userModel.findOne<User>({
      where: { email },
      include: [{ model: Post }, { model: Book, through: { attributes: [] } }],
    });
    return { data, success: true };
  }

  async signin(user: UserDto): Promise<ResponseDTO<User>> {
    let isExits = await this.userModel.findOne<User>({
      where: { email: user.email },
    });
    if (!isExits) {
      throw new UnauthorizedException('Invalid credintials!');
    }

    if (!bcrypt.compare(isExits.password, user.password)) {
      throw new UnauthorizedException('Invalid credintials!');
    }
    isExits.password = undefined;
    return {
      data: isExits,
      success: true,
      messages: 'User Created Successfully',
    };
  }
}
