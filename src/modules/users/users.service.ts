import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { Post } from '../posts/post.entity';
import { Book } from '../books/entities/book.entity';
import { InjectModel } from '@nestjs/sequelize';
import { GenericService } from '../generic/generic.service';
import { ResponseDTO } from '../generic/interfaces/response.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService extends GenericService<User, UserDto> {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private jwtService: JwtService,
  ) {
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

    const token = await this.createToken(newUser.id, newUser.email);
    return {
      token,
      data: newUser,
      success: true,
      message: 'User Created Successfully',
    };
  }

  async findOneByEmail(email: string): Promise<ResponseDTO<User>> {
    const data = await this.userModel.findOne<User>({
      where: { email },
      include: [{ model: Post }, { model: Book, through: { attributes: [] } }],
    });

    if (!data) throw new NotFoundException('User not found!');
    return { data, success: true };
  }

  async signin(user: UserDto): Promise<ResponseDTO<User>> {
    let isExitingUser = await this.userModel.findOne<User>({
      where: { email: user.email },
    });
    if (!isExitingUser) {
      throw new UnauthorizedException('Invalid credintials!');
    }

    if (!bcrypt.compare(isExitingUser.password, user.password)) {
      throw new UnauthorizedException('Invalid credintials!');
    }
    isExitingUser.password = undefined;
    const token = await this.createToken(isExitingUser.id, isExitingUser.email);
    return {
      token,
      data: isExitingUser,
      success: true,
    };
  }

  private async createToken(id: number, email: string): Promise<string> {
    return await this.jwtService.signAsync({ id, email });
  }
}
