import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { SignInCardForm } from '../components/pages/Home/SignInCardForm'
import { HeadComponent } from '../components/commons/structure/HeadComponent'

const HomePage: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <HeadComponent title="Home Page" />

      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-900">
        <SignInCardForm router={router} />
      </main>
    </>
  )
}

export default HomePage
