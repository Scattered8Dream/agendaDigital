import { useEffect } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import { HeadComponent } from '../../components/commons/structure/HeadComponent'
import { Schedule } from '../../components/pages/Calendar/Schedule'
import { useAuth } from '../../hooks/auth'

const CalendarPage: NextPage = () => {
  const router = useRouter()

  const { userData } = useAuth()

  useEffect(() => {
    if (!userData) {
      toast.error(
        'Acesso negado! Necessário autenticar pra acessar essa página'
      )

      router.push('/')
    }
  }, [userData])

  return (
    <>
      <HeadComponent title="Calendar Page" />

      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-200">
        <Schedule />
      </main>
    </>
  )
}

export default CalendarPage
