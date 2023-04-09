import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";
import { getThumbimageFromMedia } from "src/utils/product";
import { ProductTypeWithQty, ShoppingCartType } from "./type";

const initialState: ShoppingCartType = {
  isOpenSmallCart: true,
  listProducts: [],
  callingListProduct: false,
  selectedProduct: [],
  errorWhenAddProduct: false,
  needToLogin: false,
};

export const handleChangeField = createAction<Partial<ShoppingCartType>>(
  "shoopingCart/handleChangeField",
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openSmallCart: (state) => {
      state.isOpenSmallCart = true;
    },
    closeSmallCart: (state) => {
      state.isOpenSmallCart = false;
    },
    loadListProducts: (state) => {
      const cookies = new Cookies();
      const memberCookies = cookies.get("member");
      if (!memberCookies) {
        return;
      }
      const memberId = memberCookies.memberId;
      state.listProducts = JSON.parse(localStorage.getItem(`listProducts_${memberId}`) || "[]");
      state.selectedProduct = state.listProducts
        .map((item) => item._id);
    },
    addProductToCart: (state, action) => {
      const { qty, product, callBack, isLoggedIn } = action.payload;
      if (!isLoggedIn) {
        state.needToLogin = true;
        return;
      }
      const hasproduct = state.listProducts.find(
        (item) => item._id === product._id,
      );

      if (state.listProducts.length >= 30 && !hasproduct) {
        state.errorWhenAddProduct = true;
        return;
      }

      if (hasproduct) {
        state.listProducts = state.listProducts.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + qty > 10000 ? 10000 : item.qty + qty }
            : item,
        );
      } else {
        state.listProducts = [
          {
            ...product,
            qty,
            description: "",
            media: [getThumbimageFromMedia(product.media)] || [],
          },
          ...state.listProducts,
        ];
      }
      const cookies = new Cookies();
      const memberCookies = cookies.get("member");
      const memberId = memberCookies.memberId;
      localStorage.setItem(`listProducts_${memberId}`, JSON.stringify(state.listProducts));

      state.isOpenSmallCart = true;
      if ((hasproduct?.qty as number) >= 10000) {
        callBack?.("you_can_not_buy_more_than", "error");
      } else {
        callBack?.("add_product_to_cart_successfully", "default");
      }
    },
    updateQtyProduct: (state, { payload }) => {
      state.listProducts = state.listProducts.map((item) =>
        item._id === payload.id ? { ...item, qty: payload.qty } : item,
      );
      const cookies = new Cookies();
      const memberCookies = cookies.get("member");
      const memberId = memberCookies.memberId;
      localStorage.setItem(`listProducts_${memberId}`, JSON.stringify(state.listProducts));
    },
    deleteProduct: (state, { payload }) => {
      state.listProducts = state.listProducts.filter((item) => item._id !== payload.id);
      const cookies = new Cookies();
      const memberCookies = cookies.get("member");
      const memberId = memberCookies.memberId;
      localStorage.setItem(`listProducts_${memberId}`, JSON.stringify(state.listProducts));
    },
    deleteMultyProduct: (state, { payload }: PayloadAction<string[]>) => {
      state.listProducts = state.listProducts.filter((item) => !payload.includes(item._id));
      const cookies = new Cookies();
      const memberCookies = cookies.get("member");
      const memberId = memberCookies.memberId;
      localStorage.setItem(`listProducts_${memberId}`, JSON.stringify(state.listProducts));
    },
    updateSelectedProduct: (state, { payload }: PayloadAction<string[]>) => {
      state.selectedProduct = payload;
    },
    getListProductInCartFulfilled: (state, { payload }) => {
      if (!payload) {
        return { ...state, callingListProduct: false, listProducts: [] };
      }

      const newListProduct = state.listProducts.map((item) => {
        const newitem = payload.data.find(
          (product: ProductTypeWithQty) => item._id === product._id,
        );
        if (newitem) {
          return {
            ...item,
            ...newitem,
            description: "",
            media: [getThumbimageFromMedia(newitem.media)] || [],
          };
        }

        return { ...item, status: "NotFound" };
      });
      const cookies = new Cookies();
      const memberCookies = cookies.get("member");
      if (!memberCookies) {
        return { ...state, callingListProduct: false, listProducts: [] };
      }
      const memberId = memberCookies.memberId;
      localStorage.setItem(`listProducts_${memberId}`, JSON.stringify(newListProduct));
      return {
        ...state,
        callingListProduct: false,
        listProducts: newListProduct,
      };
    },
    getListProductInCartPending: (state) => {
      return {
        ...state,
        callingListProduct: true,
      };
    },
    getListProductInCartRejected: (state) => {
      return {
        ...state,
        callingListProduct: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleChangeField, (state, action) => {
      return { ...state, ...action.payload };
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  openSmallCart,
  closeSmallCart,
  addProductToCart,
  updateQtyProduct,
  deleteProduct,
  loadListProducts,
  updateSelectedProduct,
  deleteMultyProduct,
  getListProductInCartFulfilled,
  getListProductInCartPending,
  getListProductInCartRejected,
} = cartSlice.actions;

export default cartSlice.reducer;
