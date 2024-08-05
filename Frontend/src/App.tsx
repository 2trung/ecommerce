import { UserProvider } from './providers/userProvider'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import useAuthSlice from './store/createAuthSlice'
import useUserSlice from './store/createUserSlice'
import { useEffect } from 'react'

function App() {
  const { accessToken } = useAuthSlice()
  const { getUser } = useUserSlice()
  const navigate = useNavigate()
  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate('/auth/login')
  //   }
  // }, [accessToken])
  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
