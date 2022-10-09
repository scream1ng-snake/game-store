import Image from "next/image"
import React, { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "src/store/hooks"
import { addToCart, addToWhishlist } from "src/store/actions"
import styles from "./GameInfo.module.scss"
import { IGame } from "src/types/IGame"
import { RootState } from "src/store/store"

interface IProps {
  description: string
  image: string
  price: number
  game: IGame
}

export const GameInfo: FC<IProps> = ({description, image, price, game}) => {
  const [added, setAdded] = useState<boolean>(false)
  const cart = useAppSelector((state: RootState) => state.cartReducer.cart)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const isAdded = cart.find((item) => item.name === game.name)
    isAdded
      ? setAdded(true)
      : setAdded(false)
  }, [cart])

  const handleAddToCart = () => {
    dispatch(addToCart(game))
  }


  return (
    <main className={styles.description}>
      <div className={styles.banner}>
        <Image
          src={image}
          layout="fill"
          objectFit="cover"
          alt="game-background-image"
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.info__title}>Описание</h3>
        <div className={styles.info__content}>{description}</div>
      </div>
      <div className={styles.price}>
        <span>{price} $</span>
      </div>
      <div className={styles.button}>
        <button
          className={styles.button__add}
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? "Добавлено" : "Добавить в корзину"}
        </button>
      </div>
    </main>
  )
}
