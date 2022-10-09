import { BelongsTo, ForeignKey, HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { CartGame } from "src/games/schemas/cart-games.model";
import { User } from "src/users/schemas/user.model";

@Table({tableName: "carts", createdAt: false, updatedAt: false})
export class Cart extends Model {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  user: User

  @HasMany(() => CartGame)
  games: CartGame[];
}