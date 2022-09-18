import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenericService } from '../generic/generic.service';
import { ResponseDTO } from '../generic/interfaces/response.interface';
import { User } from '../users/user.entity';
import { BookDto } from './dto/book.dto';
import { Book } from './entities/book.entity';
import { UserBook } from './entities/user-book.entity';

@Injectable()
export class BooksService extends GenericService<Book, BookDto> {
  constructor(
    @InjectModel(Book) private readonly bookModel: typeof Book,
    @InjectModel(UserBook)
    private readonly userBookModel: typeof UserBook,
  ) {
    super(bookModel, { model: User, through: { attributes: [] } });
  }

  async create(body: BookDto): Promise<ResponseDTO<Book>> {
    const book = await this.bookModel.create<Book>({
      name: body.name,
      published_at: body.published_at,
    });
    let userBooks = body.users.map((item) => ({
      user_id: item,
      book_id: book.id,
    }));
    await this.userBookModel.bulkCreate<UserBook>(userBooks);
    return { data: book, success: true, message: 'Book created successfully' };
  }

  async update(body: BookDto, id: number): Promise<ResponseDTO<Book>> {
    const book = await this.bookModel.update(
      { name: body.name, published_at: body.published_at },
      { where: { id }, returning: true },
    );
    await this.userBookModel.destroy({ where: { book_id: id } });

    let userBooks = body.users.map((item) => ({
      user_id: item,
      book_id: id,
    }));

    await this.userBookModel.bulkCreate(userBooks);

    return {
      data: book[1][0],
      success: true,
      message: 'Book updated successfully',
    };
  }
}
