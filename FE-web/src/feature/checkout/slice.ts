import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
import { getAddressFromOrderAddress } from "src/utils";
import { ItemArraySelect } from "../signup/type";
import { handleChangeField, saveStore } from "./thunkAction";
import { AddressBook, CheckoutState, ItemBranch } from "./type";
import { OrderDetailType } from "types/orders";
import dayjs from "dayjs";

const initalValueCity = { id: "", title: "" };

const initialState: CheckoutState = {
  mainStep: 0,
  shippingType: "Ship to address",
  country: "Thailand",
  paymentMethod: "QR code",
  listAddress: [],
  address: "",
  billingAddress: "",
  checkoutProducts: [],
  callingListProduct: false,
  loadingAddressPickup: false,
  listCity: [],
  city: initalValueCity,
  listBranch: [],
  branch: initalValueCity,
  callingAPI: false,
  shippingFee: 0,
  totalPrice: 0,
  totalQty: 0,
  totalWeight: 0,
  totalPV: 0,
  realAddress: [],
  orderId: "",
  sa_type: "ROC",
  orderNumber: "",
  chargeId: "",
  paymentStatusForNonSecure: "",
  locationBase: "",
  addressNewCreate: false,
  addAddressFrom: "",
  coupon: "",
  preProducts: [],
  couponRedeemAmount: 0,
  discountCategory: "",
  couponDraft: "",
  orderIdForQR: "",
  pcode: [],
  price: [],
  isOpenModalTopay: false,
  isRemarked: false,
};

