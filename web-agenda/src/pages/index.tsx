import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { CardForm } from '../components/pages/Home/CardForm'
import { HeadComponent } from '../components/commons/structure/HeadComponent'

const HomePage: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <HeadComponent title="Home Page" />

      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-900">
        <CardForm router={router} />
      </main>
    </>
  )
}

export default HomePage
