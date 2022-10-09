import React from 'react'
import styles from "../../Header.module.scss"
import Link from "next/link"
import { CartLink } from '../HeaderCart/CartLink'
import { Search } from 'src/components/Search/Search'

interface IProps {
  isBurger: boolean
}

export default function MobileHeaderMenu({ isBurger }: IProps) {
  return (
    <ul className={styles.menu}>
      <li className={styles.menu__item}>
        <Link href="/games">Games</Link>
      </li>
      <li className={styles.menu__item}>
        <Link href="/about">About</Link>
      </li>
      <li className={styles.menu__item}>
        <CartLink />
      </li>
      <li className={styles.menu__item}>
        <Search burger={isBurger} />
      </li>
    </ul>
  )
}
