import React from "react"
import { IGame } from "src/types/IGame"
import styles from "./GameCard.module.scss"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"

export const GameCard = ({ data }: { data: IGame }) => {
  return (
    <Link href={data ? `game/${data.id}` : ""}>
      <motion.div whileHover={{ scale: 1.02 }} className={styles.wrapper}>
        <div className={styles.image}>
          <Image
            src={data.background_image}
            layout="fill"
            alt={data.name}
            objectFit="cover"
            quality={10}
          />
          <div className={styles.blackblur}></div>
        </div>
        <div className={styles.menu}>
          <div className={styles.lower_menu}>{data.name}</div>
        </div>
      </motion.div>
    </Link>
  )
}
