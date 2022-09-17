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

  // async create(post: PostDto): Promise<Post> {
  //   return this.postModel.create<Post>(post);
  // }

  // async update(post: PostDto, id: number): Promise<Post> {
  //   await this.postModel.update<Post>(post, { where: { id } });
  //   const upadtedPost = await this.postModel.findOne<Post>({
  //     where: { id },
  //   });
  //   return upadtedPost;
  // }

  // async findById(id: number): Promise<Post> {
  //   return this.postModel.findOne<Post>({
  //     where: { id },
  //     include: {
  //       model: User,
  //       attributes: ['name', 'id', 'email', 'gender'],
  //     },
  //   });
  // }

  // async findAll(): Promise<Post[]> {
  //   return this.postModel.findAll<Post>({
  //     include: {
  //       model: User,
  //       attributes: ['name', 'id', 'email', 'gender'],
  //     },
  //   });
  // }

  // async delete(id?: number): number {
  //   return this.postModel.destroy({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
