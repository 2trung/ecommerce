import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import useWindowWidth from '../../hooks/useWindowWidth'

import 'swiper/css'
interface Item {
  title: string
  image: string
}
enum ItemTypes {
  category = 'category',
  product = 'product',
}

const Slider = ({
  data,
  itemTypes,
}: {
  data: Item[]
  itemTypes: ItemTypes
}) => {
  const width = useWindowWidth()

  return itemTypes === ItemTypes.category ? (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0.04 * width}
      slidesOffsetAfter={0.04 * width}
      slidesOffsetBefore={0.04 * width}
      slidesPerView={width > 1280 ? 3.5 : width > 768 ? 2.5 : 1.2}
      className='w-[100vw] xl:h-[38vw] md:h-[56vw] h-[126vw] my-4'
    >
      {data.map((category) => (
        <SwiperSlide key={category.title}>
          <img
            src={category.image}
            alt='sale'
            className='w-[100%] cursor-pointer'
          />
          <p className='cursor-pointer underline hover:no-underline underline-offset-1 py-2 text-black'>
            {category.title}
          </p>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={8}
      slidesOffsetAfter={0.04 * width}
      slidesOffsetBefore={0.04 * width}
      slidesPerView={width > 768 ? 4.5 : 1.2}
      className='w-[100vw] my-4'
    >
      {data.map((category) => (
        <SwiperSlide key={category.title}>
          <img
            src={category.image}
            alt='sale'
            className='h-[27vw] object-cover cursor-pointer'
          />
          <p className='cursor-pointer hover:underline no-underline underline-offset-1 pt-2 text-sm text-black'>
            {category.title}
          </p>
          <p className='text-sm cursor-pointer font-medium'>$100</p>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default Slider
