import { create } from 'zustand'
import cookie from 'js-cookie'
import axiosInstance from '../utils/axiosInstance'

interface AuthState {
  accessToken: string
  refreshToken: string
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<{ message: string }>
  removeAuth: () => void
}

const createAuth = create<AuthState>((set) => ({
  accessToken: cookie.get('accessToken') || '',
  refreshToken: cookie.get('refreshToken') || '',
  login: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      })
      set(() => ({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      }))
      cookie.set('accessToken', response.data.access_token)
      cookie.set('refreshToken', response.data.refresh_token)
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  register: async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/register', {
        email,
        password,
      })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  removeAuth: () => {
    set(() => ({ accessToken: '', refreshToken: '' }))
  },
}))

export default createAuth
