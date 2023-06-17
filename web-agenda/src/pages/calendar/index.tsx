import { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { toast } from 'react-toastify'
import { ProcessedEvent, SchedulerRef } from '@aldabil/react-scheduler/types'

import { HeadComponent } from '../../components/commons/structure/HeadComponent'
import { Schedule } from '../../components/pages/Calendar/Schedule'
import { useAuth } from '../../hooks/auth'

import { useAPI } from '../../services/api'

const CalendarPage: NextPage = () => {
  const { userData, signOut } = useAuth()

  const { api } = useAPI()

  const [eventsByUser, setEventsByUser] = useState<ProcessedEvent[]>([])

  useEffect(() => {
    if (userData) {
      api.events
        .getEventsByUser(userData.token)
        .then(data =>
          setEventsByUser(
            data.map(event => ({
              ...event.events,
              start: new Date(event.events.start),
              end: new Date(event.events.end)
            }))
          )
        )
        .catch(getEventsByUserError => {
          console.log({ getEventsByUserError })
        })
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
        <Schedule api={api} userData={userData} eventsByUser={eventsByUser} />
      </main>
    </>
  )
}

export default CalendarPage
