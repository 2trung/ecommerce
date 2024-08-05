import { useEffect, useState } from 'react'
import useCart from '../../store/createCartSlide'
import { IoBagHandleOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { IoTrashOutline } from 'react-icons/io5'
import { IoIosInformationCircle } from 'react-icons/io'

const Cart = () => {
  const { cart, getCart } = useCart()
  const navigate = useNavigate()

  // useEffect(() => {
  //   const total = cart?.reduce((sum, item) => {
  //     const price = parseFloat(item.variantSize.price)
  //     return sum + price * item.quantity
  //   }, 0)
  //   console.log(total)
  // }, [cart])

  return (
    <div>
      {cart?.length === 0 ? (
        <div className='text-black bg-[#F0F0F0] p-[4vw]'>
          <div className='flex flex-col justify-center items-center py-[4vw] gap-2'>
            <IoBagHandleOutline className='w-20 h-20' />
            <h1 className='uppercase font-medium text-xl'>
              Your cart is empty.
            </h1>
            <p>
              You should have a look at our brand new collection, you’ll
              certainly find something you need.
            </p>
            <button
              onClick={() => navigate('/')}
              className='border text-white bg-black p-4 mt-2 transition duration-300 ease-in-out hover:text-black hover:bg-white hover:border-black'
            >
              Start shopping
            </button>
          </div>
        </div>
      ) : (
        <div className='flex text-black bg-[#F0F0F0] lg:flex-row flex-col'>
          {/* Products */}
          <div className='lg:pl-[110px] lg:p-[65px] p-4 lg:w-[75vw] w-full'>
            <h1 className='pb-[35px] uppercase text-lg font-medium'>
              Your cart
            </h1>
            <div className='xl:p-[60px] md:p-[40px] p-2 pt-8 rounded-xl bg-white flex flex-col gap-8'>
              {cart?.map((item) => (
                <div className='flex'>
                  <img
                    src={item?.variantSize.variantColor.galleries[0].image_url}
                    alt=''
                    className='md:max-h-56 md:max-w-40 max-h-36 max-w-28 rounded-xl object-cover min-[300px]:block hidden'
                  />
                  <div className='xl:px-8 px-4 flex justify-between flex-col w-full'>
                    <div>
                      <div className='flex justify-between items-center'>
                        <h2 className=''>
                          {item?.variantSize.variantColor.product.name}
                        </h2>
                        <IoTrashOutline className='cursor-pointer w-4 h-4' />
                      </div>
                      <div className='flex items-center gap-2 text-[#66706B]'>
                        <div
                          className='w-3 h-3 rounded-full border'
                          style={{
                            backgroundColor:
                              item?.variantSize.variantColor.color.hex,
                          }}
                        />
                        <p>•</p>
                        <p>{item.variantSize.variantColor.color.name}</p>
                      </div>

                      <p className='text-[#66706B]'>
                        Size: {item?.variantSize.size.name}
                      </p>
                      <select className='bg-[#EEEEEE] p-1 rounded-md'>
                        <option value='1' selected>
                          1
                        </option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                      </select>
                    </div>
                    <p className='text-[#008A20] font-medium'>
                      ${item?.variantSize.price}
                    </p>
                  </div>
                </div>
              ))}
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
              onClick={() => navigate('/checkout/address')}
              className='w-full border text-white bg-black rounded-lg p-2 mt-10 text-sm transition duration-300 ease-in-out hover:text-black hover:bg-white hover:border-black'
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
