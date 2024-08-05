import useGlobalLoading from '../../store/createLoadingSlice'
import { ThreeDot } from 'react-loading-indicators'
const Loading = () => {
  const loading = useGlobalLoading((state) => state.loading)
  if (!loading) return null
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
      <ThreeDot variant='bob' color='#fff' size='medium' text='' textColor='' />
    </div>
  )
}

export default Loading
