import type { NextPage } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { Loading } from "src/components/Loading/Loading"
const Home = dynamic(() => import("src/components/screens/Home/Home"), { suspense: true })

const Index: NextPage = () => {
  return(
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  )
}

export default Index
