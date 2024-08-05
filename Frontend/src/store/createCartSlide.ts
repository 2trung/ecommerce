import { create } from 'zustand'
import axiosInstance from '../utils/axiosInstance'
import { Cart } from '../interface/cart'

interface CartSlideState {
  cart: Cart
  addToCart: (variantSizeId: number, quantity: number) => void
  deleteProduct: (cartIds: number[]) => void
  clearCart: () => void
  updateQuantity: (variantSizeId: number, quantity: number) => void
  getCart: () => void
}

const useCartSlide = create<CartSlideState>((set) => ({
  cart: [] as Cart,
  addToCart: async (variantSizeId: number, quantity: number) => {
    try {
      const response = await axiosInstance.post(`/cart/add`, {
        variantSizeId,
        quantity: quantity,
      })
      set(() => ({ cart: response.data.data }))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  deleteProduct: async (cartIds: number[]) => {
    try {
      const response = await axiosInstance.delete('/cart/delete', {
        data: { cartIds },
      })
      set(() => ({ cart: response.data.data }))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  clearCart: async () => {
    try {
      const response = await axiosInstance.delete(`/cart`)
      set(() => ({ cart: response.data.data }))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  updateQuantity: async (variantSizeId: number, quantity: number) => {
    try {
      const response = await axiosInstance.patch(`/cart/${variantSizeId}`, {
        quantity,
      })
      set(() => ({ cart: response.data.data }))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  getCart: async () => {
    try {
      const response = await axiosInstance.get(`/cart`)
      set(() => ({ cart: response.data.data }))
    } catch (error) {
      console.error(error)
      // throw error
    }
  },
}))

export default useCartSlide
