import { BelongsTo, ForeignKey, Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";
import { User } from "src/users/schemas/user.model";

@Table({tableName: "buyed-games", createdAt: false, updatedAt: false})
export class BuyedGame extends Model{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({type: DataType.INTEGER })
  gameId: number;

  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId: number

  @BelongsTo(() => User)
  user: User
}
