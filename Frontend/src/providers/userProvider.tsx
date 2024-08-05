import { createContext, useState, useEffect } from 'react'
import useUserSlice from '../store/createUserSlice'
import useAuthSlice from '../store/createAuthSlice'
import cookie from 'js-cookie'

export const UserContext = createContext(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { getUser, user } = useUserSlice()
  const { accessToken } = useAuthSlice()

  useEffect(() => {
    console.log('accessToken change', accessToken)
  }, [accessToken])

  useEffect(() => {
    if (!user) {
      console.log('user', user)
      getUser()
    }
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
