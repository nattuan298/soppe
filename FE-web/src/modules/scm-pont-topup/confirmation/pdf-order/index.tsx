import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { orderDetailModel } from "src/feature/scm-point-topup/type";
import { useLocationBase } from "src/hooks";
import { styles } from "./styles";

interface PDFDocumentProps {
  order: orderDetailModel;
  text: { [key: string]: string };
}

export default function PDFDocument({ text, order }: PDFDocumentProps) {
  const { symbol } = useLocationBase();

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
            <Text style={[styles.flexRow]}>
              <Text style={[styles.textBase, styles.fontMedium]}>{text.hello}</Text>
              <Text style={[styles.textBase, styles.fontMedium]}>{order.fullName}</Text>
            </Text>
            <Text style={[styles.hasBeenConfirm, styles.textSm]}>
              {text.order_has_been_confirmed}
            </Text>
            <Text style={[styles.detailText, styles.textBase, styles.fontMedium]}>
              {text.details}
            </Text>
          </View>
        </View>
        <View style={[styles.content, styles.mainBorderBottom]}>
          <View style={styles.right}>
            <Text style={[styles.flexRow, styles.total, styles.mainBorderBottom]}>
              <Text style={[styles.textBase, styles.fontMedium, styles.orderSummaryText]}>
                {text.order_id}
              </Text>
              <Text style={[styles.textOrange]}>&nbsp;{order.orderNumber}</Text>
            </Text>
            <Text style={[styles.textBase, styles.fontMedium, styles.orderSummaryText]}>
              {text.order_summary}:
            </Text>
            <View style={[styles.summary, styles.mainBorderBottom]}>
              <View style={[styles.flexRow, styles.mb10]}>
                <Text style={[styles.textBase, styles.widthTwoThird]}>
                  {text.total_product_price}
                </Text>
                <Text style={[styles.textBase, styles.widthOneThird]}>
                  {symbol}
                  {order.total}
                </Text>
              </View>
            </View>

            <View style={[styles.flexRow, styles.total, styles.mainBorderBottom]}>
              <Text style={[styles.textLg, styles.fontMedium, styles.widthTwoThird]}>
                {text.total}
              </Text>
              <Text style={[styles.textLg, styles.fontMedium, styles.widthOneThird]}>
                {symbol}
                {order.total}
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
            </View>
          </View>
          <View>
            <View style={[styles.tableRow, styles.flexRow]}>
              <View style={[styles.width40]}>
                <View style={[styles.flexRow]}>
                  <View>
                    <Image
                      style={styles.productImage}
                      source={{
                        uri: "/assets/images/logo.png",
                        method: "GET",
                        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
                        body: null,
                      }}
                    />
                  </View>
                  <View style={[styles.textBase, styles.productName]}>
                    <Text>{text.product_name}</Text>
                  </View>
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
                      {order.total}
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
                  {symbol} {order.total}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
