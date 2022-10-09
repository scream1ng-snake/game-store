import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Token } from 'src/auth/schemas/token.model';
import { Cart } from 'src/carts/schemas/cart.model';
import { FilesModule } from 'src/files/files.module';
import { Role } from 'src/roles/schemas/roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { UserRoles } from 'src/roles/schemas/user-roles.model';
import { User } from 'src/users/schemas/user.model';
import { UsersModule } from 'src/users/users.module';
import * as path from "path";
import { ServeStaticModule } from "@nestjs/serve-static";
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/schemas/orders.model';
import { CartsModule } from './carts/carts.module';
import { OrderGame } from './games/schemas/order-game.model';
import { CartGame } from './games/schemas/cart-games.model';
import { BuyedGame } from './games/schemas/buyed-game.model';


@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static')}),
    ConfigModule.forRoot({envFilePath: '.env'}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Cart, CartGame, Role, UserRoles, Token, Order, OrderGame, BuyedGame],
      autoLoadModels: true
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    FilesModule,
    OrdersModule,
    CartsModule
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
