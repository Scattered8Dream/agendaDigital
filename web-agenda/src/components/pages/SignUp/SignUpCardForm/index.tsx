import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NextRouter } from 'next/router'
import { toast } from 'react-toastify'
import Link from 'next/link'

import { Input } from '../../../commons/toolkit/Input'
import { Button } from '../../../commons/toolkit/Button'

import { API } from '../../../../services/api'
import { IUser } from '../../../../services/api/Users/types'

interface IFormData {
  name: string
  email: string
  password: string
}

interface SignUpCardFormProps {
  router: NextRouter
  api: API
  setUserData(userData: IUser): void
}

export const SignUpCardForm: React.FC<SignUpCardFormProps> = ({
  router,
  setUserData,
  api
}) => {
  const { register, handleSubmit } = useForm<IFormData>()

  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = async (data: IFormData) => {
    try {
      setIsLoading(true)

      const responseData = await api.users.createUser(data)

      setUserData(responseData)

      router.push('/calendar')
    } catch (handleSignUpError) {
      console.log({ handleSignUpError })

      toast.error('Ops! Ocorrreu um erro, tente novamente em instantes')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col max-w-2xl w-full items-center justify-center p-12 lg:p-20 bg-neutral-50">
      <h1 className="text-3xl font-bold mb-4">Web Agenda</h1>

      <form
        method="post"
        onSubmit={handleSubmit(handleSignUp)}
        className="w-full flex flex-col mb-8"
      >
        <Input
          label="Nome"
          type="name"
          id="name"
          {...register('name', { required: true })}
        />
        <Input
          label="E-mail"
          type="email"
          id="email"
          {...register('email', { required: true })}
        />
        <Input
          label="Senha"
          type="password"
          id="password"
          {...register('password', { required: true })}
        />

        <Button type="submit" isLoading={isLoading} label="Criar conta" />
      </form>

      <p className="text-base">
        Já possui conta?{' '}
        <Link
          href="/"
          className="text-blue-600 font-medium hover:brightness-110 transition-all"
        >
          Acesse já
        </Link>
      </p>
    </div>
  )
}
