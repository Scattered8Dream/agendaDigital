import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Input } from '../../../commons/toolkit/Input'
import { Button } from '../../../commons/toolkit/Button'

interface IFormData {
  email: string
  password: string
}

export const CardForm: React.FC = () => {
  const { register, handleSubmit } = useForm<IFormData>()

  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (data: IFormData) => {
    try {
      setIsLoading(true)

      console.log({ data })
    } catch (handleSingInError) {
      console.log({ handleSingInError })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col max-w-2xl w-full items-center justify-center p-12 lg:p-20 bg-neutral-50">
      <h1 className="text-3xl font-bold mb-4">Web Agenda</h1>

      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full flex flex-col"
      >
        <Input
          label="E-mail"
          type="email"
          id="email"
          name="email"
          {...register('email', { required: true })}
        />
        <Input
          label="Senha"
          type="password"
          id="password"
          name="password"
          {...register('password', { required: true })}
        />

        <Button type="submit" isLoading={isLoading} label="Entrar" />
      </form>
    </div>
  )
}
