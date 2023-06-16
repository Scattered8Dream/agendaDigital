import { NextPage } from 'next'

import { CardForm } from '../components/pages/Home/CardForm'

const HomePage: NextPage = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen bg-slate-900">
      <CardForm />
    </main>
  )
}

export default HomePage
