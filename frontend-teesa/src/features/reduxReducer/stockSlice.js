import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    let allProducts = [];
    let currentPage = 1;
    let hasMorePages = true;

    while (hasMorePages) {
      const response = await axios.get(
        `https://teesa-backend.onrender.com/products?page=${currentPage}`
      );
      const currentPageProducts = response.data.products;

      if (currentPageProducts.length === 0 || !response.data.NextPage) {
        hasMorePages = false;
      } else {
        allProducts = [...allProducts, ...currentPageProducts];
        currentPage++;
      }
    }

    return allProducts;
  }
);

const stockSlice = createSlice({
  name: 'stock',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default stockSlice.reducer;
// export const { } = productSlice.actions;
