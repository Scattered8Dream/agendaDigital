import { NextPage } from 'next'

import { HeadComponent } from '../../components/commons/structure/HeadComponent'
import { Schedule } from '../../components/pages/Calendar/Schedule'

const CalendarPage: NextPage = () => {
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
