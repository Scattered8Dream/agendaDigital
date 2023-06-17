import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { HeadComponent } from '../../components/commons/structure/HeadComponent'
import { SignUpCardForm } from '../../components/pages/SignUp/SignUpCardForm'

import { useAPI } from '../../services/api'
import { useAuth } from '../../hooks/auth'

const SignUpPage: NextPage = () => {
  const router = useRouter()

  const { setUserData } = useAuth()
  const { api } = useAPI()

  return (
    <>
      <HeadComponent title="Sign Up" />

      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-900">
        <SignUpCardForm router={router} api={api} setUserData={setUserData} />
      </main>
    </>
  )
}

export default SignUpPage
