import { Fragment, useMemo, useState } from "react";
import { Divider, IconButton } from "@material-ui/core";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import { ButtonMui, ModalConfirm } from "src/components";
import Cart from "src/components/cart/CartInOrderDetail";
import Link from "next/link";
import { LogoConnextIcons } from "src/components/svgs";
import NumberFormatCustome from "src/components/text/number-format";
import {
  makeUrlObjectFromRouteBase,
  routeCheckoutUrl,
  routeMyOrderUrl,
  routeTrackingOrderBase,
} from "src/constants/routes";
import { updateInitialOrder } from "src/feature/checkout/slice";
import { useLocationBase } from "src/hooks";
import ButtonCancelRefund from "src/modules/my-orders/each-order/button-cancel-refund";
import { RootState } from "src/state/store";
import { getAddressFromOrderAddress } from "src/utils";
import { OrderDetailType } from "types/orders";
import IconDownlaodPDF from "./download-pdf";
import { phoneNumberFormatter22 } from "src/lib/format";
import { getOrderDetail } from "src/services/order.services";

interface OrderDetailTProps {
  isOrderDetail?: boolean;
  order: OrderDetailType;
  orderDetailRef: HTMLDivElement | null;
  hideButton?: boolean;
}

export default function OrderDetailView({
  isOrderDetail,
  order,
  orderDetailRef,
  hideButton,
}: OrderDetailTProps) {
  const { t, lang } = useTranslation("common");
  const router = useRouter();
  const { userInfor } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { symbol, tax } = useLocationBase();
  const [isOpenModalTopay, setIsOpenModalTopay] = useState<boolean>(false);


  const handleTrackPackage = () => {
    order && router.push(makeUrlObjectFromRouteBase(routeTrackingOrderBase, { id: order._id }));
  };

  const handleManageOrder = () => {
    router.push(routeMyOrderUrl);
  };

  const handleClickMakePayment = async () => {
    try {
      const res = await getOrderDetail(order._id);
      if (res.status === 200) {
        dispatch(updateInitialOrder(order));
        router.push(routeCheckoutUrl);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response as unknown) {
        if (error.response.status === 404) {
          setIsOpenModalTopay(true);
        }
      }
    }
  };

  const renderButton = () => {
    if (hideButton) {
      return null;
    }

    const status = order.status;
    if (["To Pay", "Pending"].includes(status)) {
      const isPending = order.status === "Pending";
      return (
        <ButtonMui
          disabled={isPending}
          textClassName="text-sm font-normal"
          height={45}
          onClick={handleClickMakePayment}
        >
          {t`make_payment`}
        </ButtonMui>
      );
    }

    if (["To Ship", "To Receive"].includes(status) && order.type !== "Pickup") {
      return (
        <ButtonMui textClassName="text-sm font-normal" height={45} onClick={handleTrackPackage}>
          {t`track_package`}
        </ButtonMui>
      );
    }

    if (status === "To Review") {
      return <ButtonCancelRefund fullWidth />;
    }
  };

  const name = `${userInfor?.firstName} ${userInfor?.lastName}`;
  const branchByLanguage = useMemo(() => {
    if (!order?.pickupAddress) {
      return "";
    }
    const { branch, branchEng } = order?.pickupAddress;
    if (lang === "en" || !branch) {
      return branchEng;
    }
    return branch;
  }, [lang, order.pickupAddress]);
  const addressByLocation = useMemo(() => {
    if (!order?.pickupAddress) {
      return "";
    }
    const { address, addressEng } = order?.pickupAddress;
    if (lang === "en" || !address) {
      return addressEng;
    }
    return address;
  }, [lang, order.pickupAddress]);
  const hoursByLocation = useMemo(() => {
    if (!order?.pickupAddress) {
      return "";
    }
    const { businessHours, businessHoursEng } = order?.pickupAddress;
    if (lang === "en" || !businessHours) {
      return businessHoursEng;
    }
    return businessHours;
  }, [lang, order.pickupAddress]);
  const handleBusinessHour = (businessHours: string): string[] => {
    const resultHour = businessHours.split(",");
    return resultHour;
  };

  const contentPayment = useMemo(() => {
    if (order.status === "Pending") {
      return t`order_confirmation_pending`;
    }
    return isOrderDetail ? t`thank_for_using_service` : t`order_has_been_confirmed`;
  }, [isOrderDetail, order.status, t]);
  console.log(order);
  return (
    <Fragment>
      <div>
        <div className="flex justify-between items-center">
          <div>
            <LogoConnextIcons />
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block">
              {" "}
              {/* {!hideButton && <IconDownlaodPDF order={order} />} */}
            </div>

            <div className="hidden sm:block">
              {" "}
              {!hideButton && (
                <ReactToPrint
                  trigger={() => (
                    <IconButton>
                      <PrintOutlinedIcon className="text-black" />
                    </IconButton>
                  )}
                  content={() => orderDetailRef}
                />
              )}
            </div>
            <span className="text-base sm:text-xl font-medium">{t`order_detail`}</span>
          </div>
        </div>
        <p className="font-medium text-sm mt-4">
          {t`hello`} {name}
        </p>
        <span className="text-sm text-brown">{contentPayment}</span>
        <div className="grid grid-cols-5 mt-4">
          <div className="col-span-5 sm:col-span-2">
            {!hideButton && (
              <ButtonMui
                textClassName="text-sm font-normal"
                height={40}
                onClick={handleManageOrder}
              >{t`manage_order`}</ButtonMui>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium">{t`details`}</p>
        <Divider className="mt-6" />
      </div>

      <div className="mt-4 grid grid-cols-5">
        <div className="col-span-5">
          <div>
            <span className="font-medium mr-2">{t`order_id`}:</span>
            <span className="font-medium text-orange">{order._id}</span>
          </div>



          <>
            <p className="text-sm mt-2 font-medium">{t`ship_to`}:</p>
            <p className="text-sm text-brown">
              {order.shippingAddress &&
                  getAddressFromOrderAddress(order.shippingAddress, lang).address}
            </p>
          </>

        </div>
        <div className="col-span-1" />
        <div className="col-span-5">
          <p className="font-medium">{t`order_summary`}:</p>
          <div className="grid grid-cols-5 mt-2">
            <div className="col-span-3">
              <span>{t`total_product_price`}</span>
            </div>
            <div className="col-span-2">
              <NumberFormatCustome value={order.totalPrice.toFixed(2)} prefix={symbol} />
            </div>
          </div>
          {/* {order.type !== "Pickup" && (
            <div className="grid grid-cols-5 mt-2">
              <div className="col-span-3">
                <span>{t`shipping_fees`}</span>
              </div>
              <div className="col-span-2">
                <NumberFormatCustome value={order.shippingFees.toFixed(2)} prefix={symbol} />
              </div>
            </div>
          )} */}

          <div className="grid grid-cols-5 mt-2">
            <div className="col-span-3">
              <span>{t`taxes`}</span>
            </div>
            <div className="col-span-2">
              <NumberFormatCustome value={(((order.totalPrice) / (1 + tax)) * tax).toFixed(2)} prefix={symbol} />
            </div>
          </div>
          {"(10% total bill)"}
          <Divider className="mt-6" />
          <div className="grid grid-cols-5 mt-6">
            <div className="col-span-3">
              <span className="font-medium text-xl">{t`total`}:</span>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-xl">
                <NumberFormatCustome value={order.totalPrice.toFixed(2)} prefix={symbol} />
              </span>
            </div>
          </div>

        </div>
      </div>

      <Divider className="mt-6" />
      <div className="mb-6">
        {/* <Cart products={order.products} disabledClickProduct /> */}
      </div>

      {!hideButton && renderButton()}


      <ModalConfirm
        open={isOpenModalTopay}
        confirmType="unable-delete"
        message={t`this_order_id_no_longer_exists`}
        onConfirm={handleManageOrder}
      />
    </Fragment>
  );
}
