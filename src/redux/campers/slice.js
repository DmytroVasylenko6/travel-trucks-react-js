import { createSlice } from '@reduxjs/toolkit';
import { getCampers, getCamperById, getLocations } from './operations';

const initialState = {
  total: 0,
  items: [],
  favoriteCampers: [],
  currentCamper: null,
  filters: {}, // Додаємо фільтри в стейт
  uniqueLocations: [],
  loading: false,
  error: null,
  page: 1, // Поточна сторінка
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    clearCampers: state => {
      state.items = [];
      state.total = 0;
    },
    setFilters: (state, action) => {
      state.filters = action.payload; // Оновлюємо фільтри
      console.log(action.payload);
    },
    setPage: (state, action) => {
      state.page = action.payload; // Оновлюємо сторінку
    },
    resetPage: state => {
      state.page = 1;
      console.log(state.page);
    },
    toggleFavorite: (state, action) => {
      const camperId = action.payload;
      if (!state.favoriteCampers.includes(camperId)) {
        state.favoriteCampers.push(camperId); // Додаємо до улюблених
      } else {
        state.favoriteCampers = state.favoriteCampers.filter(
          id => id !== camperId
        ); // Якщо вже є, видаляємо
      }
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        const { items, total } = action.payload;
        state.loading = false;
        state.total = total;
        const uniqueItems = items.filter(
          item => !state.items.some(existingItem => existingItem.id === item.id)
        );
        state.items = [...state.items, ...uniqueItems];
      })
      .addCase(getCampers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCamperById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(getCamperById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLocations.pending, state => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        // state.loading = false;
        const uniqueLocations = [
          ...new Set(action.payload.map(item => item.location)),
        ];
        state.uniqueLocations = uniqueLocations;
      })
      .addCase(getLocations.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      }),
});

export const {
  setFilters,
  clearCampers,
  setPage,
  toggleFavorite,
  setLocations,
  resetPage,
} = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
