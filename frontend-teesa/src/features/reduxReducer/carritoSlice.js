import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loading: false,
  loadingUser: false,
  error: null,
  success: false,
  errorMessage: '',
  users: [],
  cart: [],
};

export const getUser = createAsyncThunk('users/getUsers', async () => {
  try {
    const response = await axios.get(`http://localhost:3001/users`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
});

export const postCart = createAsyncThunk(
  'cart/postCart',
  async ({ ProductId, CartId, cantidad }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/cart', {
        ProductId,
        cantidad,
        CartId,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error);
      return rejectWithValue(
        error.response?.data?.error || 'Error al enviar el carrito'
      );
    }
  }
);

export const getCart = createAsyncThunk('cart/getCart', async (CartId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/cart?CartId=${CartId}`
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    throw error;
  }
});

export const updateCart = createAsyncThunk(
  'cart/updateCart',
  async ({ CartProductId, cantidad }) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/cart/${CartProductId}`,
        { cantidad }
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      throw error;
    }
  }
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (CartProductId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/cart/${CartProductId}`
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
      throw error;
    }
  }
);

const cartSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loadingUser = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.success = true;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loadingUser = false;
        state.error = true;
        state.errorMessage = action.error.message;
      })
      .addCase(postCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = null;
      })
      .addCase(postCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(postCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.cart = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      })
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.errorMessage = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.cart = action.payload;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload;
      });
  },
});

export default cartSlice.reducer;

//me renderiza producto en la NavBar
// export const postCart = createAsyncThunk(
//   'cart/postCart',
//   async ({ ProductId, CartId, cantidad }, { rejectWithValue, getState }) => {
//     try {
//       const response = await axios.post('http://localhost:3001/cart', {
//         ProductId,
//         cantidad,
//         CartId,
//       });

//       // Obtener el estado actual del carrito
//       const { cart } = getState().app;

//       // Agregar el producto al carrito localmente
//       const updatedCart = [...cart, response.data];

//       // Devolver los datos actualizados como resultado de la acción
//       return updatedCart;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response?.data?.error || 'Error al enviar el carrito');
//     }
//   }
// );
