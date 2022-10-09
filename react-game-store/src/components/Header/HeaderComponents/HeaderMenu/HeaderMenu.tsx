import React from "react"
import { MenuLink } from "../MenuLink/MenuLink"
import styles from "./HeaderMenu.module.scss"

export const HeaderMenu = () => {
  const { user } = { user: false } // useAppSelector(getUser);
  return (
    <nav className={styles.aside}>
      <MenuLink href={"/"}>Home</MenuLink>
      <MenuLink href={"/games"}>Games</MenuLink>
      <MenuLink href={"/About"}>About</MenuLink>
      {user ? (
        <>
          <MenuLink href={"/profile"}>Profile</MenuLink>
          <MenuLink href={"/logout"}>Logout</MenuLink>
        </>
      ) : (
        <>
          <MenuLink href={"/profile"}>SignIn</MenuLink>
          <MenuLink href={"/logout"}>SignUp</MenuLink>
        </>
      )}
    </nav>
  )
}
