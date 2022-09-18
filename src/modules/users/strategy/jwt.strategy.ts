import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import {  } from 'passport-strategy';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private configService: ConfigService,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {
    super({
      secretOrKey: configService.get('JWTKEY'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<User> {
    console.log(payload);
    const user = await this.userModel.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
