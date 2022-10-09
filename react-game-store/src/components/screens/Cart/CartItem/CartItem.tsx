import Image from "next/image";
import React, { FC } from "react";
import { removeFromCart } from "src/store/actions";
import { useAppDispatch } from "src/store/hooks";
import { IGame } from "src/types/IGame";
import styles from "./CartItem.module.scss";

interface CartItemPropsType {
  game: IGame
}

export const CartItem: FC<CartItemPropsType> = ({ game }) => {
  const dispatch = useAppDispatch()
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <h3 className={styles.title}>{game.name}</h3>
        <div className={styles.imageWrapper}>
          <Image
            alt={game.name}
            src={game.background_image}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </main>
      <div className={styles.controls}>
        <div className={styles.price}>{game.price} $</div>
        <div
          className={styles.remove}
          onClick={() => dispatch(removeFromCart(game.id))}
        >
          Удалить
        </div>
      </div>
    </div>
  )
}
