import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
  useEffect,
  useCallback
} from 'react'
import { useRouter } from 'next/router'

import { IUser } from '../services/api/Users/types'

interface AuthContextData {
  userData: IUser
  setUserData(userData: IUser): void

  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC<PropsWithChildren<any>> = ({
  children
}) => {
  const router = useRouter()

  const [userData, setUserData] = useState<IUser>()

  useEffect(() => {
    const tempUser: IUser = JSON.parse(
      window.localStorage.getItem('@webAgenda/user') || 'null'
    )

    if (tempUser) {
      setUserData(tempUser)
    }
  }, [])

  const updateUserDataStorage = useCallback((newUserData: IUser) => {
    setUserData(newUserData)

    window.localStorage.setItem('@webAgenda/user', JSON.stringify(newUserData))
  }, [])

  const signOut = useCallback(() => {
    window.localStorage.removeItem('@webAgenda/user')

    setUserData(null)

    router.replace('/')
  }, [router])

  return (
    <AuthContext.Provider
      value={{ setUserData: updateUserDataStorage, signOut, userData }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
