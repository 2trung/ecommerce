import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { CiHeart } from 'react-icons/ci'

export interface Product {
  id: number
  SKU: string
  name: string
  description: string
  created_at: string
  updated_at: string
  category: Category
  variantsColor: VariantsColor[]
}

export interface Category {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface VariantsColor {
  id: number
  created_at: string
  updated_at: string
  variantSizes: VariantSize[]
  color: Color
  galleries: Gallery[]
}

export interface VariantSize {
  id: number
  price: string
  stock: number
  size: Size
}

export interface Size {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface Color {
  id: number
  name: string
  hex: string
  created_at: string
  updated_at: string
}

export interface Gallery {
  id: number
  image_url: string
  created_at: string
  updated_at: string
}
const ProductCard = () => {
  const [product, setProduct] = useState<Product>()
  useEffect(() => {
    axios.get('http://localhost:3000/product/1').then((res) => {
      setProduct(res.data)
    })
  }, [])
  return (
    <div className='relative'>
      <img
        src={product?.variantsColor[0].galleries[0].image_url}
        alt={product?.name}
        className='w-[22vw] peer cursor-pointer'
      />
      <CiHeart className='absolute right-2 top-2 w-5 h-[18px] cursor-pointer' />
      <h1 className='peer-hover:underline hover:underline'>{product?.name}</h1>
      <p>{product?.variantsColor[0]?.variantSizes[0]?.price}</p>
      <div className='flex gap-2'>
        {product?.variantsColor.map((variant) => (
          <button
            key={variant.id}
            className={`rounded-full h-4 w-4 border`}
            style={{ backgroundColor: variant.color.hex }}
          >
            {/* <p>{variant.color.name}</p> */}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductCard
