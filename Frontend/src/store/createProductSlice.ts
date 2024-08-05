import { create } from 'zustand'
import axiosInstance from '../utils/axiosInstance'
import { Product } from '../interface/product'

interface ProductState {
  product: Product
  getProduct: (productId: string) => Promise<void>
}

const createProduct = create<ProductState>((set) => ({
  product: {} as Product,
  getProduct: async (productId: string) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`)
      set(() => ({ product: response.data }))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}))

export default createProduct
