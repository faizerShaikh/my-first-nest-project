import { Controller } from '@nestjs/common';
import { GenericController } from '../generic/generic.controller';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController extends GenericController<Book, BookDto> {
  constructor(private readonly booksService: BooksService) {
    super(booksService);
  }
}
