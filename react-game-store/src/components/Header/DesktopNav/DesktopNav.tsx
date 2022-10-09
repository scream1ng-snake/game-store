import React from 'react'
import { Search } from 'src/components/Search/Search'
import styles from "../Header.module.scss"
import { CartLink } from '../HeaderComponents/HeaderCart/CartLink'
import { HeaderMenu } from '../HeaderComponents/HeaderMenu/HeaderMenu'
import { HeaderTitle } from '../HeaderComponents/HeaderTitle/HeaderTitle'

interface IProps {
  isBurger: boolean
}

export const DesktopNav = ({isBurger}: IProps) => {
  return (
    <>
      <div className={styles.left}>
        <HeaderTitle />
        <Search burger={isBurger} />
        <HeaderMenu />
      </div>
      <CartLink />
    </>
  )
}
