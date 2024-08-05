interface ModalProps {
  isVisible: boolean
  children: React.ReactNode
}
const AuthModal: React.FC<ModalProps> = ({ isVisible, children }) => {
  if (!isVisible) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50 h-[100vh] text-black'>
      <div className='bg-white shadow-lg relative h-full md:w-[50vw] w-[100vw]'>
        {children}
      </div>
    </div>
  )
}

export default AuthModal
