import { BelongsTo, ForeignKey, HasMany, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { OrderGame } from "src/games/schemas/order-game.model";
import { User } from "src/users/schemas/user.model";

@Table({tableName: "orders", createdAt: false, updatedAt: false})
export class Order extends Model{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  confirmed: boolean

  @Column({type: DataType.BOOLEAN, defaultValue: false})
  paid: boolean

  @BelongsTo(() => User)
  user: User

  @HasMany(() => OrderGame)
  games: OrderGame[];
}
