import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Book } from '../books/entities/book.entity';
import { UserBook } from '../books/entities/user-book.entity';
import { Post } from '../posts/post.entity';

@Table({
  tableName: 'users',
  modelName: 'User',
})
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      max: 8,
      min: 6,
    },
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'male',
    validate: {
      customValidator: (value: string) => {
        let values = ['male', 'female'];
        if (!values.includes(value)) {
          throw new Error('Gender must be an valid in option');
        }
      },
    },
  })
  gender: string;

  @HasMany(() => Post)
  posts: Post[];

  @BelongsToMany(() => Book, () => UserBook)
  books: Book[];
}
