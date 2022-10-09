import React from "react"
import { useGetRandomGamesQuery } from "src/Http/rawg.api"
import styles from "./Home.module.scss"
import { useEffect, useState } from "react"
import { IGame } from "src/types/IGame"
import { MainSlider } from "./MainSlider/MainSlider"
import { carouselArray } from "src/utils/carouselArray"
import { BestGames } from "./BestGames/BestGames"
import Animation from "src/components/Animation/Animation"

const duration = 12

const Home = () => {
  const { data, isLoading } = useGetRandomGamesQuery({})
  const [games, setGames] = useState<IGame[] | null>(null)

  useEffect(() => {
    if (data && !isLoading) {
      setGames(data.results)
    }
  }, [data, isLoading])

  useEffect(() => {
    if (games) {
      let interval: NodeJS.Timer
      interval = setInterval(() => {
        setGames((games) => carouselArray(games))
      }, duration * 1000)
      return () => clearInterval(interval)
    }
  }, [games])

  return (
    <Animation direction="left">
      <div className={styles.container}>
        {games &&
          <>
            <main className={styles.main}>
              <MainSlider data={games} duration={duration} />
            </main>
            <footer className={styles.footer}>
              <BestGames />
            </footer>
          </>}
      </div>
    </Animation>
  )
}

export default Home
