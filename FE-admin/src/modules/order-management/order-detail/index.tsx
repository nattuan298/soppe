import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { LOCALBASE, getSymbolCurrencyLocalbase, phoneNumberFormatter } from "src/lib/format";
import { fetchOrderDetailByID } from "src/store/order.action";
import { ParamsType } from "src/types/params.model";
import { DownloadIcon, LogoConnext, PrinterIcon } from "src/components/icons";
import { Button, ButtonLink, CollapsibleBlock } from "src/components";
import ProductCard from "./product-card";
import ProductQuantity from "./product-quantity";
import { useStyles } from "./styles";
import "./styles.css";
import { RootState } from "src/store";
import { Address } from "src/types/order.model";
import dummyImg from "src/assets/img/dummy-img.png";

export default function OrderDetail() {
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const { id } = useParams<ParamsType>();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("common");
  const { tableHeadCell, tableBodyCell } = useStyles();
  const { orderDetail, errorMessage } = useSelector((state: RootState) => state.orders);
  const history = useHistory();

  const orderDetailRef = useRef<HTMLDivElement>(null);
  const { language } = i18n;

  useEffect(() => {
    dispatch(getParams(id));
    dispatch(fetchOrderDetailByID(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (errorMessage === "404") {
      history.push("/error-404-not-found");
    }
  }, [errorMessage]);

  function getShippingAddress(shippingAddress: Address): string {
    if (shippingAddress) {
      if (language === "en" || !shippingAddress.province) {
        return `${shippingAddress.address}, 
          ${shippingAddress.subDistrictEng}, 
          ${shippingAddress.districtEng}, 
          ${shippingAddress.provinceEng}, 
          ${shippingAddress.postalCode} ${shippingAddress.country}`;
      }
      return `${shippingAddress.address}, 
    ${shippingAddress.subDistrict}, 
    ${shippingAddress.district}, 
    ${shippingAddress.province}, 
    ${shippingAddress.postalCode} ${shippingAddress.country}`;
    }
    return "";
  }
  const currency = useMemo(() => {

    return getSymbolCurrencyLocalbase("SGD" as LOCALBASE);

  }, [orderDetail]);
  const handleBusinessHour = (businessHours: string): string[] => {
    const resultHour = businessHours.split(",");
    return resultHour;
  };


  return (
    <Fragment>
      <CollapsibleBlock heading={t("full-order-detail")}>
        <div className="order-detail mx-auto">
          <div
            ref={orderDetailRef}
            className="medium:px-6 large:px-8 pl-5 pr-20"
            style={{ fontFamily: "Kanit" }}
          >
            <div className="detail-border-bottom pb-3">
              <div className="flex justify-between items-center mb-12">

                <div className="flex items-center">

                  <p className="font-medium text-lg">{t("order-detail")}</p>
                </div>
              </div>
            </div>
            <div className="order-detail-info pt-4 detail-border-bottom flex justify-between">
              <div className="w-3/5">
                <p className="font-medium mb-4">
                  {t("order-id")}:{" "}
                  <span className="text-orange-light">{orderDetail?._id}</span>
                </p>
                <div className="ship-to mb-4">
                  {orderDetail?.shippingAddress && (
                    <>
                      <p className="text-sm font-medium">{t("ship-to")}</p>

                      <p className="font-medium">
                        {`${orderDetail?.shippingAddress?.firstName} ${orderDetail?.shippingAddress?.lastName}`}{" "}
                        (
                        {
                          orderDetail?.shippingAddress?.phoneNumber}
                        )
                      </p>
                      <p className="text-gray-dark text-sm">
                        {orderDetail?.shippingAddress.address}
                      </p>
                    </>
                  )}

                </div>
              </div>
              <div className="w-2/5">
                <p className="font-medium mb-2">{t("order-summary")}:</p>
                <div className="summary detail-border-bottom pb-5">
                  <div className="flex mb-2">
                    <p className="w-2/3">{t("total-product-price")}</p>
                    <p className="w-1/3">
                      {currency}{" "}
                      <FormatNumber
                        value={orderDetail?.totalPrice || 0}
                        decimalScale={2}
                        fixedDecimalScale
                      />
                    </p>
                  </div>
                  <div className="flex mb-2">
                    <p className="w-2/3">{t("shipping-fees")}</p>
                    <p className="w-1/3">
                      {currency}{" "}
                      <FormatNumber
                        value={Math.round((orderDetail?.totalPrice || 0) * 100) / 100}
                        decimalScale={2}
                        fixedDecimalScale
                      />
                    </p>
                  </div>

                  {/* {
                    <div className="mt-2 flex">
                      <div className="w-2/3">
                        <span>{t`total_shipping_fees`}</span>
                      </div>
                      <div className="w-1/3">
                        {currency}
                        <FormatNumber
                          value={Math.round(orderDetail.totalShippingFees * 100) / 100}
                          decimalScale={2}
                          fixedDecimalScale
                        />
                      </div>
                    </div>
                  } */}
                </div>

                <div className="py-5 flex detail-border-bottom">
                  <p className="text-xl font-medium w-62/100 text-black-primary">{t("total")}</p>
                  <p className="text-xl font-medium w-38/100 text-black-primary">
                    {currency}{" "}
                    <FormatNumber
                      value={orderDetail?.totalPrice || 0}
                      decimalScale={2}
                      fixedDecimalScale
                    />
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
                </TableHead>
                <TableBody>
                  {orderDetail?.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className={tableBodyCell}>
                        <ProductCard
                          image={!isPrinting ? product.mediaUrl : dummyImg}
                          name={product.productName}
                          type={!isPrinting ? product.fileType : "IMAGE"}
                        />
                      </TableCell>
                      <TableCell className={tableBodyCell}>
                        <ProductQuantity quantity={product.quantity} />
                      </TableCell>
                      <TableCell className={tableBodyCell} align="center">
                        <span className="text-orange-light text-base">
                          {getSymbolCurrencyLocalbase((product.unit || "SGD") as LOCALBASE)}{" "}
                          <FormatNumber value={product.price} />
                        </span>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

        </div>
      </CollapsibleBlock>
    </Fragment>
  );
}
