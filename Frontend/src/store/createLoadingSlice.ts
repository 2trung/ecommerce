import { create } from 'zustand'

type LoadingState = {
  loading: boolean
  setLoading: (isLoading: boolean) => void
}

const createLoading = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (isLoading: boolean) => set({ loading: isLoading }),
}))

export default createLoading
