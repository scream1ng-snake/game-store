import { BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { Order } from "src/orders/schemas/orders.model";

@Table({tableName: "order-games", createdAt: false, updatedAt: false})
export class OrderGame extends Model{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.INTEGER})
  gameId: number;

  @Column({type: DataType.INTEGER, defaultValue: 1})
  amount: number;

  @ForeignKey(() => Order)
  @Column({type: DataType.INTEGER})
  orderId: number

  @BelongsTo(() => Order)
  order: Order
}
