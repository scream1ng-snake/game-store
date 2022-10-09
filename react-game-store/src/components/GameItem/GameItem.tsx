import Image from "next/image"
import Link from "next/link"
import React, { FC } from "react"
import { IGame } from "src/types/IGame"
import styles from "./GameItem.module.scss"

export const GameItem: FC<{ game: IGame }> = ({ game }) => {
  return (
    <Link href={`/game/${game.id}`}>
      <div className={styles.wrapper}>
        <h3>{game.name}</h3>
        <div className={styles.image}>
          {game.background_image ? (
            <Image
              src={game.background_image}
              layout="fill"
              alt={game.name}
              objectFit="cover"
              quality={10}
            />
          ) : (
            "no image"
          )}
        </div>
      </div>
    </Link>
  )
}
