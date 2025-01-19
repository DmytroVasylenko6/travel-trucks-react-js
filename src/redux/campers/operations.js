import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async ({ page = 1, limit = 4, filterParams }, thunkApi) => {
    try {
      // Формуємо параметри запиту
      const params = {
        page,
        limit,
        ...filterParams, // Додаємо всі фільтри безпосередньо
      };
      // Відправляємо запит
      const { data } = await axios.get('/campers', { params });

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getCamperById = createAsyncThunk(
  'campers/getCampersById',
  async (id, thunkApi) => {
    try {
      const { data } = await axios.get('/campers/' + id);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getLocations = createAsyncThunk(
  'campers/getLocations',
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get('/campers/');
      return data.items;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const setFilters = filters => ({
  type: 'campers/setFilters',
  payload: filters,
});
