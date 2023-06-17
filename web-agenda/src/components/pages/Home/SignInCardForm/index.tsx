import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { NextRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { Input } from '../../../commons/toolkit/Input'
import { Button } from '../../../commons/toolkit/Button'

import { API } from '../../../../services/api'

import { IUser } from '../../../../services/api/Users/types'

interface IFormData {
  email: string
  password: string
}

interface SignInCardFormProps {
  router: NextRouter
  api: API
  setUserData(userData: IUser): void
}

export const SignInCardForm: React.FC<SignInCardFormProps> = ({
  router,
  api,
  setUserData
}) => {
  const { register, handleSubmit } = useForm<IFormData>()

  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (data: IFormData) => {
    try {
      setIsLoading(true)

      const responseData = await api.users.session(data)

      setUserData(responseData)

      router.push('/calendar')
    } catch (handleSingInError) {
      console.log({ handleSingInError })

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
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full flex flex-col mb-8"
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

      <p className="text-base">
        Não possui conta?{' '}
        <Link
          href="/signUp"
          className="text-blue-600 font-medium hover:brightness-110 transition-all"
        >
          Registre-se já
        </Link>
      </p>
    </div>
  )
}
