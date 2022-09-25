import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericService } from '../generic/generic.service';
import { User } from '../users/user.entity';
import { PostDto } from './dto/post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostService extends GenericService<Post, PostDto> {
  constructor(@InjectModel(Post) private readonly postModel: typeof Post) {
    super(postModel, {
      model: User,
      attributes: ['name', 'id', 'email', 'gender'],
    });
  }
}
