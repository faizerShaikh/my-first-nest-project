import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController],
  providers: [PostService],
  imports: [SequelizeModule.forFeature([Post])],
  exports: [PostService],
})
export class PostsModule {}
