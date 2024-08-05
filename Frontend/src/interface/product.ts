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
