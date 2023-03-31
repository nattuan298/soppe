import useTranslation from "next-translate/useTranslation";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import DialogCustome from "src/components/dialog";
import { routeCartUrl } from "src/constants/routes";
import { handleChangeField } from "src/feature/shopping-cart/slice";
import { RootState } from "src/state/store";

export default function General() {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { errorWhenAddProduct } = useSelector((state: RootState) => state.cart);

  const handleCloseModalErrorCart = () => {
    dispatch(handleChangeField({ errorWhenAddProduct: false }));
  };
  const handleConfirmModalErrorCart = () => {
    dispatch(handleChangeField({ errorWhenAddProduct: false }));
    router.push(routeCartUrl);
  };

  return (
    <div>
      <DialogCustome
        open={errorWhenAddProduct}
        handleClose={handleCloseModalErrorCart}
        handleConfirm={handleConfirmModalErrorCart}
        buttonConfirmTite={t`view_cart`}
      >
        <div className="text-center mb-8 mt-6 text-sm">{t`too_more_product_in_cart`}</div>
      </DialogCustome>
    </div>
  );
}
