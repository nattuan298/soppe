import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Cart from "src/components/cart/CartInOrderDetail";
import { RootState } from "src/state/store";

export default function Step1() {
  const {
    listProducts,
    callingListProduct,

  } = useSelector((state: RootState) => state.cart);
  return (
    <div className="relative">
      <Cart products={listProducts} disabledClickProduct />
      {callingListProduct && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
