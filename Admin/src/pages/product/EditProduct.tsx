import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { twMerge } from 'tailwind-merge'
import Dropzone from '../../common/Dropzone'
import { PlusIcon, XIcon } from '@heroicons/react/outline'

interface Product {
  id: number
  SKU: string
  name: string
  description: string
  category: SizeAndCategory
  variantsColor: VariantsColor[]
}

interface SizeAndCategory {
  id: number
  name: string
}

interface VariantsColor {
  id?: number
  variantSizes: VariantSize[]
  color: Color
  galleries: Gallery[]
}

interface VariantSize {
  id: number
  price: number
  stock: number
  size: number
}

interface Color {
  id: number
  name: string
  hex: string
}

interface Gallery {
  id: number
  image_url: string
}

const EditProduct = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>()
  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => {
        const productTemp = res.data as any
        productTemp?.variantsColor?.forEach((variantColor: any) =>
          variantColor.variantSizes.map(
            (variantSize: any) => (variantSize.size = variantSize.size.id)
          )
        )
        setProduct(productTemp)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])
  useEffect(() => {
    console.log(product)
  }, [product])

  const [selectedColor, setSelectedColor] = useState<number>(0)
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [editingVariantsSize, setEditingVariantsSize] = useState<VariantSize[]>(
    []
  )
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
      product?.variantsColor
        .find((variantColor) => variantColor.color.id === selectedColor)
        ?.galleries.map((gallery) => gallery.image_url) || []
    )
    setEditingVariantsSize(
      product?.variantsColor.find(
        (variantColor) => variantColor.color.id === selectedColor
      )?.variantSizes || []
    )
  }, [selectedColor])

  const handleAddColor = (color: Color) => {
    if (product?.variantsColor.some((c) => c.id === color.id)) {
      return
    }
    const newVariantColor: VariantsColor = {
      color: color,
      galleries: [],
      variantSizes: [],
    }
    const productCopy = { ...product }
    productCopy?.variantsColor?.push(newVariantColor)
    setProduct(productCopy as Product)
  }

  const handleAddVariant = () => {
    const newVariant: VariantSize = {
      id: -1,
      stock: 0,
      price: 0,
      size: 0,
    }
    const productCopy = { ...product }
    productCopy?.variantsColor
      ?.find((color) => color.id === selectedColor)
      ?.variantSizes.push(newVariant)
    setProduct(productCopy as Product)
  }

  const handleRemoveVariantSize = (index: number) => {
    const productCopy = { ...product }
    productCopy?.variantsColor
      ?.find((color) => color.id === selectedColor)
      ?.variantSizes.splice(index, 1)
    setProduct(productCopy as Product)
  }

  const addImage = useCallback(
    (urls: string[]) => {
      const productCopy = { ...product }
      productCopy?.variantsColor
        ?.find((color) => color.id === selectedColor)
        ?.galleries?.push({ id: -1, image_url: urls[0] })
      setProduct(productCopy as Product)
    },
    [selectedColor]
  )

  const removeImage = useCallback(
    (url: string) => {
      const productCopy = { ...product }
      const index = productCopy?.variantsColor
        ?.find((color) => color.id === selectedColor)
        ?.galleries.findIndex((gallery) => gallery.image_url === url)
      if (index !== undefined && index > -1) {
        productCopy?.variantsColor
          ?.find((color) => color.id === selectedColor)
          ?.galleries.splice(index, 1)
      }
      setProduct(productCopy as Product)
    },
    [selectedColor]
  )

  const handleChangeVariantSize = (
    index: number,
    key: keyof VariantSize,
    value: number
  ) => {
    const productCopy = { ...product }
    const variantColor = productCopy?.variantsColor?.find(
      (variantColor) => variantColor.color.id === selectedColor
    )
    if (variantColor) {
      variantColor.variantSizes[index][key] = value
    }
    setProduct(productCopy as Product)
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
              value={product?.name || ''}
              onChange={(e) => {
                setProduct(
                  (prev) =>
                    ({
                      ...prev,
                      name: e.target.value,
                    } as Product)
                )
              }}
            />
          </div>
          {/* SKU */}
          <div className='w-full'>
            <span className='label-text'>SKU</span>
            <input
              type='text'
              placeholder='T-S/M'
              value={product?.SKU || ''}
              className='input input-bordered w-full'
              onChange={(e) => {
                setProduct(
                  (prev) =>
                    ({
                      ...prev,
                      SKU: e.target.value,
                    } as Product)
                )
              }}
            />
          </div>

          {/* Category */}
          <div className='flex flex-col justify-around'>
            <span className='label-text'>Category</span>
            <select
              value={product?.category.id || ''}
              onChange={(e) => {
                setProduct(
                  (prev) =>
                    ({
                      ...prev,
                      category: { id: parseInt(e.target.value), name: '' },
                    } as Product)
                )
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
            value={product?.description || ''}
            className='textarea textarea-bordered'
            placeholder='Description'
            onChange={(e) => {
              setProduct(
                (prev) =>
                  ({
                    ...prev,
                    description: e.target.value,
                  } as Product)
              )
            }}
          />
        </div>

        {/* Color */}
        <div className='flex flex-row gap-4 items-center'>
          <span className='label-text'>Color:</span>
          {product?.variantsColor.map((color) => (
            <label
              key={color.color.id}
              className='label cursor-pointer tooltip flex items-center'
              data-tip={color.color.name}
            >
              <button
                onClick={() => setSelectedColor(color.color.id)}
                style={{ backgroundColor: color.color.hex }}
                className={twMerge(
                  'h-10 w-10 rounded-full',
                  selectedColor === color?.color.id &&
                    `outline outline-4 outline-offset-4 outline-white`,
                  color?.color.name === 'No color' && 'bg-rainbow'
                )}
              />
              <button className='w-7 h-7 absolute -top-1 -right-4'>
                <XIcon
                  className='w-5 h-5 fill-slate-300 hover:fill-secondary-400 transition-colors'
                  onClick={() => {
                    setProduct(
                      (prev) =>
                        ({
                          ...prev,
                          variantsColor: prev?.variantsColor.filter(
                            (c) => c.id !== color.color.id
                          ),
                        } as Product)
                    )
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

        {product?.variantsColor?.length && selectedColor !== 0 && (
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
                        'size',
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
                        selected={variant.size === size.id}
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

export default EditProduct
