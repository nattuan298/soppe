import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonMuiLight } from "src/components";
import Cart from "src/components/cart";
import DialogCustome from "src/components/dialog";
import { routeCheckoutUrl, routeSigninUrl } from "src/constants/routes";
import { notifyToast } from "src/constants/toast";
import { fetchCheckoutCreateOrder } from "src/feature/checkout/action";
import {
  deleteProduct,
  updateQtyProduct,
  updateSelectedProduct,
} from "src/feature/shopping-cart/slice";

import useLoggedIn from "src/hooks/useLoggedIn";
import { RootState } from "src/state/store";
import ModalOrderSummary from "./modal";
import { handleChangeField } from "../../feature/checkout/thunkAction";

export default function ShoppingCart() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const {
    listProducts,
    callingListProduct,
    selectedProduct: selected,
  } = useSelector((state: RootState) => state.cart);
  const { priceFieldName, isLoggedIn } = useLoggedIn();
  const router = useRouter();
  const [callingAPI, setcallingAPI] = useState(false);
  const [openModalSignIn, setopenModalSignIn] = useState(false);
  // const activeListProduct = listProducts.filter((item) => item.status === "Active");
  // const notActiveListProduct = listProducts.filter((item) => item.status !== "Active");

  useEffect(() => {
    dispatch(updateSelectedProduct(listProducts.map((item) => item._id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const total = useMemo(
    () =>
      listProducts.reduce(
        ({ price, qty }, item) => {
          if (!selected.includes(item._id)) {
            return {
              price,
              qty,
            };
          }
          return {
            price: price + item.qty * item.price,
            qty: qty + item.qty,
          };
        },
        { price: 0, pv: 0, qty: 0 },
      ),
    [listProducts, selected],
  );

  const handleChangeSelected = (val: string[]) => {
    dispatch(updateSelectedProduct(val));
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct({ id }));
    dispatch(updateSelectedProduct(selected.filter((item) => item !== id)));
  };

  const handleChangeQty = (params: { qty: number; id: string }) => {
    dispatch(updateQtyProduct(params));
  };

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      return setopenModalSignIn(true);
    }


    // setcallingAPI(true);
    const checkoutProduct = listProducts.filter((item) => selected.includes(item._id));

    await dispatch(handleChangeField({
      totalPrice: total.price,
      totalQty: total.qty,
      checkoutProducts: checkoutProduct,
    }));

    setTimeout(() => {
      router.push(routeCheckoutUrl);

    }

    , 1000);
    // const callbackCreateOrder = (res: {
    //   error?: { message?: string };
    //   payload?: string;
    //   type?: string;
    // }) => {
    //   if (res.type === "checkout/createOrder/fulfilled") {
    //     localStorage.setItem(
    //       "needToRemoveProduct",
    //       JSON.stringify(checkoutProduct.map((item) => item._id)),S
    //     );
    //     return;
    //   }

    //   if (res.error && res.payload) {
    //     notifyToast("error", res.payload);
    //   }
    //   setcallingAPI(false);
    // };
    // dispatch(fetchCheckoutCreateOrder({ checkoutProduct, callback: callbackCreateOrder }));

    // const res = (await dispatch(createOrder(checkoutProduct))) as {
    //   error?: { message?: string };
    //   payload?: string;
    //   type?: string;
    // };

    // if (res.type === "checkout/createOrder/fulfilled") {
    //   localStorage.setItem(
    //     "needToRemoveProduct",
    //     JSON.stringify(checkoutProduct.map((item) => item.productCode)),
    //   );
    //   return router.push(routeCheckoutUrl);
    // }

    // if (res.error && res.payload) {
    //   notifyToast("error", res.payload);
    // }
    // setcallingAPI(false);
  };

  const handleCloseModal = () => {
    setopenModalSignIn(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    router.push(routeSigninUrl);
  };

  return (
    <div className="mx-auto sm:w-1216 w-full relative mb-8">
      <div className="grid grid-cols-10 mt-4 p-2 sm:p-0">
        <div className="col-span-10 sm:col-span-7 ">
          <div className="relative">
            <Cart
              products={listProducts}
              onClickDelete={handleDeleteProduct}
              handleChangeQty={handleChangeQty}
              handleChangeSelected={handleChangeSelected}
              selected={selected}
              showPublicPrice={isLoggedIn}
              productsError={[]}
            />
            {callingListProduct && (
              <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <CircularProgress />
              </div>
            )}
          </div>

          <div className="sm:block hidden">
            <ButtonMuiLight
              className="mt-7"
              disabled={selected.length === 0 || callingAPI}
              showCircle={callingAPI}
              onClick={handleCheckout}
            >
              {t`make_payment`}
            </ButtonMuiLight>
          </div>

          <DialogCustome
            open={openModalSignIn}
            handleClose={handleCloseModal}
            handleConfirm={handleConfirmModal}
          >
            <div className="text-center mb-8 mt-6 text-sm">{t`sign_in_to_use`}</div>
          </DialogCustome>
        </div>

        <div className="col-span-3 sm:flex justify-end">
          <div className="relative -top-20" style={{ height: "calc(100% + 96px)" }}>
            <ModalOrderSummary
              totalPrice={total.price}
              totalPV={0}
              totalQty={total.qty}
              buttonTitle={t`make_payment`}
              disabledButton={selected.length === 0 || callingAPI}
              onClickPayment={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
