import React, { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import styles from "./MainSlider.module.scss"
import { IGame } from "src/types/IGame"
import Image from "next/image"
import Link from "next/link"

interface IProps {
  data: IGame[]
  duration: number
}

export const MainSlider = ({data, duration}: IProps) => {
  const [games, setGames] = useState<IGame[]>(data)

  useEffect(() => {
    setGames(data)
  }, [data])

  return (
    <div className={styles.slider}>
      {games.map((item, index: number) => (
        <motion.div
          key={`${item.name}`}
          layoutId={`${item.name}`}
          whileInView={{ opacity: 1 }}
          className={index == 0 ? `${styles.bigItem}` : `${styles.item}`}
          animate={{ borderRadius: "15px" }}
          transition={{
            layout: { type: "spring", stiffness: 30 },
          }}
        >
          {item.background_image ? (
            <Image
              src={item.background_image}
              layout="fill"
              objectFit="cover"
              alt={item.name}
              quality={60}
              priority
            />
          ) : null}
          <Link href={`/game/${item.id}`}>
            <div className={styles.overlay}>
              <AnimatePresence>
                <motion.h1
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  className={
                    index == 0 ? `${styles.bigTitle}` : `${styles.title}`
                  }
                >
                  {item.name}
                </motion.h1>
                {index == 0 && (
                  <motion.div
                    key={`progress-${item.id}`}
                    className={styles.progressBar}
                    initial={{ width: 0 }}
                    animate={{
                      width: "100%",
                      transition: { duration: duration },
                    }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
