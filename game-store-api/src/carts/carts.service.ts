import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartGame } from 'src/games/schemas/cart-games.model';
import { Cart } from './schemas/cart.model';

const includeParams = {
  include: { model: CartGame, as: "games", through: { attributes: [] }, attributes: ["id", "gameId", "amount"] }
}

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart) private cartRepository: typeof Cart) { }

  async get(userId: number) {
    return this.getCartById(userId);
  }

  async create(userId: number) {
    return await this.cartRepository.create({ userId });
  }

  async update(updateCartDto, userId: number) {
    try {
      const cart = await this.getCartById(userId);
      cart.games.map((i) => {
        cart.$remove("games", i.)
      })
      updateCartDto.devices.map((i) => {
        cart.$add("devices", i.id)
      })
      return HttpStatus.CREATED
    } catch (e) {
      throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  private async getCartById(userId: number) {
    const cart = await this.cartRepository.findOne({ where: { userId }, ...includeParams })
    if (!cart) throw new HttpException("Корзина не найдены", HttpStatus.BAD_REQUEST);
    return cart
  }
}
