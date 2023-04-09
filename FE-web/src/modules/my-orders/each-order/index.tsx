import { Divider } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonMui } from "src/components";
import Link from "src/components/text/link";
import NumberFormatCustome from "src/components/text/number-format";
import {
  makeUrlObjectFromRouteBase,
  routeCheckoutUrl,
  routeMyOrderDetailBase,
  routeTrackingOrderBase,
} from "src/constants/routes";
import { updateInitialOrder } from "src/feature/checkout/slice";
import { useLocationBase } from "src/hooks";
import { checkProduct, getOrderDetail } from "src/services/order.services";
import { OrderDetailType } from "types/orders";
import ButtonCancelRefund from "./button-cancel-refund";
import EachProduct from "./each-product";
import Header from "./header";

export default function EachOrder({
  order,
  handleCheckFail,
  handleDeleteToPayOrder,
}: {
  order: OrderDetailType;
  handleCheckFail: (
    err: number,
    message: string,
    order?: OrderDetailType,
    scmStatusErrorCode?: string,
  ) => void;
  handleDeleteToPayOrder: (id: string) => void;
}) {
  const router = useRouter();
  const { t } = useTranslation("common");

  const status: string = order.orderStatus;
  const dispatch = useDispatch();
  const { symbol } = useLocationBase();
  const total = order.products.reduce(
    ({ price, pv, qty }, item) => {
      return {
        price: price + item.quantity * item.price,
        pv: pv + item.quantity * item.pv,
        qty: qty + item.quantity,
      };
    },
    { price: 0, pv: 0, qty: 0 },
  );

  const handleClickFullDetail = async () => {
    try {
      const res = await getOrderDetail(order._id);
      if (res.status === 200) {
        router.push(makeUrlObjectFromRouteBase(routeMyOrderDetailBase, { id: order._id }));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response as unknown) {
        handleCheckFail(
          error.response.status,
          error.response.data.message,
          order,
          error.response.data.scmStatusErrorCode,
        );
      }
    }
  };

  const handleClickTrackPackage = () => {
    router.push(makeUrlObjectFromRouteBase(routeTrackingOrderBase, { id: order._id }));
  };

  const handleClickMakePayment = async () => {
    try {
      const res = await checkProduct(order._id);
      if (res.status === 200) {
        handleCheckFail(res.status, "");
        dispatch(updateInitialOrder(order));
        router.push(routeCheckoutUrl);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response as unknown) {
        handleCheckFail(
          error.response.status,
          error.response.data.message,
          order,
          error.response.data.scmStatusErrorCode,
        );
      }
    }
  };

  const handleDelete = () => {
    handleDeleteToPayOrder(order._id);
  };

  return (
    <>
      <div className="sm:pt-4">
        <Header
          id={order._id}
          status={status}
          handleClickFullDetail={handleClickFullDetail}
        />
        {order.products.map((item) => (
          <EachProduct
            key={item._id}
            product={item}
            orderStatus={order.status}
            orderNumber={order._id}
          />
        ))}

        <div className=" sm:flex justify-between items-center sm:mt-4">
          <div className="flex sm:justify-start justify-end">
            <span className="mr-3">
              {t`total`} ({total.qty} {t`items`}):
            </span>
            <NumberFormatCustome value={total.price} prefix={symbol} />
          </div>


        </div>

        <div className="flex justify-between items-center mt-4">
          {!["To Pay", "Pending"].includes(status) && (
            <Link className="text-sm invisible">{t`view_full_details`}</Link>
          )}

          {["To Pay", "Pending"].includes(status) && (
            <Fragment>
              <Button
                className={`font-normal text-sm text-red border-none ${
                  status === "Pending" && "invisible"
                }`}
                onClick={handleDelete}
                disabled={status === "Pending"}
              >{t`delete`}</Button>
              <ButtonMui
                height={35}
                textClassName="font-normal text-sm"
                style={{ width: 150 }}
                onClick={handleClickMakePayment}
                disabled={status === "Pending"}
              >
                {t`make_payment`}
              </ButtonMui>
            </Fragment>
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
    </>
  );
}
