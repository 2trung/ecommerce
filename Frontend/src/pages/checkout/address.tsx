import { useEffect, useState } from 'react'
import useCart from '../../store/createCartSlide'
import useLoading from '../../store/createLoadingSlice'
import useCheckout from '../../store/createCheckoutSlice'
import { useNavigate } from 'react-router-dom'
import { IoIosInformationCircle } from 'react-icons/io'
import { useForm } from 'react-hook-form'

enum Tab {
  addAddress = 'addAddress',
  chooseAddress = 'chooseAddress',
}
const Address = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { cart, getCart } = useCart()
  const { address, existingAddress, createAddress, getAddresses, createOrder } =
    useCheckout()
  const { setLoading } = useLoading()

  const [tab, setTab] = useState<Tab>(Tab.addAddress)
  const [choosingAddress, setChoosingAddress] = useState<number | null>(null)
  const navigate = useNavigate()
  const onSubmit = async (data: any) => {
    setLoading(true)
    createAddress(data)
    if (address && address.id !== undefined) createPaymentUrl(address.id)
    else alert('Failed to create address')
    setLoading(false)
  }
  const createPaymentUrl = async (addressId: number) => {
    setLoading(true)
    const paymentUrl = await createOrder(addressId, cart)
    if (paymentUrl) {
      setLoading(false)
      window.location.href = paymentUrl
    }
    setLoading(false)
  }
  const handleNext = () => {
    if (tab === Tab.addAddress)
      document
        ?.getElementById('addAddress')
        ?.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        )
    else {
      if (choosingAddress === null) {
        alert('Please choose an address')
        return
      }
      createPaymentUrl(choosingAddress)
    }
  }
  useEffect(() => {
    getAddresses()
  }, [])
  return (
    <div className='flex text-black bg-[#F0F0F0] lg:flex-row flex-col'>
      <div className='lg:pl-[110px] lg:p-[65px] p-4 lg:w-[75vw] w-full'>
        <h1 className='pb-[35px] uppercase text-lg font-medium'>
          Shipping address
        </h1>
        <div className='inline-block'>
          <button
            onClick={() => setTab(Tab.addAddress)}
            className='p-2 rounded-tl-xl'
            style={{
              backgroundColor: tab === Tab.addAddress ? 'white' : 'black',
              color: tab === Tab.addAddress ? 'black' : 'white',
            }}
          >
            Add address
          </button>
          <button
            style={{
              backgroundColor: tab === Tab.chooseAddress ? 'white' : 'black',
              color: tab === Tab.chooseAddress ? 'black' : 'white',
            }}
            onClick={() => setTab(Tab.chooseAddress)}
            className='p-2 border-l border-gray-300 rounded-tr-xl'
          >
            Use existing address
          </button>
        </div>
        <div className='xl:p-[60px] md:p-[40px] p-2 pt-8 rounded-xl rounded-ss-none bg-white flex flex-col gap-8'>
          {tab === Tab.addAddress && (
            <form
              className='flex flex-col gap-4'
              id='addAddress'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='flex flex-col gap-4'>
                <label htmlFor='name'>Full name</label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type='text'
                  id='name'
                  placeholder='John Doe'
                  className='p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='flex flex-col gap-4'>
                <label htmlFor='address'>Address</label>
                <input
                  {...register('address', { required: 'Address is required' })}
                  type='text'
                  id='address'
                  placeholder='123 Main St'
                  className='p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='flex flex-col gap-4'>
                <label htmlFor='city'>City</label>
                <input
                  {...register('city', { required: 'City is required' })}
                  type='text'
                  id='city'
                  placeholder='New York'
                  className='p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='flex flex-col gap-4'>
                <label htmlFor='state'>State</label>
                <input
                  {...register('state', { required: 'State is required' })}
                  type='text'
                  id='state'
                  placeholder='NY'
                  className='p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='flex flex-col gap-4'>
                <label htmlFor='zip'>ZIP</label>
                <input
                  {...register('zip', { required: 'ZIP is required' })}
                  type='text'
                  id='zip'
                  placeholder='10001'
                  className='p-2 border border-gray-300 rounded-lg'
                />
              </div>
              <div className='flex flex-col gap-4'>
                <label htmlFor='phone'>Phone number</label>
                <input
                  {...register('phone', { required: 'Phone is required' })}
                  type='text'
                  id='phone'
                  placeholder='1234567890'
                  className='p-2 border border-gray-300 rounded-lg'
                />
              </div>
            </form>
          )}
          {tab === Tab.chooseAddress && (
            <select
              name='Address'
              id=''
              className='bg-white border rounded-md p-2'
              onChange={(e) => {
                setChoosingAddress(parseInt(e.target.value))
              }}
            >
              {existingAddress?.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.address + ', ' + address.city + ', ' + address.zip}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className='px-7 py-14 bg-white lg:w-[25vw] lg:rounded-none rounded-xl lg:m-0 m-4 overflow-x-scroll no-scrollbar'>
        <h1 className='uppercase font-medium text-lg'>Order summary</h1>
        <div className='border-t border-gray-300 my-4' />

        <div className='flex justify-between'>
          <p>{cart?.length} items</p>
          <p>
            $
            {cart
              ?.reduce((sum, item) => {
                const price = parseFloat(item.variantSize.price)
                return sum + price * item.quantity
              }, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className='flex justify-between'>
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className='flex justify-between'>
          <p>Discount</p>
          <p>$0</p>
        </div>
        <p className='text-xs'>
          Taxes will be calculated at checkout based on your location
        </p>
        <div className='border-t border-gray-300 my-4' />

        <div className='flex justify-between'>
          <p className='flex gap-1 items-center'>
            Estimated total <IoIosInformationCircle />
          </p>
          <p>
            $
            {cart
              ?.reduce((sum, item) => {
                const price = parseFloat(item.variantSize.price)
                return sum + price * item.quantity
              }, 0)
              .toFixed(2)}
          </p>
        </div>
        <button
          onClick={() => handleNext()}
          className='w-full border text-white bg-black rounded-lg p-2 mt-10 text-sm transition duration-300 ease-in-out hover:text-black hover:bg-white hover:border-black'
        >
          Continue to payment
        </button>
      </div>
    </div>
  )
}

export default Address
