import { CircularProgress, Divider, IconButton } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeftNavination } from "src/components";
import NumberWithIcon from "src/components/input/number-with-icon";
import { Logo, LogoConnextIcons } from "src/components/svgs";
import Link from "next/link";
import { fetchGetDetailPointTopup } from "src/feature/scm-point-topup/action";
import { RootState } from "src/state/store";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import DownloadIcon from "src/components/svgs/download";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./pdf-order";
import ReactToPrint from "react-to-print";
import { useLocationBase } from "src/hooks";
import useGetScreenWidth from "../../../hooks/useGetScreenWidth";
import Image from "next/image";

export function OrderDetail() {
  const { symbol } = useLocationBase();
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const orderDetailRef = useRef<HTMLDivElement>(null);
  const orderDetail = useSelector((state: RootState) => state.scmPoint.orderDetail);
  const { t } = useTranslation("common");
  const screen = useGetScreenWidth();
  useEffect(() => {
    const OrderId = localStorage.getItem("OrderId");
    if (OrderId) {
      dispatch(fetchGetDetailPointTopup(OrderId));
    }
  }, [dispatch]);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const textServer = {
    hello: t`hello`,
    order_has_been_confirmed: t`order_has_been_confirmed`,
    order_detail: t`order_detail`,
    details: t`details`,
    order_number: t`order_number`,
    ship_to: t`ship_to`,
    pickup_location: t`pickup_location`,
    order_summary: t`order_summary`,
    total_product_price: t`total_product_price`,
    more_about_taxes: t`read_more_scm_point_topup`,
    total: t`total`,
    product: t`product`,
    quantity: t`quantity`,
    price: t`price`,
    product_name: t`topup-scm-point`,
    order_id: t`order-id`,
  };
  return (
    <div className="mx-auto w-full sm:w-1216 relative mb-8">
      <div className="sm:block hidden">
        <ModalUserSummaryInfo />
      </div>
      <div className=" block sm:grid grid-cols-12 gap-12 mt-6">
        <div className="col-span-0 sm:col-span-3">
          <LeftNavination />
        </div>
        <div ref={orderDetailRef} className="block sm:col-span-9 p-4">
          <div>
            <div className="flex justify-between items-center">
              <div>
                <LogoConnextIcons />
              </div>
              <div className="flex items-center">
                {isClient && (
                  <PDFDownloadLink
                    className="items-center hidden sm:flex"
                    document={<PDFDocument order={orderDetail} text={textServer} />}
                    fileName={`${orderDetail?.orderNumber}.pdf`}
                  >
                    {({ loading }) =>
                      loading ? (
                        <div className="mr-6">
                          <CircularProgress size={20} />
                        </div>
                      ) : (
                        <IconButton>
                          <DownloadIcon />
                        </IconButton>
                      )
                    }
                  </PDFDownloadLink>
                )}
                <div className="hidden sm:block">
                  {isClient && (
                    <ReactToPrint
                      trigger={() => (
                        <IconButton>
                          <PrintOutlinedIcon className="text-black" />
                        </IconButton>
                      )}
                      content={() => orderDetailRef.current}
                    />
                  )}
                </div>
                <span className="text-xl font-medium">{t`order_detail`}</span>
              </div>
            </div>
            <p className="font-medium text-sm mt-4">
              {t`hello`} {orderDetail.fullName}
            </p>
            <span className="text-sm font-Regular text-brown">
              {orderDetail.paymentState !== "Pending"
                ? t`order_has_been_confirmed_topup`
                : t`order_confirmation_pending`}
            </span>
          </div>

          <div className="mt-6">
            <p className="font-medium">{t`details`}</p>
            <Divider className="mt-6" />
          </div>
          <div className="mt-4 grid sm:grid-cols-5 grid-cols-1">
            <div className="col-span-2">
              <div className="flex mb-4">
                <div className="col-span-3">
                  <span>{t`order-id`}</span>
                </div>
                <div className="font-medium col-span-2 text-orange">
                  <span>&nbsp; {orderDetail.orderNumber}</span>
                </div>
              </div>
              <p className="font-medium">{t`order_summary`}:</p>
              <div className="flex justify-between mt-2">
                <div className="col-span-3">
                  <span className="font-Regular">{t`total_product_price`}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-Regular">
                    {symbol}
                    {new Intl.NumberFormat("en-US").format(orderDetail.total)}
                    .00
                  </span>
                </div>
              </div>

              <Link href="/help-center-3/61bb046f48567dc9f8acd97e">
                <a className="text-0.6875 text-blue hover:text-blue-light mt-4">{t`read_more_scm_point_topup`}</a>
              </Link>
              <Divider className="mt-6" />

              <div className="flex justify-between mt-6">
                <div className="col-span-3">
                  <span className="font-medium text-xl">{t`total`}:</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-xl">
                    {symbol}
                    {new Intl.NumberFormat("en-US").format(orderDetail.total)}.00
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Divider className="mt-6" />
          {screen === "Desktop" && (
            <div className="mt-6 grid-cols-6  sm:grid">
              <table className="col-span-4">
                <tr className="text-sm font-normal">
                  <td>{t`product`}</td>
                  <td className="pl-8">{t`quantity`}</td>
                  <td>{t`price`}</td>
                </tr>
                <tr>
                  <td>
                    <div className="flex">
                      <Logo />
                      <div className="ml-4 flex items-center justify-center">
                        <div>{t`topup-scm-point`}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="h-20 w-32">
                      <div className="mt-14">
                        <NumberWithIcon disabled value={orderDetail.total} />
                      </div>
                    </div>
                  </td>
                  <td className="text-orange">
                    {symbol} {new Intl.NumberFormat("en-US").format(orderDetail.total)}
                  </td>
                </tr>
              </table>
            </div>
          )}
          <div className="block sm:hidden">
            <div className="mb-[9px] sm:mb-0 mt-[25px] sm:mt-0">{t`product`}</div>
            <div className="flex gap-4 sm:mb-4">
              <div className="w-[75px] h-[75px]">
                <Image
                  src="/assets/images/logo.png"
                  alt="logo scm"
                  width={"fit-content"}
                  height={60}
                />
              </div>
              <div>
                <div className="mb-[13px] sm:mb-0">{t`topup-scm-point`}</div>
                <NumberWithIcon
                  stillShowColorTextInput
                  disabled
                  value={orderDetail.total}
                  max={1000000}
                />
                <div className="text-orange mt-[10px] sm:mt-0">
                  {symbol}
                  {new Intl.NumberFormat("en-US").format(orderDetail.total)}
                </div>
              </div>
            </div>
            <Divider className="mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
