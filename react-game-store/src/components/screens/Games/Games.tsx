/* eslint-disable react-hooks/exhaustive-deps */
import styles from "./Games.module.scss"
import { GameCard } from "./GameCard/GameCard"
import React, { useCallback, useEffect, useState } from "react"
import { useGetGameListQuery } from "src/Http/rawg.api"
import { IGame } from "src/types/IGame"
import { Genres } from "./Genres/Genres"
import Animation from "src/components/Animation/Animation"

const Games = React.memo(function Games() {
  const [games, setGames] = useState<IGame[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [activeGenre, setActiveGenre] = useState<string>("")
  const [fetching, setFetching] = useState<boolean>(false)

  const { data, isLoading } = useGetGameListQuery({
    page: currentPage,
    pageSize: 20,
    genre: activeGenre,
  })

  useEffect(() => {
    if (data && !isLoading) setGames([...games, ...data.results])
  }, [data, isLoading])

  useEffect(() => {
    document.addEventListener("scroll", onScroll, { passive: true })
    return () => document.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (fetching) {
      setCurrentPage(currentPage + 1)
      setFetching(false)
    }
  }, [fetching])

  const handleChangeGenre = (genre: string) => {
    setGames([])
    setCurrentPage(1)
    setActiveGenre(genre)
  }

  const onScroll = useCallback((event: any) => {
    const { innerHeight } = window
    const { scrollHeight, scrollTop } = event.target.documentElement
    if (scrollHeight - (scrollTop + innerHeight) < 120) setFetching(true)
  }, [])

  return (
    <Animation direction="left">
      <main className={styles.main}>
        <Genres
          handleChangeGenre={handleChangeGenre}
          activeGenre={activeGenre}
        />
        <div className={styles.grid} id="grid">
          {games &&
            games.map((item: IGame) => (
              <GameCard key={`${activeGenre}_${item.id}`} data={item} />
            ))}
        </div>
      </main>
    </Animation>
  )
})

export default Games
