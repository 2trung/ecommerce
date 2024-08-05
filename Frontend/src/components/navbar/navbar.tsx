import {
  CiSearch,
  CiUser,
  CiHeart,
  CiShoppingBasket,
  CiGift,
} from 'react-icons/ci'
import Carousel from './carousel'
import AuthModal from './authModal'
import { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { PiCakeLight, PiPackageLight } from 'react-icons/pi'
import { useNavigate } from 'react-router-dom'
import useCartSlide from '../../store/createCartSlide'

const Navbar = () => {
  const navigate = useNavigate()
  const [isModalVisible, setModalVisible] = useState(false)
  const { cart, getCart } = useCartSlide()
  useEffect(() => {
    getCart()
  }, [])
  useEffect(() => {
    console.log(cart)
  }, [cart])
  return (
    <>
      <Carousel />
      <div className='flex p-4 justify-around bg-white'>
        <div
          className='flex gap-2 cursor-pointer'
          onClick={() => navigate('/')}
        >
          <img
            src='https://lacoste.com.vn/wp-content/uploads/2023/03/logo1.svg'
            alt='logo'
            height={16}
            width={100}
            className='md:flex hidden'
          />
          <img
            src='https://lacoste.com.vn/wp-content/uploads/2023/05/Lacoste-logo-1.svg'
            alt='logo'
            height={44}
            width={39}
          />
        </div>
        <div className='lg:w-[75%] lg:flex hidden bg-[#f4f4f4] rounded-3xl justify-center items-center'>
          <CiSearch className='text-gray-400 mx-3 h-[24px] w-[24px]' />
          <input
            placeholder='Search product'
            className='flex w-full border-none outline-none bg-[#f4f4f4] text-sm mr-4 h-11 text-black'
          />
        </div>
        <div className='flex items-center gap-4 text-black relative'>
          <CiUser
            className='h-[24px] w-[24px] cursor-pointer'
            onClick={() => setModalVisible(true)}
          />
          <CiHeart className='h-[24px] w-[24px] cursor-pointer' />
          <CiShoppingBasket
            onClick={() => navigate('/cart')}
            className='h-[24px] w-[24px] cursor-pointer'
          />
          {
            <span className='absolute lg:top-2 top-0 -right-1 px-1 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full cursor-pointer'>
              {cart?.length || 0}
            </span>
          }
        </div>
      </div>
      <AuthModal isVisible={isModalVisible}>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-medium p-10 px-1 md:px-10'>
            CREATE YOUR ACCOUNT OR SIGN IN
          </h1>
          <IoClose
            className='h-10 w-10 text-[#757575] cursor-pointer hover:text-black'
            onClick={() => setModalVisible(false)}
          />
        </div>
        <div className='px-10'>
          <div className='px-2'>
            <p className='font-medium pb-2'>
              Are you already a Le Club Lacoste member in store?
            </p>
            <p>
              Sign in for a personalized experience and access to all your
              benefits and offers.
            </p>
            <button
              onClick={() => {
                setModalVisible(false)
                navigate('/auth/login')
              }}
              className='border rounded-2xl px-4 py-3 text-white bg-black mt-5 text-sm transition duration-300 ease-in-out hover:text-black hover:bg-white hover:border-black'
            >
              Login
            </button>
          </div>
          <div className='py-8 px-4 mt-8 bg-[#fafafa]'>
            <div className='flex mb-6'>
              <CiGift className='h-5 w-5 mr-2 mt-1' />
              <div>
                <h2 className='font-medium pb-1'>
                  Welcome gift by membership level
                </h2>
                <p className='text-[#767676]'>
                  When joining the Loyalty Program
                </p>
              </div>
            </div>
            <div className='flex mb-6'>
              <CiShoppingBasket className='h-5 w-5 mr-2 mt-1' />
              <div>
                <h2 className='font-medium pb-1'>Special offer</h2>
                <p className='text-[#767676]'>
                  Exclusive offers when shopping at the online store
                </p>
              </div>
            </div>
            <div className='flex mb-6'>
              <PiCakeLight className='h-5 w-5 mr-2 mt-1' />
              <div>
                <h2 className='font-medium pb-1'>Birthday Offer</h2>
                <p className='text-[#767676]'>For special occasions</p>
              </div>
            </div>
            <button
              onClick={() => {
                setModalVisible(false)
                navigate('/auth/register')
              }}
              className='border text-center border-black rounded-2xl px-4 py-3 text-black bg-white mt-5 text-sm transition duration-300 ease-in-out hover:text-white hover:bg-black hover:border-white'
            >
              Register
            </button>
          </div>
          <div className='border-t border-gray-300 mb-8' />

          <span className='flex items-center gap-2 cursor-pointer'>
            <PiPackageLight></PiPackageLight>Looking for a guest checkout order?
          </span>
        </div>
      </AuthModal>
    </>
  )
}

export default Navbar
