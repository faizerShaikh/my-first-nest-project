import { Controller } from '@nestjs/common';
import { GenericController } from '../generic/generic.controller';
import { PostDto } from './dto/post.dto';
import { Post } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostsController extends GenericController<Post, PostDto> {
  constructor(private readonly postService: PostService) {
    super(postService);
  }
}
