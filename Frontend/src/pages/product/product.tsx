import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react'
import { VariantsColor, VariantSize } from '../../interface/product'
import useProduct from '../../store/createProductSlice'
import useCart from '../../store/createCartSlide'

const Product = () => {
  const { getProduct, product } = useProduct()
  const { addToCart } = useCart()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activeVariantColor, setActiveVariantColor] = useState<VariantsColor>()
  const [activeVariantSize, setActiveVariantSize] = useState<VariantSize>()
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    getProduct('1')
  }, [])

  useEffect(() => {
    if (product && product?.variantsColor?.length > 0) {
      setActiveVariantColor(product?.variantsColor[0])
    }
  }, [product])
  const mainSwiperRef = useRef<SwiperClass | null>(null)
  const thumbSwiperRef = useRef<SwiperClass | null>(null)

  const handleChangeImage = (index: number) => {
    setActiveImageIndex(index)
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index)
    }
  }
  const handleAddToCart = async () => {
    if (!activeVariantColor || !activeVariantSize || quantity === 0) return
    if (activeVariantSize.stock < quantity) {
      alert('Out of stock')
      return
    }
    return addToCart(activeVariantSize.id, quantity)
  }
  if (!product) return <div>Loading...</div>
  return (
    <div>
      <div className='flex lg:flex-row flex-col'>
        <div className='flex flex-col justify-center relative lg:w-[50vw] w-full'>
          {/* Swiper main */}
          <Swiper
            slidesPerView={1}
            className='!m-0'
            onSlideChange={(swiper) => {
              setActiveImageIndex(swiper.activeIndex)
              if (thumbSwiperRef.current) {
                thumbSwiperRef.current.slideTo(swiper.activeIndex)
              }
            }}
            onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          >
            {activeVariantColor?.galleries?.map((image) => (
              <SwiperSlide key={image.id}>
                <img src={image.image_url} alt={product?.name} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Vertical swiper */}
          <Swiper
            direction={'vertical'}
            slidesPerView={
              activeVariantColor?.galleries?.length &&
              activeVariantColor.galleries.length > 6
                ? 6
                : activeVariantColor?.galleries?.length || 6
            }
            className={`!absolute md:!block !hidden left-4 !h-${
              activeVariantColor?.galleries?.length &&
              activeVariantColor.galleries.length > 6
                ? '[400px]'
                : `[${(activeVariantColor?.galleries?.length ?? 0) * 66}px]`
            }`}
            // className={`!absolute md:!block !hidden left-4 !h-[400px]`}
            onSwiper={(swiper) => (thumbSwiperRef.current = swiper)}
          >
            {activeVariantColor?.galleries?.map((image, index) => (
              <SwiperSlide
                key={image.id}
                onClick={() => handleChangeImage(index)}
                className='pb-3'
              >
                <img
                  src={image.image_url}
                  alt={product?.name}
                  className={`h-14 w-14 border border-white rounded-lg duration-200 hover:opacity-100 cursor-pointer ${
                    activeImageIndex === index
                      ? 'opacity-100 border-[#CAC9C8]'
                      : 'opacity-50'
                  }`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='text-black lg:mt-24 mt-10 lg:w-full w-auto lg:mx-[10vw] mx-[5vw]'>
          <div>
            <h1 className='text-xl pb-2'>{product?.name}</h1>
            <p className='text-[#105A33] font-bold'>
              {activeVariantColor?.variantSizes[0]?.price}$
            </p>
            <div className='border-t border-gray-300 my-4'></div>

            <div className='flex flex-col'>
              <p className='pb-2 text-sm text-[#5a5a5a]'>Choose color:</p>
              <div className='flex gap-4'>
                {product?.variantsColor?.map((v) => (
                  <button
                    key={v.id}
                    className={`rounded-full h-8 w-8 border ${
                      activeVariantColor?.id === v.id
                        ? 'outline outline-2 outline-offset-1 outline-black'
                        : 'border-[#CAC9C8]'
                    }`}
                    style={{ backgroundColor: v.color.hex }}
                    onClick={() => {
                      setActiveVariantSize(null as any)
                      if (v.variantSizes[0].stock > 0) setActiveVariantColor(v)
                    }}
                  />
                ))}
              </div>
            </div>
            <div className='border-t border-gray-300 my-4' />
            <div className='flex flex-col'>
              <p className='pb-2 text-sm text-[#5a5a5a]'>Choose size:</p>
              <div className='flex gap-4'>
                {activeVariantColor?.variantSizes?.map((v) => (
                  <button
                    onClick={() => {
                      if (v.stock > 0) setActiveVariantSize(v)
                    }}
                    key={v.id}
                    className={`flex justify-center items-center rounded-full h-8 w-8 border ${
                      v.stock <= 0 ? 'cursor-not-allowed bg-[#e0e0e0]' : ''
                    } ${
                      activeVariantSize?.id === v.id
                        ? 'bg-black text-white'
                        : 'border-[#CAC9C8] text-[#5a5a5a]'
                    }`}
                  >
                    {v.size.name}
                  </button>
                ))}
              </div>
            </div>
            <div className='border-t border-gray-300 my-4' />
            <div className='flex sm:gap-4 gap-1 flex-col sm:flex-row items-center'>
              <p>Quantity:</p>
              <input
                type='number'
                min='1'
                defaultValue={1}
                max={activeVariantSize?.stock}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className='w-16 h-8 border border-[#CAC9C8] rounded-lg p-2'
              />
              {activeVariantSize?.stock && (
                <p>{activeVariantSize?.stock ?? 0} items available</p>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={() => handleAddToCart()}
              className='w-full border text-white bg-black rounded-lg p-2 mt-10 text-sm transition duration-300 ease-in-out hover:text-black hover:bg-white hover:border-black'
            >
              Add to cart
            </button>
            <button className='w-full border border-black text-black bg-white rounded-lg p-2 mt-2 text-sm transition duration-300 ease-in-out hover:text-white hover:bg-black hover:border-white'>
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className='flex text-black px-[8vw] py-[3vw] lg:flex-row flex-col'>
        <div className='lg:w-[42vw] w-full p-[3vw]'>
          <h1 className='uppercase font-medium'>Description:</h1>
          <p className='text-xs'>{product?.SKU}</p>

          <p className='text-sm py-5'>{product?.description}</p>
        </div>
        <div className='lg:w-[40vw] w-full'>
          <button className='px-[4vw] py-[3vw] rounded-2xl hover:bg-[#f0f0f0] relative w-full'>
            <p className='flex flex-col items-start w-full text-start'>
              <h1 className='uppercase font-medium'>See guide</h1>To choose your
              size, please refer to our size guide.
              <div className='text-2xl absolute right-[2vw]'>&rsaquo;</div>
            </p>
          </button>
          <button className='px-[4vw] py-[3vw] rounded-2xl hover:bg-[#f0f0f0] relative w-full'>
            <div className='flex flex-col items-start justify-center w-full'>
              <h1 className='uppercase font-medium'>
                Return & Shipping information
              </h1>
              <p className='line-clamp-2 text-start'>
                We will gladly accept returns of unworn merchandise in sellable
                condition with the original receipt or gift receipt from our
                Lacoste U.S. website within 30 days of delivery. Underwear,
                personalized items, fragrance, and shipping charges are
                considered final sale. Refunds will be credited to the original
                form of payment. To return a product, please register your
                return on your “Shipment Confirmation” email or by logging in to
                your Lacoste.com account and be sure to specify the reason for
                return.
              </p>
              <div className='text-2xl absolute right-[2vw]'>&rsaquo;</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product
