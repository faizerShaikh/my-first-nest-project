import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './entities/book.entity';
import { UserBook } from './entities/user-book.entity';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [SequelizeModule.forFeature([Book, UserBook])],
})
export class BooksModule {}
