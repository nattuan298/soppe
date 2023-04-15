import { Document, Font, Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { useTranslation } from "react-i18next";

import { OrderModel } from "src/types/order.model";
import { FormatNumber } from "src/lib/format-number";
import { LOCALBASE, getSymbolCurrencyLocalbase, phoneNumberFormatter } from "src/lib/format";
import scmLogo from "src/assets/img/scm-connect-logo.png";
import PDFImageProduct from "./pdf-image-product";
import { styles } from "./styles";
import { useMemo } from "react";
interface PDFDocumentProps {
  order: OrderModel;
}

const getCurrency = (unit: string = "THB") => {
  return getSymbolCurrencyLocalbase(unit as LOCALBASE);
};

export default function PDFDocument({ order }: PDFDocumentProps) {
  const { t, i18n } = useTranslation("common");

  const currencyOrder = getCurrency(order.unit);
  const handleBusinessHour = (businessHours: string): string[] => {
    const resultHour = businessHours.split(",");
    return resultHour;
  };
  const { language } = i18n;
  const hoursByLocation = useMemo(() => {
    if (!order.pickupAddress) {
      return "";
    }
    const { businessHours, businessHoursEng } = order.pickupAddress;
    if (language === "en" || !businessHours) {
      return businessHoursEng;
    }
    return businessHours;
  }, [language, order.pickupAddress]);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            <View>
              <Image src={scmLogo} style={styles.logo} />
            </View>
            <View>
              <Text style={[styles.textHeader, styles.textLg, styles.fontMedium]}>
                {t("order-detail")}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.detailText, styles.textBase, styles.fontMedium]}>
              {t("details")}
            </Text>
          </View>
        </View>
        <View style={[styles.content, styles.mainBorderBottom]}>
          <View style={styles.left}>
            <Text style={[styles.orderNumberText, styles.textBase, styles.fontMedium]}>
              {t("order-id")}: <Text style={styles.orderNumberValue}>{order.orderNumber}</Text>
            </Text>
            <View style={styles.shipTo}>
              {order.shippingAddress && (
                <View>
                  <Text style={[styles.textSm, styles.fontMedium]}>{t("ship-to")}</Text>
                  <Text style={[styles.textBase, styles.fontMedium]}>
                    {`${order?.shippingAddress?.firstName} ${order?.shippingAddress?.lastName}`}
                    {phoneNumberFormatter(
                      order?.shippingAddress?.phoneCode,
                      order?.shippingAddress?.phoneNumber,
                    )}
                  </Text>
                  <Text style={[styles.textSm, styles.textGrayDark]}>
                    {`${order?.shippingAddress.address}, ${order?.shippingAddress.subDistrictEng}, ${order?.shippingAddress.districtEng}, ${order?.shippingAddress.provinceEng}, ${order?.shippingAddress.postalCode} ${order?.shippingAddress.country}`}
                  </Text>
                </View>
              )}

              {order.type === "Pickup" && (
                <View>
                  <Text style={[styles.textSm, styles.fontMedium]}>{t("pickup-location")}</Text>
                  <Text style={[styles.textSm, styles.fontLight]}>
                    {language === "en" || !order.pickupAddress.branch
                      ? order.pickupAddress.branchEng
                      : order.pickupAddress.branch}
                  </Text>
                  <Text style={[styles.textSm, styles.fontLight]}>
                    {language === "en" || !order.pickupAddress.address
                      ? order.pickupAddress.addressEng
                      : order.pickupAddress.address}
                  </Text>
                  {order.pickupAddress.phoneNumbers.map((phone) => (
                    <Text style={[styles.textSm, styles.fontLight]}>
                      Tel: ({phoneNumberFormatter(order.pickupAddress.phoneCode, phone)})
                    </Text>
                  ))}
                  {handleBusinessHour(hoursByLocation ? hoursByLocation : "").map(
                    (item: string) => (
                      <Text style={[styles.textSm, styles.fontLight]}>{item}</Text>
                    ),
                  )}
                </View>
              )}
            </View>
          </View>
          <View style={styles.right}>
            <Text style={[styles.textBase, styles.fontMedium, styles.orderSummaryText]}>
              {t("order-summary")}:
            </Text>
            <View style={[styles.summary, styles.mainBorderBottom]}>
              <View style={[styles.flexRow, styles.mb10]}>
                <Text style={[styles.textBase, styles.widthTwoThird]}>
                  {t("total-product-price")}
                </Text>
                <Text style={[styles.textBase, styles.widthOneThird]}>
                  {currencyOrder === "₭" ? "LAK" : currencyOrder}{" "}
                  <FormatNumber
                    value={order.totalProductPrice}
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </Text>
              </View>
              <View style={[styles.flexRow, styles.mb10]}>
                <Text style={[styles.textBase, styles.widthTwoThird]}>{t("shipping-fees")}</Text>
                <Text style={[styles.textBase, styles.widthOneThird]}>
                  {currencyOrder === "₭" ? "LAK" : currencyOrder}{" "}
                  <FormatNumber
                    value={Math.round(order.shippingFees * 100) / 100}
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </Text>
              </View>
              <View style={[styles.flexRow, styles.mb10]}>
                <Text style={[styles.textBase, styles.widthTwoThird]}>{t("taxes")}</Text>
                <Text style={[styles.textBase, styles.widthOneThird]}>
                  {currencyOrder === "₭" ? "LAK" : currencyOrder}{" "}
                  <FormatNumber
                    value={Math.round(order.taxes * 100) / 100}
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </Text>
              </View>
              <Link style={[styles.textBlue, styles.textXs, styles.link]} src="#">
                {t("click-read-more-taxes")}
              </Link>
              <View
                style={[
                  styles.flexRow,
                  styles.mb10,
                  styles.productTable,
                  order.type !== "Pickup" ? styles.show : styles.hide,
                ]}
              >
                <Text style={[styles.textBase, styles.widthTwoThird]}>
                  {t("total_shipping_fees")}
                </Text>
                <Text style={[styles.textBase, styles.widthOneThird]}>
                  {currencyOrder === "₭" ? "LAK" : currencyOrder}{" "}
                  <FormatNumber
                    value={Math.round((order.totalShippingFees || 0) * 100) / 100}
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </Text>
              </View>
              <View
                style={[
                  styles.flexRow,
                  styles.mb10,
                  order.couponRedeemAmount ? styles.show : styles.hide,
                ]}
              >
                <Text style={[styles.textBase, styles.widthTwoThird]}>{t("discount")}</Text>
                <Text style={[styles.textBase, styles.widthOneThird]}>
                  {currencyOrder === "₭" ? "LAK" : currencyOrder}{" "}
                  <FormatNumber
                    value={Math.round((order.couponRedeemAmount || 0) * 100) / 100}
                    decimalScale={2}
                    fixedDecimalScale
                  />
                </Text>
              </View>
            </View>

            <View style={[styles.flexRow, styles.total, styles.mainBorderBottom]}>
              <Text style={[styles.textLg, styles.fontMedium, styles.widthOneThird]}>
                {t("total")}
              </Text>
              <Text style={[styles.textLg, styles.fontMedium, styles.widthTwoThird]}>
                {currencyOrder === "₭" ? "LAK" : currencyOrder}{" "}
                <FormatNumber value={order.totalPrice} decimalScale={2} fixedDecimalScale />
              </Text>
            </View>

            <View style={[styles.flexRow, styles.total]}>
              <Text
                style={[
                  styles.textBase,
                  styles.fontMedium,
                  styles.widthTwoThird,
                  styles.textGrayDark,
                ]}
              >
                {t("total-received-pv")}
              </Text>
              <Text
                style={[
                  styles.textBase,
                  styles.fontMedium,
                  styles.widthOneThird,
                  styles.textGrayDark,
                ]}
              >
                <FormatNumber value={order.totalPv} decimalScale={2} fixedDecimalScale /> PV
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.productTable}>
          <View style={[styles.flexRow, styles.tableHead]}>
            <Text style={[styles.textSm, styles.width40]}>{t("product")}</Text>
            <View style={[styles.width60, styles.flexRow]}>
              <Text style={[styles.textSm, styles.widthOneThird, styles.textCenter]}>
                {t("quantity")}
              </Text>
              <Text style={[styles.textSm, styles.widthOneThird, styles.textCenter]}>
                {t("price")}
              </Text>
              <Text style={[styles.textSm, styles.widthOneThird, styles.textCenter]}>
                {t("received-pv")}
              </Text>
            </View>
          </View>
          <View>
            {order.products.map((product) => {
              return (
                <View key={product._id} style={[styles.tableRow, styles.flexRow]}>
                  <View key={product._id} style={[styles.width40]}>
                    <View style={[styles.flexRow]}>
                      <PDFImageProduct image={product.productImage} type={product.fileType} />
                      <Text style={[styles.textBase, styles.productName]}>
                        {product.productName}
                      </Text>
                    </View>
                  </View>
                  <View style={[styles.width60, styles.flexRow, styles.itemsCenter]}>
                    <View style={[styles.widthOneThird, styles.flexRow, styles.justifyCenter]}>
                      <View style={[styles.productQuantity]}>
                        <Text
                          style={[
                            styles.textSm,
                            styles.widthOneThird,
                            styles.textCenter,
                            styles.productQuantityBtn,
                          ]}
                        >
                          -
                        </Text>
                        <Text style={[styles.textSm, styles.widthOneThird, styles.textCenter]}>
                          {product.quantity}
                        </Text>
                        <Text
                          style={[
                            styles.textSm,
                            styles.widthOneThird,
                            styles.textCenter,
                            styles.productQuantityBtn,
                          ]}
                        >
                          +
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.textSm,
                        styles.widthOneThird,
                        styles.textOrange,
                        styles.textCenter,
                      ]}
                    >
                      {getCurrency(product.unit)} {product.price}
                    </Text>
                    <Text
                      style={[
                        styles.textSm,
                        styles.widthOneThird,
                        styles.textGrayDark,
                        styles.textCenter,
                      ]}
                    >
                      {product.pv} PV
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </Page>
    </Document>
  );
}
