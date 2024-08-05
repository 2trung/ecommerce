import Slider from '../../components/slider/slider'
import banner1 from '../../assets/novak.png'

enum ItemTypes {
  category = 'category',
  product = 'product',
}

export default function Home() {
  const categories = [
    {
      title: 'Polos',
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Library-Sites-LacosteContent/default/dw348aeed2/SS24/Homepage/Refit/L1212_IY2_20_slideshow.jpg',
    },
    {
      title: 'Tees',
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Library-Sites-LacosteContent/default/dw66df28c8/SS24/Homepage/Refit/TH6709_UYX_20_slideshow.jpg',
    },
    {
      title: 'Sweeters & Sweatshirts',
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Library-Sites-LacosteContent/default/dwa5d43037/SS24/Homepage/Refit/SH1281_166_20_slideshow.jpg',
    },
    {
      title: 'Matching Sets',
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Library-Sites-LacosteContent/default/dwa8dd7b59/SS24/Homepage/Refit/XH7441_J2G_L1_slideshow.jpg',
    },
    {
      title: 'Shoes',
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Library-Sites-LacosteContent/default/dw92826775/SS24/Homepage/Refit/2E-men-shoes.jpg',
    },
  ]
  const bestSellers = [
    {
      title: "Men's Lacoste Tennis x Novak Djokovic Zip-Up Jacket",
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw91095036/SH7541_001_20.jpg',
    },
    {
      title: "Men's L.12.12 Heathered Petit Piqué Cotton Polo",
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw7a07ac4a/L1264_IXA_20.jpg',
    },
    {
      title: "Men's Original L.12.12 Petit Piqué Cotton Polo",
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dwfefee0a4/L1212_001_20.jpg',
    },
    {
      title: "Men's Original L.12.12 Petit Piqué Cotton Polo",
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dwb29ceb1e/L1212_IXV_20.jpg',
    },
    {
      title: "Men's Original L.12.12 Petit Piqué Cotton Polo",
      image:
        'https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw86698a9e/L1212_IXY_20.jpg',
    },
  ]
  return (
    <main className='flex min-h-screen flex-col items-center justify-between overflow-hidden'>
      <div className='relative'>
        <video
          autoPlay
          loop
          muted
          className='video-banner'
          src='https://static1.lacoste.com/videos/marketing/BLUE-STARTER-DESK-bluecrocs-ss24.mp4'
        />
        <div className='flex absolute top-0 left-0 flex-col justify-end xl:w-[50vw] md:w-[85vw] w-full h-full pb-28 px-[3vw]'>
          <p className='md:text-7xl text-4xl font-medium text-white uppercase'>
            Extra 20% off Select Styles
          </p>
          <p className='text-xl text-white uppercase '>Limited time only</p>
          <div className='flex gap-3 max-[310px]:flex-col flex-row'>
            <button className='bg-white text-black px-4 py-3 mt-4 text-xs border uppercase transition duration-300 ease-in-out hover:text-white hover:bg-black hover:border-white'>
              Extra 20% off
            </button>
            <button className='bg-white text-black px-4 py-3 mt-4 text-xs border uppercase transition duration-300 ease-in-out hover:text-white hover:bg-black hover:border-white'>
              Shop all sale
            </button>
          </div>
        </div>
      </div>

      <div className='pt-9'>
        <h2 className='uppercase text-black px-[4vw] mb-10 font-medium text-3xl'>
          Shop Sale
        </h2>
        <Slider data={categories} itemTypes={ItemTypes.category} />
      </div>

      <div className='md:flex flex-none justify-start items-center w-[100%]'>
        <img
          src={banner1}
          alt='polos'
          className='md:w-[55vw] object-cover self-start'
        />
        <div className='p-[4vw] md:ml-[4vw] ml-0 md:w-[32vw] text-black'>
          <h2 className='font-medium md:text-3xl text-xl'>
            LACOSTE X NOVAK DJOKOVIC
          </h2>
          <p className='text-xs sm:text-base'>
            Novak Djokovic's cutting-edge championship wardrobe is a creation
            crafted by the crocodile. Slip into his polo shirts, tracksuits and
            accessories designed for match days, and discover all the pieces
            that live by his side.
          </p>
          <div className='flex gap-3 xl:flex-row max-md:flex-row flex-col'>
            <button className='bg-white text-black px-4 py-3 mt-4 text-xs border border-black uppercase max-w-36 transition duration-300 ease-in-out hover:text-white hover:bg-black hover:border-white'>
              Shop the collection
            </button>
            <button className='bg-white text-black px-4 py-3 mt-4 text-xs border border-black uppercase max-w-36 transition duration-300 ease-in-out hover:text-white hover:bg-black hover:border-white'>
              Shop all items
            </button>
          </div>
        </div>
      </div>

      <div className='pt-9'>
        <h2 className='uppercase text-black px-[4vw] mb-10 font-medium text-3xl'>
          Best Seller
        </h2>
        <Slider data={bestSellers} itemTypes={ItemTypes.product} />
      </div>
    </main>
  )
}
