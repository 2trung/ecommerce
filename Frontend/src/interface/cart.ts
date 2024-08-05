export type Cart = Root[]

export interface Root {
  id: number
  quantity: number
  variantSize: VariantSize
}

export interface VariantSize {
  id: number
  price: string
  stock: number
  size: Size
  variantColor: VariantColor
}

export interface VariantColor {
  id: number
  created_at: string
  updated_at: string
  product: Product
  galleries: Gallery[]
  color: Color
}

export interface Product {
  id: number
  SKU: string
  name: string
  description: string
  created_at: string
  updated_at: string
}

export interface Gallery {
  id: number
  image_url: string
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

export interface Size {
  id: number
  name: string
  created_at: string
  updated_at: string
}
