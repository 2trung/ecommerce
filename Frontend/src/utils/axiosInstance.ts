import axios from 'axios'
import cookie from 'js-cookie'
import { API_ROOT } from './apiRoot'

const axiosInstance = axios.create({
  baseURL: API_ROOT,
})

axiosInstance.interceptors.request.use((config) => {
  const token = cookie.get('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
