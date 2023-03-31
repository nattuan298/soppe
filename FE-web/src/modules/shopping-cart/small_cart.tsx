import CloseIcon from "@material-ui/icons/Close";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import NumberFormat from "";
import { ButtonMui } from "src/components";
import DialogCustome from "src/components/dialog";
import NumberFormatCustome from "src/components/text/number-format";
import { routeCartUrl, routeCheckoutUrl, routeSigninUrl } from "src/constants/routes";
import { notifyToast } from "src/constants/toast";
import { closeSmallCart, deleteProduct, updateQtyProduct } from "src/feature/shopping-cart/slice";
import useLoggedIn from "src/hooks/useLoggedIn";
import { RootState } from "src/state/store";
import Row from "./row-small-cart";
import styles from "./style.module.css";
import { fetchCheckoutCreateOrder } from "src/feature/checkout/action";
import { useLocationBase } from "src/hooks";

export default function SmallCart() {
  const { t } = useTranslation("common");
  const [openDetail, setOpenDetail] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [openModalSignIn, setopenModalSignIn] = useState(false);
  const [callingAPI, setcallingAPI] = useState(false);
  const { symbol } = useLocationBase();

  const { isLoggedIn, priceFieldName } = useLoggedIn();

  const { isOpenSmallCart, listProducts } = useSelector((state: RootState) => state.cart);
  const totalPrice = listProducts.reduce(
    ({ price, pv }, item) => ({
      price: price + item.qty * item[priceFieldName],
      pv: pv + item.qty * item.pv,
    }),
    { price: 0, pv: 0 },
  );

  const toggleOpen = () => {
    setOpenDetail((preState) => !preState);
  };

  const goToShoppingCart = () => {
    router.push(routeCartUrl);
  };

  const onClickMakePayment = async () => {
    if (!isLoggedIn) {
      return setopenModalSignIn(true);
    }
    setcallingAPI(true);
    const callbackCreateOrder = (res: {
      error?: { message?: string };
      payload?: string;
      type?: string;
    }) => {
      if (res.type === "checkout/createOrder/fulfilled") {
        localStorage.setItem(
          "needToRemoveProduct",
          JSON.stringify(listProducts.map((item) => item.productCode)),
        );
        return router.push(routeCheckoutUrl);
      }

      if (res.error && res.payload) {
        notifyToast("error", res.payload);
      }
      setcallingAPI(false);
    };
    dispatch(
      fetchCheckoutCreateOrder({ checkoutProduct: listProducts, callback: callbackCreateOrder }),
    );
  };

  const closeShoppingCart = () => {
    setOpenDetail(false);
    dispatch(closeSmallCart());
  };

  const handleChangeQty = (id: string) => (qty: number) => {
    dispatch(updateQtyProduct({ qty, id }));
  };

  const handleDeleteProduct = (id: string) => () => {
    dispatch(deleteProduct({ id }));
  };

  const handleCloseModal = () => {
    setopenModalSignIn(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    router.push(routeSigninUrl);
  };

  if (!isOpenSmallCart || listProducts.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.container} fixed bottom-0 sm:right-small-cart`}>
      {openDetail && (
        <div className="p-4">
          <span className="font-medium">{t`shoppingCart`}</span>

          <div className="mt-2">
            <div className="signup-confirm-container overflow-y-auto" style={{ maxHeight: 465 }}>
              {listProducts.map((product) => (
                <div>
                  <Row
                    key={product.productCode}
                    product={product}
                    onChange={handleChangeQty(product.productCode)}
                    handleRemoveItem={handleDeleteProduct(product.productCode)}
                  />
                </div>
              ))}
            </div>

            <ButtonMui
              onClick={onClickMakePayment}
              className="mt-4"
              textClassName="font-normal"
              height={45}
              disabled={callingAPI}
              showCircle={callingAPI}
            >{t`make_payment`}</ButtonMui>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <div className="flex items-center pl-6 pr-6 h-full w-full justify-between">
          <div className="flex items-center justify-start flex-wrap">
            <span className="text-orange text-lg justify-between mr-2">
              {t`total`}:
              <NumberFormatCustome value={totalPrice.price} prefix={symbol} className="ml-2" />
            </span>
            {isLoggedIn && (
              <span className="text-lg text-brown">
                PV:
                <NumberFormatCustome value={totalPrice.pv} className="ml-2" />
              </span>
            )}
          </div>
          <div className="flex items-center">
            <div className="w-9 h-9 rounded-full bg-lighterGray flex items-center justify-center mr-3 cursor-pointer">
              {!openDetail && (
                <KeyboardArrowDownIcon
                  fontSize="small"
                  onClick={toggleOpen}
                  className="text-orange"
                />
              )}
              {openDetail && (
                <KeyboardArrowUpIcon
                  fontSize="small"
                  onClick={toggleOpen}
                  className="text-orange"
                />
              )}
            </div>
            <div
              className="w-9 h-9 rounded-full bg-orange flex items-center justify-center mr-3 cursor-pointer"
              onClick={goToShoppingCart}
            >
              <ShoppingCartIcon className="text-white" fontSize="small" />
            </div>
            <CloseIcon
              className="text-lighterGray cursor-pointer"
              fontSize="small"
              onClick={closeShoppingCart}
            />
          </div>
        </div>
      </div>

      <DialogCustome
        open={openModalSignIn}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
      >
        <div className="text-center mb-8 mt-6 text-sm">{t`sign_in_to_use`}</div>
      </DialogCustome>
    </div>
  );
}
