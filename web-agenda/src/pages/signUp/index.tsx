import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { HeadComponent } from '../../components/commons/structure/HeadComponent'
import { SignUpCardForm } from '../../components/pages/SignUp/SignUpCardForm'

const SignUpPage: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <HeadComponent title="Sign Up" />

      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-900">
        <SignUpCardForm router={router} />
      </main>
    </>
  )
}

export default SignUpPage
