'use client'
import { IoMailOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { SlLock } from 'react-icons/sl'
import { useState } from 'react'
import { useForm, FieldValues } from 'react-hook-form'
import useAuth from '../../store/createAuthSlice'
import useLoading from '../../store/createLoadingSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm()
  const navigate = useNavigate()
  const login = useAuth((state) => state.login)
  const setLoading = useLoading((state) => state.setLoading)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [apiError, setApiError] = useState('')
  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true)
      setApiError('')
      await login(data.email, data.password)
      navigate('/')
    } catch (error) {
      setApiError((error as any)?.response?.data?.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center my-20'>
      <div className='md:w-[52vw] w-full py-[4vw] px-[3vw] rounded-lg box-shadow shadow-none'>
        <h2 className='text-xl font-bold text-black'>Login</h2>
        <p className='text-xs text-[#989898]'>
          Are you already a Le Club Lacoste member in store? Please use the same
          email address (so we can recognize you.)
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-4 relative'
          autoComplete='off'
        >
          <div className='flex items-center'>
            <IoMailOutline className='absolute' color='black' />
            <input
              {...register('email', { required: 'Email is required' })}
              type='email'
              placeholder=' '
              className='text-black w-full p-2 pl-6 outline-none border-b-[1px] border-[#989898] focus:border-black text-sm peer'
              id='email'
            />
            <label
              htmlFor='email'
              className='absolute left-6 text-sm cursor-text text-[#989898] transition-all duration-300 peer-focus:text-xs peer-focus:-translate-y-full peer-focus:text-black [&:not(:empty)]:text-black [&:not(:empty)]:text-xs [&:not(:empty)]:-translate-y-full peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#989898]'
            >
              Email
            </label>
          </div>
          {errors.email && (
            <p className='text-xs text-red-600'>{`${errors.email.message}`}</p>
          )}
          <p className='text-xs text-red-600 p-2'></p>
          <div className='flex items-center relative'>
            <SlLock className='absolute' color='black' />
            <input
              {...register('password', { required: 'Password is required' })}
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder=' '
              className='text-black w-full p-2 pl-6 outline-none border-b-[1px] border-[#989898] focus:border-black text-sm peer'
              id='password'
            />
            {isPasswordVisible ? (
              <IoEyeOutline
                className='absolute right-0 mr-2 cursor-pointer'
                color='black'
                onClick={() => setIsPasswordVisible(false)}
              />
            ) : (
              <IoEyeOffOutline
                className='absolute right-0 mr-2 cursor-pointer'
                color='black'
                onClick={() => setIsPasswordVisible(true)}
              />
            )}
            <label
              htmlFor='password'
              className='absolute left-6 text-sm cursor-text text-[#989898] transition-all duration-300 peer-focus:text-xs peer-focus:-translate-y-full peer-focus:text-black [&:not(:empty)]:text-black [&:not(:empty)]:text-xs [&:not(:empty)]:-translate-y-full peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#989898]'
            >
              Password
            </label>
          </div>
          {errors.password && (
            <p className='text-xs text-red-600'>{`${errors.password.message}`}</p>
          )}
          <p className='text-xs absolute right-0 cursor-pointer pt-2 text-black'>
            Forgot password?
          </p>
          <p className='text-xs text-red-600 pt-2'>{apiError}</p>

          <button
            disabled={isSubmitting}
            className='w-full border text-white bg-black rounded-lg p-2 mt-10 text-sm transition duration-300 ease-in-out hover:text-black hover:bg-white hover:border-black'
          >
            Login
          </button>
        </form>
        <a href={'/auth/register'}>
          <button className='w-full border text-white bg-black rounded-lg p-2 mt-2 text-sm transition duration-300 ease-in-out hover:text-black hover:bg-white hover:border-black'>
            Register
          </button>
        </a>
      </div>
    </div>
  )
}

export default Login
