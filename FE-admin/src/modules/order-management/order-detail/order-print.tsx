import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ReactToPrint from "react-to-print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getParams } from "src/store/router-params.slice";
import { FormatNumber } from "src/lib/format-number";
import { phoneNumberFormatter } from "src/lib/format";
import { fetchOrderDetailByID } from "src/store/order.action";
import { ParamsType } from "src/types/params.model";
import { Logo } from "src/components/svg";
import { DownloadIcon, PrinterIcon } from "src/components/icons";
import { Button, ButtonLink } from "src/components";
import ProductCard from "./product-card";
import ProductQuantity from "./product-quantity";
import { useStyles } from "./styles";
import "./styles.css";
import { Address, OrderModel } from "src/types/order.model";
import PDFDocument from "./pdf-document";

interface OrderPrintProps {
  orderDetail: OrderModel;
}

export default function OrderPrint({ orderDetail }: OrderPrintProps) {
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const { id } = useParams<ParamsType>();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { tableHeadCell, tableBodyCell } = useStyles();

  const orderDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(getParams(id));
    dispatch(fetchOrderDetailByID(id));
  }, [dispatch, id]);

  function getShippingAddress(shippingAddress: Address): string {
    if (shippingAddress) {
      return `${shippingAddress.address}, 
    ${shippingAddress.subDistrict}, 
    ${shippingAddress.district}, 
    ${shippingAddress.province}, 
    ${shippingAddress.postalCode} ${shippingAddress.country}`;
    }
    return "";
  }

  return (
    <div className="order-detail mx-auto">
      <div ref={orderDetailRef} className="px-10" style={{ fontFamily: "Kanit" }}>
        <div className="detail-border-bottom pb-3">
          <div className="flex justify-between items-center mb-12">
            <Logo width="70" height="30" />

            <div className="flex items-center">
              {!isPrinting ? (
                <>
                  <PDFDownloadLink
                    className="flex items-center"
                    document={<PDFDocument order={orderDetail} />}
                    fileName={`${orderDetail?.orderNumber}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? (
                        <div className="mr-6">
                          <CircularProgress size={20} />
                        </div>
                      ) : (
                        <Button className="p-0 mr-6" variant="text">
                          <DownloadIcon />
                        </Button>
                      )
                    }
                  </PDFDownloadLink>
                  <ReactToPrint
                    trigger={() => (
                      <Button className="p-0 mr-6" variant="text">
                        <PrinterIcon />
                      </Button>
                    )}
                    content={() => orderDetailRef.current}
                    onBeforeGetContent={() => setIsPrinting(true)}
                  />
                </>
              ) : null}

              <p className="font-medium text-lg">{t("order-detail")}</p>
            </div>
          </div>
          <p>{t("details")}</p>
        </div>
        <div className="order-detail-info pt-4 detail-border-bottom flex justify-between">
          <div className="w-1/3">
            <p className="font-medium mb-4">
              {t("order-id")}: <span className="text-orange-light">{orderDetail?.orderNumber}</span>
            </p>
            <div className="ship-to mb-4">
              <p className="text-sm font-medium">{t("ship-to")}</p>
              {orderDetail.shippingAddress && (
                <>
                  <p className="font-medium">
                    {`${orderDetail?.shippingAddress?.firstName} ${orderDetail?.shippingAddress?.lastName}`}{" "}
                    (
                    {phoneNumberFormatter(
                      orderDetail?.shippingAddress?.phoneCode,
                      orderDetail?.shippingAddress?.phoneNumber,
                    )}
                    )
                  </p>
                  <p className="text-gray-dark text-sm">
                    {getShippingAddress(orderDetail?.shippingAddress)}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="w-1/3">
            <p className="font-medium mb-2">{t("order-summary")}:</p>
            <div className="summary detail-border-bottom pb-5">
              <div className="flex mb-2">
                <p className="w-2/3">{t("total-product-price")}</p>
                <p className="w-1/3">
                  ฿ <FormatNumber value={orderDetail.totalProductPrice} />
                </p>
              </div>
              <div className="flex mb-2">
                <p className="w-2/3">{t("shipping-fees")}</p>
                <p className="w-1/3">
                  ฿ <FormatNumber value={Math.round(orderDetail.shippingFees * 100) / 100} />
                </p>
              </div>
              <div className="flex mb-2">
                <p className="w-2/3">{t("taxes")}</p>
                <p className="w-1/3">
                  ฿ <FormatNumber value={Math.round(orderDetail.taxes * 100) / 100} />
                </p>
              </div>

              <a
                className="text-xs text-blue"
                href="https://scmconnext.com/help-center-3/61b1844b133b46494dc544b3"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("click-read-more-taxes")}
              </a>
            </div>

            <div className="py-5 flex detail-border-bottom">
              <p className="text-xl font-medium w-2/3 text-black-primary">{t("total")}</p>
              <p className="text-xl font-medium w-1/3 text-black-primary">
                ฿ <FormatNumber value={orderDetail.totalPrice} />
              </p>
            </div>

            <div className="py-6 flex">
              <p className="text-gray-dark font-medium w-2/3">{t("total-received-pv")}</p>
              <p className="text-gray-dark font-medium w-1/3">
                <FormatNumber value={orderDetail.totalPv} /> PV
              </p>
            </div>
          </div>
        </div>
        <div className="order-product pt-6 flex mb-7">
          <Table>
            <TableHead>
              <TableCell className={tableHeadCell}>{t("product")}</TableCell>
              <TableCell className={tableHeadCell} align="center">
                {t("quantity")}
              </TableCell>
              <TableCell className={tableHeadCell} align="center">
                {t("price")}
              </TableCell>
              <TableCell className={tableHeadCell} align="center">
                {t("received-pv")}
              </TableCell>
            </TableHead>
            <TableBody>
              {orderDetail.products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className={tableBodyCell}>
                    <ProductCard image={product.productImage} name={product.productName} />
                  </TableCell>
                  <TableCell className={tableBodyCell}>
                    <ProductQuantity quantity={product.quantity} />
                  </TableCell>
                  <TableCell className={tableBodyCell} align="center">
                    <span className="text-orange-light text-base">
                      ฿ <FormatNumber value={product.price} />
                    </span>
                  </TableCell>
                  <TableCell className={tableBodyCell} align="center">
                    <span className="text-gray-dark text-base">
                      <FormatNumber value={product.pv} /> PV
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="px-10">
        <ButtonLink
          to={`/admin-dashboard/order-management/order-tracking/${id}`}
          className="bg-orange-light text-white hover:bg-orange-hover w-full px-3 py-2"
          variant="text"
          disabled={
            orderDetail.status !== "To Ship" &&
            orderDetail.status !== "Complete" &&
            orderDetail.status !== "To Received" &&
            orderDetail.status !== "To Review"
          }
        >
          {t("track-package")}
        </ButtonLink>
      </div>
    </div>
  );
}
