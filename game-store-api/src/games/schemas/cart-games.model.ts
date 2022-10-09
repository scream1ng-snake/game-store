import { BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Cart } from "src/carts/schemas/cart.model";

@Table({tableName: "cart-games", createdAt: false, updatedAt: false})
export class CartGame extends Model{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.INTEGER })
  gameId: number;

  @Column({type: DataType.INTEGER, defaultValue: 1})
  amount: number;

  @ForeignKey(() => Cart)
  @Column({type: DataType.INTEGER})
  cartId: number

  @BelongsTo(() => Cart)
  cart: Cart
}
