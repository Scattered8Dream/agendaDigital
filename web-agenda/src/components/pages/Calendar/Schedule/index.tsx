import React, { useCallback, useEffect, useRef } from 'react'
import { Scheduler } from '@aldabil/react-scheduler'
import ptBR from 'date-fns/locale/pt-BR'
import {
  EventActions,
  ProcessedEvent,
  SchedulerRef
} from '@aldabil/react-scheduler/types'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

import { API } from '../../../../services/api'

import { IUser } from '../../../../services/api/Users/types'
import {
  IEvent,
  IReqCreateEvent,
  IReqEditEvent
} from '../../../../services/api/Event/types'

interface ScheduleProps {
  api: API
  userData: IUser
  eventsByUser: IEvent[]
  isLoading: boolean
}

export const Schedule: React.FC<ScheduleProps> = ({
  api,
  userData,
  eventsByUser,
  isLoading
}) => {
  const calendarRef = useRef<SchedulerRef>(null)

  useEffect(() => {
    calendarRef.current.scheduler.handleState(isLoading, 'loading')
    calendarRef.current.scheduler.handleState(
      eventsByUser.map(event => ({
        ...event.events,
        start: new Date(event.events.start),
        end: new Date(event.events.end)
      })),
      'events'
    )
  }, [isLoading, eventsByUser])

  const handleConfirm = useCallback(
    async (event: ProcessedEvent, action: EventActions) => {
      if (action === 'create') {
        await createEvent({
          end: event.end,
          event_id: uuidv4(),
          start: event.start,
          title: event.title,
          token: userData.token
        })

        return event
      } else if (action === 'edit') {
        await editEvent({
          eventId: String(event.event_id),
          events: {
            end: event.end,
            start: event.start,
            title: event.title
          },
          token: userData.token
        })

        return event
      }
    },
    [userData]
  )

  const createEvent = async (requestData: IReqCreateEvent) => {
    try {
      await api.events.createEvent(requestData)
    } catch (createEventError) {
      console.log({ createEventError })

      toast.error('Ops! Ocorreu um erro ao criar o evento')
    }
  }

  const editEvent = async (requestData: IReqEditEvent) => {
    try {
      await api.events.editEvent(requestData)
    } catch (editEventError) {
      console.log({ editEventError })

      toast.error('Ops! Ocorreu um erro ao editar o evento')
    }
  }

  const deleteEvent = useCallback(
    async (eventId: string) => {
      try {
        await api.events.deleteEvent(eventId, userData.token)
      } catch (deleteEventError) {
        console.log({ deleteEventError })

        toast.error('Ops! Ocorreu um erro ao deletar o evento')
      }
    },
    [userData]
  )

  return (
    <div className="w-full max-w-7xl w-full items-center justify-center p-12 lg:p-20 ">
      <h1 className="text-3xl font-bold mb-4">Agenda Pessoal</h1>

      <Scheduler
        hourFormat="24"
        ref={calendarRef}
        locale={ptBR}
        events={eventsByUser.map(event => ({
          ...event.events,
          start: new Date(event.events.start),
          end: new Date(event.events.end)
        }))}
        onDelete={deleteEvent}
        loading={isLoading}
        deletable={false}
        draggable={false}
        editable={false}
        onConfirm={handleConfirm}
        translations={{
          navigation: {
            month: 'Mês',
            week: 'Semana',
            day: 'Dia',
            today: 'Hoje'
          },
          form: {
            addTitle: 'Adicionar Evento',
            editTitle: 'Editar Evento',
            confirm: 'Confirmar',
            delete: 'Deletar',
            cancel: 'Cancelar'
          },
          event: {
            title: 'Título',
            start: 'Início',
            end: 'Fim',
            allDay: 'Dia todo'
          },
          moreEvents: 'Mais...',
          loading: 'Carregando...'
        }}
        timeZone="America/Sao_Paulo"
      />
    </div>
  )
}
