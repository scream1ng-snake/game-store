import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Carousel } from "./Carousel/Carousel"
import { useGetGameQuery } from "src/Http/rawg.api"
import { IGame } from "src/types/IGame"
import styles from "./Game.module.scss"
import { GameDetails } from "./GameDetails/GameDetails"
import { GameInfo } from "./GameInfo/GameInfo"
import Animation from "src/components/Animation/Animation"
import getPrice from "src/utils/getPrice"

const Game = () => {
  const {
    query: {id},
  } = useRouter()

  const {data} = useGetGameQuery({
    id: Number(id),
  })

  const [game, setGame] = useState<IGame | null>(null)

  useEffect(() => {
    if (data) {
      const price = getPrice(data)
      setGame({ ...data, price })
    }
  }, [data])

  return (
    game && (
      <Animation direction="left">
        <div className={styles.wrapper}>
          <Carousel id={game.id} />
          <GameDetails
            name={game.name}
            developers={game.developers}
            publishers={game.publishers}
            platforms={game.parent_platforms}
            release={game.released}
          />
          <GameInfo
            description={game.description_raw}
            image={game.background_image}
            price={game.price}
            game={game}
          />
        </div>
      </Animation>
    )
  )
}

export default Game