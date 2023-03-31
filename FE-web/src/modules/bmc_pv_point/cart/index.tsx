import { Divider } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import router from "next/router";
import { useDispatch } from "react-redux";
import { ButtonMui } from "src/components";
import Link from "src/components/text/link";
import NumberFormatCustome from "src/components/text/number-format";
import {
  makeUrlObjectFromRouteBase,
  routeCheckoutUrl,
  routeMyOrderDetailBase,
  routeTrackingOrderBase,
} from "src/constants/routes";
import { updateInitialOrder } from "src/feature/checkout/slice";
import ButtonCancelRefund from "src/modules/my-orders/each-order/button-cancel-refund";
import { OrderDetailType } from "types/orders";
import Header from "./header";
import RowCart from "./row_cart";

export default function EachOrder({ order }: { order: OrderDetailType }) {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const status: string = order.status;

  const handleClickFullDetail = () => {
    router.push(makeUrlObjectFromRouteBase(routeMyOrderDetailBase, { id: order._id }));
  };

  const handleClickMakePayment = () => {
    dispatch(updateInitialOrder(order));
    router.push(routeCheckoutUrl);
  };

  const handleClickTrackPackage = () => {
    router.push(makeUrlObjectFromRouteBase(routeTrackingOrderBase, { id: order._id }));
  };

  const total = order.products.reduce(
    ({ pv, qty }, item) => {
      return {
        pv: pv + item.quantity * item.pv,
        qty: qty + item.quantity,
      };
    },
    { pv: 0, qty: 0 },
  );

  return (
    <div className="pt-0 sm:pt-4">
      <Header id={order.orderNumber} handleClickFullDetail={handleClickFullDetail} />

      {order.products.map((item) => (
        <RowCart key={item.productCode} product={item} orderId={order._id} saType={order.saType} />
      ))}

      <div className="flex justify-between items-center mt-4 flex-row-reverse">
        <div className="flex">
          <span className="mr-3 text-brown">
            {t`total_pv`} {`(${total.qty} ${t`items`})`}:
          </span>
          <NumberFormatCustome className="text-brown" value={total.pv} suffix=" PV" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Link
          className="text-sm invisible"
          onClick={handleClickFullDetail}
        >{t`view_full_details`}</Link>

        {["To Pay", "Pending"].includes(status) && (
          <ButtonMui
            height={35}
            textClassName="font-normal text-sm"
            style={{ width: 150 }}
            onClick={handleClickMakePayment}
            disabled={status === "Pending"}
          >
            {t`make_payment`}
          </ButtonMui>
        )}

        {["To Ship", "To Receive"].includes(status) && (
          <ButtonMui
            height={35}
            textClassName="font-normal text-sm"
            style={{ width: 150 }}
            onClick={handleClickTrackPackage}
          >
            {t`track_package`}
          </ButtonMui>
        )}

        {["Complete", "To Review"].includes(status) && <ButtonCancelRefund />}
      </div>

      <Divider className="mt-4" />
    </div>
  );
}
