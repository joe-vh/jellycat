import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
  value: Array<number>;
}

const initialState: CartState = {
  value: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      if (!state.value.includes(action.payload)) {
        state.value.push(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;