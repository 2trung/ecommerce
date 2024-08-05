import { IoMailOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { SlLock } from 'react-icons/sl'
import { useState } from 'react'
import { useForm, FieldValues, set } from 'react-hook-form'
import useAuthSlice from '../../store/createAuthSlice'
import useLoadingSlice from '../../store/createLoadingSlice'
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
  const { register: registerAPI } = useAuthSlice()
  const { setLoading } = useLoadingSlice()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false)
  const [apiError, setApiError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const onSubmit = async (data: FieldValues) => {
    try {
      setLoading(true)
      setApiError('')
      const res = await registerAPI(data.email, data.password)
      setSuccessMessage(res.message)
      setTimeout(() => {
        navigate('/auth/login')
      }, 3000)
    } catch (error) {
      setApiError((error as any)?.response?.data?.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center my-20'>
      <div className='md:w-[52vw] w-full py-[4vw] px-[3vw] rounded-lg box-shadow shadow-none'>
        <h2 className='text-xl font-bold text-black'>Register</h2>
        <p className='text-xs text-[#989898]'>
          Are you already a Le Club Lacoste member in store? Please use the same
          email address (so we can recognize you.)
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-4 relative'
          autoComplete='off'
        >
          <div className='flex items-center relative py-2'>
            <IoMailOutline className='absolute' color='black' />
            <input
              {...register('email', { required: 'Email is required' })}
              type='email'
              placeholder=' '
              id='email'
              className='text-black w-full p-2 pl-6 outline-none border-b-[1px] border-[#989898] focus:border-black text-sm peer'
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
          <div className='flex items-center relative py-2'>
            <SlLock className='absolute' color='black' />
            <input
              {...register('password', { required: 'Password is required' })}
              type={isPasswordVisible ? 'text' : 'password'}
              id='password'
              placeholder=''
              className='text-black w-full p-2 pl-6 outline-none border-b-[1px] border-[#989898] focus:border-black text-sm peer'
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
          <div className='flex items-center relative py-2'>
            <SlLock className='absolute' color='black' />
            <input
              {...register('rePassword', {
                required: 'Repeat Password is required',
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues()
                    return password === value || 'Passwords should match!'
                  },
                },
              })}
              type={isRePasswordVisible ? 'text' : 'password'}
              id='input-field'
              placeholder=' '
              className='text-black w-full p-2 pl-6 outline-none border-b-[1px] border-[#989898] focus:border-black text-sm peer'
            />
            {isRePasswordVisible ? (
              <IoEyeOutline
                className='absolute right-0 mr-2 cursor-pointer'
                color='black'
                onClick={() => setIsRePasswordVisible(false)}
              />
            ) : (
              <IoEyeOffOutline
                className='absolute right-0 mr-2 cursor-pointer'
                color='black'
                onClick={() => setIsRePasswordVisible(true)}
              />
            )}
            <label
              htmlFor='input-field'
              className='absolute left-6 text-sm cursor-text text-[#989898] transition-all duration-300 peer-focus:text-xs peer-focus:-translate-y-full peer-focus:text-black [&:not(:empty)]:text-black [&:not(:empty)]:text-xs [&:not(:empty)]:-translate-y-full peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-[#989898]'
            >
              Repeat Password
            </label>
          </div>
          {errors.rePassword && (
            <p className='text-xs text-red-600'>{`${errors.rePassword.message}`}</p>
          )}
          {apiError && <p className='text-xs text-red-600'>{apiError}</p>}
          {successMessage && (
            <div>
              <p className='text-xs text-green-600'>{successMessage}</p>
              <p className='text-xs text-green-600'>
                Redirecting to login page in 3 seconds...
              </p>
            </div>
          )}
          <button
            id='submit'
            className='w-full border text-white bg-black rounded-lg p-2 mt-10 text-sm transition duration-300 ease-in-out hover:text-black hover:bg-white hover:border-black'
          >
            Register
          </button>
          <p className='text-xs absolute right-0 pt-2 text-black'>
            Have an account?{' '}
            <a href='/auth/login' className='text-blue-700'>
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
