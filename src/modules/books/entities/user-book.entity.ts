import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import { Book } from './book.entity';

@Table({
  tableName: 'user_books',
  modelName: 'UserBook',
})
export class UserBook extends Model<UserBook> {
  @ForeignKey(() => Book)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'cascade',
  })
  book_id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    onDelete: 'cascade',
  })
  user_id: number;
}