export const actionGetDataFromLocalStore = createAction<CheckoutState>(
  "checkout/actionGetDataFromLocalStore",
);
export const actionCallAPIPending = createAction("checkout/actionCallAPIPending");
export const resetStateCheckout = createAction("checkout/resetState");

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    clickNext: (state) => {
      state.mainStep += 1;
      localStorage.setItem("stateCheckout", JSON.stringify(state));
    },
    clickBack: (state) => {
      state.mainStep -= 1;
      localStorage.setItem("stateCheckout", JSON.stringify(state));
    },
    updateInitialOrder: (state, { payload }: PayloadAction<OrderDetailType>) => {
      const total = payload.products.reduce(
        ({ weight }, item) => {
          return {
            weight: weight + item.quantity * item.weight,
          };
        },
        { weight: 0 },
      );

      state.totalPrice = payload.totalPrice;
      state.totalPV = payload.totalPv;
      state.totalQty = payload.totalQuantity;
      state.totalWeight = payload.totalWeight || total.weight;
      state.checkoutProducts = payload.products;
      state.orderId = payload._id;
      state.orderNumber = payload.orderNumber;
      state.shippingFee = payload.shippingFees || 0;
      state.shippingType = payload.type;
      state.mainStep = 0;
      localStorage.setItem("stateCheckout", JSON.stringify(state));
    },
    resetShippingFees: (state) => {
      state.shippingFee = 0;
      state.mainStep += 1;
      state.pcode = [];
      state.price = [];
      localStorage.setItem("stateCheckout", JSON.stringify(state));
    },
    getListBranchPending: (state) => ({
      ...state,
      loadingAddressPickup: true,
    }),
    getListBranchFulfilled: (state, { payload }: PayloadAction<ItemBranch[]>) => {
      return {
        ...state,
        listBranch: payload,
        loadingAddressPickup: false,
        branch: initalValueCity,
      };
    },
    getListBranchRejected: (state) => ({
      ...state,
      loadingAddressPickup: false,
    }),
    getListCityPending: (state) => {
      return {
        ...state,
        loadingAddressPickup: true,
      };
    },
    getListCityRejected: (state) => {
      return {
        ...state,
        loadingAddressPickup: false,
      };
    },
    getListCityFulfilled: (state, { payload }: PayloadAction<ItemArraySelect[]>) => {
      let newCity = initalValueCity;
      if (state.country === "Thailand") {
        const BangkokCity = payload.find((item) => item.nameEng === "Bangkok");
        if (BangkokCity) {
          newCity = {
            id: BangkokCity._id,
            title: BangkokCity.nameEng,
          };
        }
      }
      return {
        ...state,
        listCity: payload,
        loadingAddressPickup: false,
        city: newCity,
        branch: initalValueCity,
        listBranch: [],
      };
    },
    getListAddressFulfilled: (state, { payload }: PayloadAction<AddressBook[]>) => {
      const convertData = payload
        .filter((item) => item.country === "Thailand")
        .map((item) => ({
          infor: getAddressFromOrderAddress(item).userInfor,
          address: getAddressFromOrderAddress(item).address,
          addressEng: getAddressFromOrderAddress(item, "en").address,
          value: item._id,
          billAddress: item.billAddress,
          shipAddress: item.shipAddress,
          provinceId: item.provinceId,
          createdAt: item.createdAt,
        }));

      let address = convertData.find((item) => item.shipAddress) || convertData[0];
      let billingAddress = convertData.find((item) => item.billAddress) || convertData[0];

      if (state.addressNewCreate) {
        const sortArray = convertData.sort(
          (item1, item2) => dayjs(item2.createdAt).valueOf() - dayjs(item1.createdAt).valueOf(),
        );

        if (state.addAddressFrom === "shipping") {
          address = sortArray[0];
        }

        if (state.addAddressFrom === "billing") {
          billingAddress = sortArray[0];
        }
      }
      const addressState = state.mainStep === 2 ? state.address : address?.value || "";
      const billingAddressState =
        state.mainStep === 2 ? state.address : billingAddress?.value || "";

      return {
        ...state,
        listAddress: convertData,
        address: addressState,
        billingAddress: billingAddressState,
        realAddress: payload,
        addAddressFrom: "",
        addressNewCreate: false,
      };
    },
    getShippingFeesPending: (state) => {
      return {
        ...state,
        callingAPI: true,
      };
    },
    getShippingFeesRejected: (state) => {
      return {
        ...state,
        callingAPI: false,
      };
    },
    getShippingFeesFulfilled: (
      state,
      {
        payload,
      }: PayloadAction<{
        totalShippingFees: number;
        pcode: Array<string>;
        price: Array<number>;
      }>,
    ) => {
      const newState = {
        ...state,
        callingAPI: false,
        mainStep: state.mainStep + 1,
        shippingFee: payload.totalShippingFees,
        pcode: payload.pcode,
        price: payload.price,
      };
      localStorage.setItem("stateCheckout", JSON.stringify(newState));
      return newState;
    },
    updateOrderPending: (state) => {
      return {
        ...state,
        callingAPI: true,
      };
    },
    updateOrderRejected: (state) => {
      return {
        ...state,
        callingAPI: false,
      };
    },
    updateOrderFulfilled: (state) => {
      return {
        ...state,
        callingAPI: false,
      };
    },
    createOrderFulfilled: (state, { payload }: PayloadAction<OrderDetailType>) => {
      const checkoutProducts = payload.products.map((item) => {
        const oldProduct = state.preProducts.find(
          (item2) => item2.productCode === item.productCode,
        );

        const hasChangeprice = oldProduct?.price !== item.price;
        const hasChangePV = oldProduct?.pv !== item.pv;

        return { ...item, hasChangeprice, hasChangePV };
      });
      const newState = {
        ...state,
        checkoutProducts,
        orderId: payload._id,
        orderNumber: payload.orderNumber,
        shippingFee: payload.shippingFees,
        mainStep: 0,
        shippingType: "Ship to address",
        chargeId: "",
        totalPrice: payload.totalPrice,
        totalPV: payload.totalPv,
        totalQty: payload.totalQuantity,
        totalWeight: payload.totalWeight,
        locationBase: payload.locationBase,
        country: payload.locationBase,
        preProducts: [],
      };

      localStorage.setItem("stateCheckout", JSON.stringify(newState));

      return newState;
    },
    createOrderRejected: (state) => {
      return {
        ...state,
        preProducts: [],
      };
    },
    getListAddressScreenAddressFulfilled: (
      state,
      { payload }: PayloadAction<{ data: AddressBook[] }>,
    ) => {
      const convertData = payload.data
        .map((item) => ({
          infor: getAddressFromOrderAddress(item).userInfor,
          address: getAddressFromOrderAddress(item).address,
          addressEng: getAddressFromOrderAddress(item, "en").address,
          value: item._id,
          billAddress: item.billAddress,
          shipAddress: item.shipAddress,
          provinceId: item.provinceId,
        }));

      return {
        ...state,
        listAddress: convertData,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleChangeField, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(saveStore, (state) => {
        localStorage.setItem("stateCheckout", JSON.stringify(state));
        return state;
      })
      .addCase(actionGetDataFromLocalStore, (_, { payload }) => {
        return payload;
      })
      // save list address when call fetch address from address-book page
      .addCase(resetStateCheckout, () => {
        return initialState;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  clickNext,
  clickBack,
  updateInitialOrder,
  resetShippingFees,
  getListBranchFulfilled,
  getListBranchPending,
  getListBranchRejected,
  getListCityFulfilled,
  getListCityPending,
  getListCityRejected,
  getListAddressFulfilled,
  getShippingFeesFulfilled,
  getShippingFeesPending,
  getShippingFeesRejected,
  updateOrderFulfilled,
  updateOrderPending,
  updateOrderRejected,
  createOrderFulfilled,
  createOrderRejected,
  getListAddressScreenAddressFulfilled,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
