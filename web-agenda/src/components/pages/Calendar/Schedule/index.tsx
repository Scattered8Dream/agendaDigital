import React from 'react'
import { Scheduler } from '@aldabil/react-scheduler'
import ptBR from 'date-fns/locale/pt-BR'

export const Schedule: React.FC = () => {
  return (
    <div className="w-full max-w-7xl w-full items-center justify-center p-12 lg:p-20 ">
      <h1 className="text-3xl font-bold mb-4">Agenda Pessoal</h1>

      <Scheduler
        hourFormat="24"
        locale={ptBR}
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
