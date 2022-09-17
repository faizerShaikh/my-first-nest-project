import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import { UserBook } from './user-book.entity';

@Table({
  tableName: 'books',
  modelName: 'Book',
})
export class Book extends Model<Book> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  published_at: string;

  @BelongsToMany(() => User, () => UserBook)
  users: User[];
}
