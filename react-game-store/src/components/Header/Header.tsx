import React, { useCallback, useEffect, useState } from "react"
import styles from "./Header.module.scss"
import { DesktopNav } from "./DesktopNav/DesktopNav"
import { MobileNav } from "./MobileNav/MobileNav"

export const Header = () => {
  const [isBurger, setIsBurger] = useState(false)
  const [windowDimenion, detectHW] = useState<{
    winWidth: number
    winHeight: number
  }>({
    winWidth: 0,
    winHeight: 0,
  })

  useEffect(() => {
    detectHW({
      winHeight: window.innerHeight,
      winWidth: window.innerWidth,
    })
  }, [])

  useEffect(() => {
    window.addEventListener("resize", detectSize)
    return () => {
      window.removeEventListener("resize", detectSize)
    }
  }, [windowDimenion])

  useEffect(() => {
    window.innerWidth < 880 ? setIsBurger(true) : setIsBurger(false)
  }, [windowDimenion])

  const detectSize = useCallback(() => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }, [])
  
  

  return (
    <header className={styles.header}>
      {!isBurger ? (
        <DesktopNav isBurger={isBurger}/>
      ) : (
        <MobileNav isBurger={isBurger}/>
      )}
    </header>
  )
}
