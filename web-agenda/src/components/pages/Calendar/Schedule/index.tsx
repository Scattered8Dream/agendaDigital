import React, { useEffect, useRef } from 'react'
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
import { IReqCreateEvent } from '../../../../services/api/Event/types'

interface ScheduleProps {
  api: API
  userData: IUser
  eventsByUser: ProcessedEvent[]
}

export const Schedule: React.FC<ScheduleProps> = ({
  api,
  userData,
  eventsByUser
}) => {
  const calendarRef = useRef<SchedulerRef>(null)

  useEffect(() => {
    if (eventsByUser) {
      calendarRef.current.scheduler.handleState(eventsByUser, 'events')
    }
  }, [])

  console.log(calendarRef.current)

  const handleConfirm = async (event: ProcessedEvent, action: EventActions) => {
    if (action === 'create') {
      await createEvent({
        end: event.end,
        event_id: uuidv4(),
        start: event.start,
        title: event.title,
        token: userData?.token
      })

      return event
    } else if (action === 'edit') {
      return event
    }
  }

  const createEvent = async (requestData: IReqCreateEvent) => {
    try {
      await api.events.createEvent(requestData)
    } catch (createEventError) {
      console.log({ createEventError })

      toast.error('Ops! Ocorreu um erro ao criar o evento')
    }
  }

  return (
    <div className="w-full max-w-7xl w-full items-center justify-center p-12 lg:p-20 ">
      <h1 className="text-3xl font-bold mb-4">Agenda Pessoal</h1>

      <Scheduler
        ref={calendarRef}
        hourFormat="24"
        locale={ptBR}
        events={eventsByUser}
        editable={false}
        draggable={false}
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
