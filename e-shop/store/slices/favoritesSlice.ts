import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
  rating: number
}

interface FavoritesState {
  items: Product[]
}

const initialState: FavoritesState = {
  items: [],
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some((item) => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
  },
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer

// Selector: check if an id is in the favorites; accepts either the slice state or the root state containing `favorites`.
export const selectIsFavorite = (
  state: { favorites: FavoritesState } | FavoritesState,
  id: number
) => {
  const items = "favorites" in state ? state.favorites.items : (state as FavoritesState).items
  return items.some((item) => item.id === id)
}
