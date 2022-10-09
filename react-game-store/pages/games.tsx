import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loading } from "src/components/Loading/Loading"
const Games = dynamic(() => import("src/components/screens/Games/Games"), { suspense: true })

const games: NextPage = () => {
  return(
    <Suspense fallback={<Loading />}>
      <Games />
    </Suspense>
  )
}
export default games
