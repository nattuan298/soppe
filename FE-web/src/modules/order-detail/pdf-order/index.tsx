/* eslint-disable indent */
import { Document, Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { OrderDetailType } from "types/orders";
import PDFImageProduct from "./image";
import { styles } from "./styles";
import { phoneNumberFormatter22 } from "src/lib/format";
import { useMemo } from "react";
import { useLocationBase } from "src/hooks";
import { getAddressFromOrderAddress } from "src/utils";

interface PDFDocumentProps {
  text: { [key: string]: string };
  order: OrderDetailType;
  lang: string;
}

export default function PDFDocument({ order, text, lang }: PDFDocumentProps) {
  const { symbol } = useLocationBase();
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
  const convertBusinessHour = (businessHours: string): string[] => {
    const resultHour = businessHours.split(",");
    return resultHour;
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLogo}>
            <View>
              <Image src="/assets/images/scm-connect-logo.png" style={styles.logo} />
            </View>
            <View>
              <Text style={[styles.textHeader, styles.textLg, styles.fontMedium]}>
                {text.order_detail}
              </Text>
            </View>
          </View>
          <View>
            <Text style={[styles.detailText, styles.textBase, styles.fontMedium]}>
              {text.details}
            </Text>
          </View>
        </View>
        <View style={[styles.content, styles.mainBorderBottom]}>
          <View style={styles.left}>
            <Text style={[styles.orderNumberText, styles.textBase, styles.fontMedium]}>
              {text.order_number}: <Text style={styles.orderNumberValue}>{order.orderNumber}</Text>
            </Text>
            {order.type === "Ship to address" && (
              <View style={styles.shipTo}>
                <Text style={[styles.textSm, styles.fontMedium]}>{text.ship_to}:</Text>
                <Text style={[styles.textSm, styles.textGrayDark]}>
                  {order.shippingAddress &&
                    getAddressFromOrderAddress(order.shippingAddress, lang).address}
                </Text>
              </View>
            )}
            {order.type === "Pickup" && (
              <View style={styles.shipTo}>
                <Text style={[styles.textSm, styles.fontMedium]}>{text.pickup_location}:</Text>
                <Text style={[styles.textSm, styles.textGrayDark]}>
                  {lang === "en" ? order?.pickupAddress.branchEng : order?.pickupAddress.branch}
                </Text>
                <Text style={[styles.textSm, styles.textGrayDark]}>{addressByLocation}</Text>
                <Text style={[styles.textSm, styles.textGrayDark]}>
                  Tel:{" "}
                  {phoneNumberFormatter22(
                    order.pickupAddress.phoneCode,
                    order.pickupAddress.phoneNumbers[0],
                  )}
                </Text>
                {order.pickupAddress.phoneNumbers[1] && (
                  <Text style={[styles.textSm, styles.textGrayDark]}>
                    Tel:{" "}
                    {phoneNumberFormatter22(
                      order.pickupAddress.phoneCode,
                      order.pickupAddress.phoneNumbers[1],
                    )}
                  </Text>
                )}
                {convertBusinessHour(hoursByLocation).map((item: string) => (
                  <Text style={[styles.textSm, styles.textGrayDark]}>{item}</Text>
                ))}
              </View>
            )}
          </View>
          <View style={styles.right}>
            {/* <Text style={[styles.textSm, styles.textGrayDark]}>
              {lang === "en" ? order?.shippingAddress.address : order?.pickupAddress.branch}
            </Text> */}

            <Text style={[styles.textBase, styles.fontMedium, styles.orderSummaryText]}>
              {text.order_summary}:
            </Text>
            <View style={[styles.summary, styles.mainBorderBottom]}>
              <View style={[styles.flexRow, styles.mb10]}>
                <Text style={[styles.textBase, styles.widthTwoThird]}>
                  {text.total_product_price}
                </Text>
                <Text style={[styles.textBase, styles.widthOneThird]}>
                  {symbol === "₭" ? "LAK  " : symbol}
                  {order.totalProductPrice.toFixed(2)}
                </Text>
              </View>
              {order.type !== "Pickup" && (
                <View style={[styles.flexRow, styles.mb10]}>
                  <Text style={[styles.textBase, styles.widthTwoThird]}>{text.shipping_fees}</Text>
                  <Text style={[styles.textBase, styles.widthOneThird]}>
                    {symbol === "₭" ? "LAK  " : symbol}
                    {order.shippingFees.toFixed(2)}
                  </Text>
                </View>
              )}
              <View style={[styles.flexRow, styles.mb10]}>
                <Text style={[styles.textBase, styles.widthTwoThird]}>{text.taxes}</Text>
                <Text style={[styles.textBase, styles.widthOneThird]}>
                  {symbol === "₭" ? "LAK  " : symbol}
                  {order.taxes.toFixed(2)}
                </Text>
              </View>
              <Link style={[styles.textBlue, styles.textXs, styles.link]} src="#">
                {text.more_about_taxes}
              </Link>
              {order.type !== "Pickup" && (
                <View style={[styles.flexRow, styles.mb10]}>
                  <Text style={[styles.textBase, styles.widthTwoThird]}>
                    {text.total_shipping_fees}
                  </Text>
                  <Text style={[styles.textBase, styles.widthOneThird]}>
                    {symbol === "₭" ? "LAK  " : symbol}
                    {order.totalShippingFees.toFixed(2)}
                  </Text>
                </View>
              )}
            </View>

            <View style={[styles.flexRow, styles.total, styles.mainBorderBottom]}>
              {order.totalPrice >= 10000 ? (
                <>
                  <Text style={[styles.textLg, styles.fontMedium, styles.totalPriceText30]}>
                    {text.total}
                  </Text>
                  <Text style={[styles.textLg, styles.fontMedium, styles.totalPrice70]}>
                    {symbol === "₭" ? "LAK  " : symbol}
                    {order.totalPrice.toFixed(2)}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={[styles.textLg, styles.fontMedium, styles.totalPriceText55]}>
                    {text.total}
                  </Text>
                  <Text style={[styles.textLg, styles.fontMedium, styles.totalPrice45]}>
                    {symbol === "₭" ? "LAK  " : symbol}
                    {order.totalPrice.toFixed(2)}
                  </Text>
                </>
              )}
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
                {text.total_received_PV}
              </Text>
              <Text
                style={[
                  styles.textBase,
                  styles.fontMedium,
                  styles.widthOneThird,
                  styles.textGrayDark,
                ]}
              >
                {order.totalPv.toFixed(2)} PV
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.productTable}>
          <View style={[styles.flexRow, styles.tableHead]}>
            <Text style={[styles.textSm, styles.width40]}>{text.product}</Text>
            <View style={[styles.width60, styles.flexRow]}>
              <Text style={[styles.textSm, styles.widthOneThird, styles.textCenter]}>
                {text.quantity}
              </Text>
              <Text style={[styles.textSm, styles.widthOneThird, styles.textCenter]}>
                {text.price}
              </Text>
              <Text style={[styles.textSm, styles.widthOneThird, styles.textCenter]}>
                {text.received_PV}
              </Text>
            </View>
          </View>
          <View>
            {order.products.map((product) => (
              <View style={[styles.tableRow, styles.flexRow]}>
                <View key={product.productCode} style={[styles.width40]}>
                  <View style={[styles.flexRow]}>
                    <View
                      style={
                        product.productImage
                          ? [styles.productImageContainer]
                          : [
                              styles.productImageContainer,
                              styles.productImageContainerWithBackground,
                            ]
                      }
                    >
                      <PDFImageProduct image={product.productImage} type={product.fileType} />
                    </View>

                    <Text style={[styles.textBase, styles.productName]}>{product.productName}</Text>
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
                    {symbol === "₭" ? "LAK  " : symbol} {product.price}
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
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
