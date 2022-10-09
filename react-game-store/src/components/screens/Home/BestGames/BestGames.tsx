import React, { FC, useEffect, useState } from "react"
import { useGetBestGamesQuery } from "src/Http/rawg.api"
import { IGame } from "src/types/IGame"
import { GameItem } from "src/components/GameItem/GameItem"
import styles from "./BestGames.module.scss"

const pageSize = 6

export const BestGames: FC = () => {
  const [bestGames, setBestGames] = useState<IGame[] | null>(null)
  const { data, isLoading } = useGetBestGamesQuery({ pageSize: pageSize })

  useEffect(() => {
    data && !isLoading && setBestGames(data.results)
  }, [data, isLoading])

  return (
    <div className={styles.wrapper}>
      <h2>Best Games</h2>
      <div className={styles.games}>
        {bestGames &&
          bestGames.map((item: IGame) => (
            <GameItem key={item.id} game={item} />
          ))}
      </div>
    </div>
  )
}
