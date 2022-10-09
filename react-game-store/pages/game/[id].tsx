import { NextPage } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loading } from "src/components/Loading/Loading"
const Game = dynamic(() => import("src/components/screens/Game/Game"), { suspense: true })

const GamePage: NextPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Game />
    </Suspense>
  )
}

export default GamePage
