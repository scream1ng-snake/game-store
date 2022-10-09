import React, { useState } from 'react'
import styles from "../Header.module.scss"
import { HeaderTitle } from '../HeaderComponents/HeaderTitle/HeaderTitle'
import { Menu } from "@styled-icons/ionicons-solid/Menu"
import MobileHeaderMenu from '../HeaderComponents/MobileHeaderMenu/MobileHeaderMenu'

interface IProps {
  isBurger: boolean
}

export const MobileNav = ({ isBurger }: IProps) => {
  const [menu, setMenu] = useState(false)

  const toggleMenu = () => {
    menu ? setMenu(false) : setMenu(true)
  }
  return (
    <>
      <HeaderTitle />
      <Menu height={32} className={styles.menuBtn} onClick={toggleMenu} />
      {menu && (
        <MobileHeaderMenu isBurger={isBurger}/>
      )}
    </>
  )
}
