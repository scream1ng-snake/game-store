import React from "react"
import styles from "./Cart.module.scss"
import { useAppSelector } from "src/store/hooks"
import { RootState } from "src/store/store"
import { CartItem } from "./CartItem/CartItem"
import Animation from "src/components/Animation/Animation"

export const Cart = () => {
  const cart = useAppSelector((state: RootState) => state.cartReducer.cart)
  const totalPrice = () => {
    let total = 0
    cart.forEach((game) => {
      total += game.price
    })
    return total
  }

  return (
    <Animation direction="left">
      <div className={styles.wrapper}>
        {cart.length > 0 ? (
          <>
            <div className={styles.cart}>
              {cart.map((item) => (
                <CartItem key={item.id} game={item} />
              ))}
            </div>
            <div className={styles.payment}>
              <div className={styles.payment__header}>
                <h4>Summary</h4>
                <div>Total : {totalPrice()} $</div>
              </div>
              <button>Check out</button>
            </div>
          </>
        ) : (
          <div className={styles.empty}>Your cart is empty</div>
        )}
      </div>
    </Animation>
  )
}
