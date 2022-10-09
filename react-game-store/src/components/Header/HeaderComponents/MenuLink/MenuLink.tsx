import React, { FC, PropsWithChildren } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from "./MenuLink.module.scss"

interface MenuLinkType {
  href: string
}

export const MenuLink: FC<PropsWithChildren<MenuLinkType>> = ({children, href = "/"}) => {
  const currentRoute = useRouter().pathname
  const linkClassName =
    currentRoute === href
      ? `${styles.link} ${styles.link_active}`
      : styles.link
  const wrapperClassName =
    currentRoute === href
      ? `${styles.wrapper} ${styles.wrapper_active}`
      : styles.wrapper

  return (
    <div className={wrapperClassName}>
      <Link href={href}>
        <a className={linkClassName}>{children}</a>
      </Link>
    </div>
  )
}
