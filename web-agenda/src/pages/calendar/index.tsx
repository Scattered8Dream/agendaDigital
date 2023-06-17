import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { toast } from 'react-toastify'

import { HeadComponent } from '../../components/commons/structure/HeadComponent'
import { Schedule } from '../../components/pages/Calendar/Schedule'
import { useAuth } from '../../hooks/auth'

import { useAPI } from '../../services/api'
import { IEvent } from '../../services/api/Event/types'

const CalendarPage: NextPage = () => {
  const { userData, signOut } = useAuth()

  const { api } = useAPI()

  const [eventsByUser, setEventsByUser] = useState<IEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (userData) {
      api.events
        .getEventsByUser(userData.token)
        .then(data => setEventsByUser(data))
        .catch(getEventsByUserError => {
          console.log({ getEventsByUserError })
        })
        .finally(() => setIsLoading(false))
    } else {
      toast.error(
        'Acesso negado! Necessário autenticar pra acessar essa página'
      )

      signOut()
    }
  }, [userData])

  return (
    <>
      <HeadComponent title="Calendar Page" />

      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-200">
        <Schedule
          api={api}
          userData={userData}
          eventsByUser={eventsByUser}
          isLoading={isLoading}
        />
      </main>
    </>
  )
}

export default CalendarPage
