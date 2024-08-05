import { useCallback, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Dropzone from '../../common/Dropzone'
import { PlusIcon, XIcon } from '@heroicons/react/outline'
import axios from 'axios'

interface Color {
  id: number
  name: string
  hex: string
}
interface SizeAndCategory {
  id: number
  name: string
}

interface VariantSize {
  size_id: number
  stock: number
  price: number
}

interface VariantColor {
  color_id: number
  color_name?: string
  hex: string
  image_urls: string[]
  variants_size: VariantSize[]
}

interface Product {
  SKU: string
  name: string
  description: string
  category_id: number
  variants_color: VariantColor[]
}

const AddProduct = () => {
  const [selectedColor, setSelectedColor] = useState<number>(0)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [editingVariantsSize, setEditingVariantsSize] = useState<VariantSize[]>(
    []
  )
  const [product, setProduct] = useState<Product>({
    SKU: '',
    name: '',
    description: '',
    category_id: 0,
    variants_color: [],
  })
  const [categories, setCategories] = useState<SizeAndCategory[]>([])
  const [colors, setColors] = useState<Color[]>([])
  const [sizes, setSizes] = useState<SizeAndCategory[]>([])

  useEffect(() => {
    const fetchData = async () => {
      Promise.all([
        axios.get('http://localhost:3000/variant/category?items_per_page=1000'),
        axios.get('http://localhost:3000/variant/color?items_per_page=1000'),
        axios.get('http://localhost:3000/variant/size?items_per_page=1000'),
      ]).then((res) => {
        setCategories(res[0].data.data)
        setColors(res[1].data.data)
        setSizes(res[2].data.data)
      })
    }
    fetchData()
  }, [])

  useEffect(() => {
    setImageUrls(
      product.variants_color.find((color) => color.color_id === selectedColor)
        ?.image_urls as string[]
    )
    setEditingVariantsSize(
      product.variants_color.find((color) => color.color_id === selectedColor)
        ?.variants_size as VariantSize[]
    )
  }, [selectedColor])

  const handleAddColor = (color: Color) => {
    if (product.variants_color.some((c) => c.color_id === color.id)) {
      return
    }
    const newColor: VariantColor = {
      color_id: color.id,
      color_name: color.name,
      hex: color.hex,
      image_urls: [],
      variants_size: [],
    }
    setProduct((prev) => ({
      ...prev,
      variants_color: [...prev.variants_color, newColor],
    }))
  }

  const handleAddVariant = () => {
    const newVariant: VariantSize = {
      size_id: -1,
      stock: 0,
      price: 0,
    }
    const productCopy = { ...product }
    productCopy.variants_color
      .find((color) => color.color_id === selectedColor)
      ?.variants_size.push(newVariant)
    setProduct(productCopy)
  }

  const handleRemoveVariantSize = (index: number) => {
    const productCopy = { ...product }
    productCopy.variants_color
      .find((color) => color.color_id === selectedColor)
      ?.variants_size.splice(index, 1)
    setProduct(productCopy)
  }

  const addImage = useCallback(
    (urls: string[]) => {
      const productCopy = { ...product }
      productCopy.variants_color
        .find((color) => color.color_id === selectedColor)
        ?.image_urls.push(...urls)
      setProduct(productCopy)
    },
    [selectedColor]
  )

  const removeImage = useCallback(
    (url: string) => {
      const productCopy = { ...product }
      const index = productCopy.variants_color
        .find((color) => color.color_id === selectedColor)
        ?.image_urls.indexOf(url)
      if (index !== undefined && index > -1) {
        productCopy.variants_color
          .find((color) => color.color_id === selectedColor)
          ?.image_urls.splice(index, 1)
      }
      setProduct(productCopy)
    },
    [selectedColor]
  )

  const handleChangeVariantSize = (
    index: number,
    key: keyof VariantSize,
    value: number
  ) => {
    const productCopy = { ...product }
    const variantColor = productCopy.variants_color.find(
      (color) => color.color_id === selectedColor
    )
    if (variantColor) {
      console.log(variantColor)
      variantColor.variants_size[index][key] = value
    }
    setProduct(productCopy)
  }

  const handleAddProduct = () => {
    return axios.post('http://localhost:3000/product/create', product)
  }

  return (
    <div className='flex flex-col p-5'>
      <div className='flex form-control w-full gap-5'>
        {/* Name */}
        <div className='flex justify-between gap-4'>
          <div className='w-full'>
            <span className='label-text'>Name</span>
            <input
              type='text'
              placeholder='T-Shirt'
              className='input input-bordered w-full'
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }}
            />
          </div>
          {/* SKU */}
          <div className='w-full'>
            <span className='label-text'>SKU</span>
            <input
              type='text'
              placeholder='T-S/M'
              className='input input-bordered w-full'
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  SKU: e.target.value,
                }))
              }}
            />
          </div>

          {/* Category */}
          <div className='flex flex-col justify-around'>
            <span className='label-text'>Category</span>
            <select
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  category_id: parseInt(e.target.value),
                }))
              }}
              className='select select-bordered'
            >
              <option disabled selected>
                Choose category
              </option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className='flex flex-col'>
          <span className='label-text'>Description</span>
          <textarea
            className='textarea textarea-bordered'
            placeholder='Description'
            onChange={(e) => {
              setProduct((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }}
          />
        </div>

        {/* Color */}
        <div className='flex flex-row gap-4 items-center'>
          <span className='label-text'>Color:</span>
          {product.variants_color.map((color) => (
            <label
              key={color.color_id}
              className='label cursor-pointer tooltip flex items-center'
              data-tip={color.color_name}
            >
              <button
                onClick={() => setSelectedColor(color.color_id)}
                style={{ backgroundColor: color.hex }}
                className={twMerge(
                  'h-10 w-10 rounded-full',
                  selectedColor === color?.color_id &&
                    `outline outline-4 outline-offset-4 outline-white`,
                  color?.color_name === 'No color' && 'bg-rainbow'
                )}
              />
              <button className='w-7 h-7 absolute -top-1 -right-4'>
                <XIcon
                  className='w-5 h-5 fill-slate-300 hover:fill-secondary-400 transition-colors'
                  onClick={() => {
                    setProduct((prev) => ({
                      ...prev,
                      variants_color: prev.variants_color.filter(
                        (c) => c.color_id !== color.color_id
                      ),
                    }))
                  }}
                />
              </button>
            </label>
          ))}
          <details className='dropdown'>
            <summary className='mb-1 btn rounded-full'>
              <PlusIcon className='w-5 h-5' />
            </summary>

            <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52'>
              {colors.map((color) => (
                <li key={color.id}>
                  <a
                    onClick={() => {
                      handleAddColor(color)
                    }}
                  >
                    {color.name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>

        {product.variants_color.length > 0 && selectedColor !== 0 && (
          <>
            <Dropzone
              image_urls={imageUrls}
              addImage={addImage}
              removeImage={removeImage}
            />
            <span className='title text-lg font-semibold mt-10 pb-3'>
              Size/Stock/Price
            </span>
            {editingVariantsSize?.map((variant, index) => (
              <div key={index} className='flex gap-4 items-center'>
                <div className='flex flex-col'>
                  <span className='label-text'>Size</span>
                  <select
                    onChange={(e) =>
                      handleChangeVariantSize(
                        index,
                        'size_id',
                        parseInt(e.target.value)
                      )
                    }
                    className='select select-bordered'
                  >
                    <option disabled selected>
                      Choose size
                    </option>
                    {sizes.map((size) => (
                      <option
                        selected={variant.size_id === size.id}
                        value={size.id}
                        key={size.id}
                      >
                        {size.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='flex flex-col'>
                  <span className='label-text'>Stock</span>
                  <input
                    type='number'
                    placeholder='100'
                    value={variant.stock}
                    className='input input-bordered w-full max-w-xs'
                    onChange={(e) =>
                      handleChangeVariantSize(
                        index,
                        'stock',
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className='flex flex-col'>
                  <span className='label-text'>Price($)</span>
                  <input
                    type='number'
                    placeholder='9.99'
                    value={variant.price}
                    className='input input-bordered w-full max-w-xs'
                    onChange={(e) =>
                      handleChangeVariantSize(
                        index,
                        'price',
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </div>
                <button>
                  <XIcon
                    className='w-5 h-5 fill-secondary-400 mt-5'
                    onClick={() => {
                      handleRemoveVariantSize(index)
                    }}
                  />
                </button>
              </div>
            ))}

            <button
              onClick={() => handleAddVariant()}
              className='btn w-12 h-10 p-0 rounded-full flex items-center justify-center'
            >
              <PlusIcon className='w-5 h-5' />
            </button>
          </>
        )}
      </div>
      <div className='flex h-full justify-end'>
        <button onClick={() => handleAddProduct()} className='btn btn-primary'>
          Add Product
        </button>
      </div>
    </div>
  )
}

export default AddProduct
