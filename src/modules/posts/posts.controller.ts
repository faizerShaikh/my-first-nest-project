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

  // @Post('/')
  // createPost(@Body() body: PostDto) {
  //   return this.postService.create(body);
  // }

  // @Put('/:id')
  // updatePost(@Body() body: PostDto, @Param('id') id: string) {
  //   return this.postService.update(body, +id);
  // }

  // @Get('/:id')
  // getOneById(@Param('id') id: number) {
  //   return this.postService.findOne(+id);
  // }

  // @Get('/')
  // getAll() {
  //   return this.postService.findAll();
  // }

  // @Delete('/:id')
  // delete(@Param('id') id: number) {
  //   return this.postService.delete(+id);
  // }
}
