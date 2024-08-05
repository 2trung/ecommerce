import { create } from 'zustand'
import axiosInstance from '../utils/axiosInstance'
import { Cart } from '../interface/cart'

interface Address {
  id?: number
  name: string
  phone: string
  address: string
  city: string
  zip: string
  state: string
  default: boolean
}

interface CheckoutSlideState {
  address: Address | null
  existingAddress: Address[] | null
  setAddress: (address: Address) => void
  createAddress: (address: Address) => void
  getAddresses: () => void
  createOrder: (addressId: number, cart: Cart) => Promise<string>
}
const useCheckoutSlide = create<CheckoutSlideState>((set) => ({
  address: null,
  existingAddress: null,
  setAddress: (address: Address) => {
    set(() => ({ address }))
  },
  createAddress: async (address: Address) => {
    try {
      const response = await axiosInstance.post('/address/add', address)
      set(() => ({ address: response.data.data }))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  getAddresses: async () => {
    try {
      const response = await axiosInstance.get('/address')
      set(() => ({ existingAddress: response.data.data }))
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  createOrder: async (addressId: number, cart: Cart) => {
    try {
      console.log('addressId', addressId)
      console.log('cart', cart)
      const response = await axiosInstance.post('/order/create', {
        products: cart.map((product) => ({
          variantSizeId: product.id,
          quantity: product.quantity,
        })),
        addressId,
      })
      const paymentUrl = response.data.data
      return paymentUrl
    } catch (error) {
      console.error(error)
      throw error
    }
  },
}))

export default useCheckoutSlide
