import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { config } from "src/constants/config";
import { authorizedRequest } from "src/lib/request";
import { ProductModel } from "src/types/inventory-management.model";
import { ApiListModel } from "src/types/api-list.model";

// export const getProductList = createAsyncThunk(
//   "inventoryManagement/getProductList",
//   async (params: ParamInventoryProductModel) => {
//     const response = (await authorizedRequest.get(`${config.apiBaseUrl}/admin/products`, {
//       params,
//     })) as ApiListModel<ProductModel>;

//     return response;
//   },
// );

// export const getProductById = createAsyncThunk(
//   "inventoryManagement/getProductById",
//   async ({ id, countryCode }: { id: string; countryCode: string }) => {
//     const response = await authorizedRequest.get(
//       `${config.apiBaseUrl}/admin/products/productCode?countryCode=${countryCode}&productCode=${id}`,
//     );

//     return response;
//   },
// );

// export const updateProduct = createAsyncThunk(
//   "inventoryManagement/updateProduct",
//   async (params: { id: string; body: ProductModel }) => {
//     await authorizedRequest.put(`${config.apiBaseUrl}/admin/products/${params.id}`, {
//       ...params.body,
//     });
//   },
// );

interface InitialStateType {
  productData: ApiListModel<ProductModel>;
  productDetail: ProductModel;
  loading: boolean;
}

const initialState: InitialStateType = {
  productData: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  productDetail: {
    categoryId: "",
    createdAt: "",
    description: "",
    isNewProduct: false,
    mediaUrl: "",
    price: 0,
    productName: "",
    rating: 0,
    ratingCount: 0,
    stock: 0,
    updatedAt: "",
    __v:
    0,
    _id:
    "",
  },
  loading: true,
};

const inventoryManagementSlice = createSlice({
  name: "inventoryManagement",
  initialState,
  reducers: {
    resetProductList: (state) => {
      state.productData = {
        data: [],
        total: 0,
        page: 0,
        limit: 0,
      };
    },
    setLoadingProduct: (state, action) => {
      state.loading = action.payload.loading;
    },
    setProductList: (state, action) => {
      state.loading = false;
      state.productData = action.payload;
    },
    setProductDetail: (state, action) => {
      state.loading = false;
      state.productDetail = action.payload;
    },
  },
  extraReducers: {
    // get product
    // [getProductList.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getProductList.fulfilled.toString()]: (
    //   state,
    //   action: PayloadAction<ApiListModel<ProductModel>>,
    // ) => {
    //   state.loading = false;
    //   state.productData = action.payload;
    // },
    // [getProductList.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // get product detail
    // [getProductById.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [getProductById.fulfilled.toString()]: (state, action: PayloadAction<ProductModel>) => {
    //   state.loading = false;
    //   state.productDetail = action.payload;
    // },
    // [getProductById.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
    // // update internal user
    // [updateProduct.pending.toString()]: (state) => {
    //   state.loading = true;
    // },
    // [updateProduct.fulfilled.toString()]: (state) => {
    //   state.loading = false;
    // },
    // [updateProduct.rejected.toString()]: (state) => {
    //   state.loading = false;
    // },
  },
});

export const { resetProductList, setLoadingProduct, setProductList, setProductDetail } =
  inventoryManagementSlice.actions;

export default inventoryManagementSlice.reducer;
