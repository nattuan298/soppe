import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderProductDetailType } from "types/orders";

interface transferBMCProps {
  selectedProduct: OrderProductDetailType | null;
  orderId: string;
  quantity: number;
}

const initialState: transferBMCProps = {
  orderId: "",
  selectedProduct: null,
  quantity: 0,
};

export const transferBMCSlice = createSlice({
  name: "transferBMC",
  initialState,
  reducers: {
    toggleSelectedProduct: (
      state,
      action: PayloadAction<{ product: OrderProductDetailType; orderId: string }>,
    ) => {
      const product = action.payload.product;
      const orderId = action.payload.orderId;
      if (product.productCode === state.selectedProduct?.productCode && orderId === state.orderId) {
        state.orderId = "";
        state.selectedProduct = null;
        state.quantity = 0;
      } else {
        state.selectedProduct = product;
        state.orderId = orderId;
        state.quantity = product.timesTransferLeft;
      }
    },
    removeSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.orderId = "";
      state.quantity = 0;
    },
    changeQuantity: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleSelectedProduct, removeSelectedProduct, changeQuantity } =
  transferBMCSlice.actions;

export default transferBMCSlice.reducer;
