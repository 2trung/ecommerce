import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const VnPayReturn = () => {
  const location = useLocation()
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const params = {}
    for (const [key, value] of queryParams.entries()) {
      params[key] = value
    }

    console.log(params)
  }, [])
  return (
    <div>
      <p>vnpayreturn</p>
    </div>
  )
}

export default VnPayReturn
