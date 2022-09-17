import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';
import { BooksModule } from './modules/books/books.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/database/database.config';
import { DEVELOPMENT } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      ...databaseConfig[process.env.NODE_ENV || DEVELOPMENT],
      synchronize: true,
      alter: true,
      autoLoadModels: true,
    }),
    UsersModule,
    PostsModule,
    BooksModule,
  ],
  exports: [SequelizeModule],
})
export class AppModule {}
