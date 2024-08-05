import { create } from 'zustand'
import cookie from 'js-cookie'
import axiosInstance from '../utils/axiosInstance'
import useAuthSlice from './createAuthSlice'

type UserStore = {
  user: any
  getUser: () => void
  logout: () => void
}

const createUser = create<UserStore>((set) => ({
  user: null,
  getUser: async () => {
    try {
      const response = await axiosInstance.get('/user')
      console.log('response', response.data)
      set(() => ({ user: response.data }))
    } catch (error) {
      const { removeAuth } = useAuthSlice()
      removeAuth()
      console.error(error)
    }
  },
  logout: () => set(() => ({ user: null })),
}))

export default createUser
