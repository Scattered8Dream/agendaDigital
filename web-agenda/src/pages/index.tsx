import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { SignInCardForm } from '../components/pages/Home/SignInCardForm'
import { HeadComponent } from '../components/commons/structure/HeadComponent'

import { useAuth } from '../hooks/auth'

import { useAPI } from '../services/api'

const HomePage: NextPage = () => {
  const router = useRouter()

  const { setUserData } = useAuth()
  const { api } = useAPI()

  return (
    <>
      <HeadComponent title="Home Page" />

      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-900">
        <SignInCardForm router={router} api={api} setUserData={setUserData} />
      </main>
    </>
  )
}

export default HomePage
