import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Font, StyleSheet } from "@react-pdf/renderer";

export const useStyles = makeStyles(() =>
  createStyles({
    tableHeadCell: {
      color: "#000000",
      fontSize: 14,
      borderBottom: "none",
      padding: "0 0 30px 0",
    },
    tableBodyCell: {
      padding: "10px 0",
      borderBottom: "1px solid #ebebeb",
    },
  }),
);

Font.register({
  family: "Kanit",
  fonts: [
    { src: "/assets/fonts/Kanit-Regular.ttf" },
    { src: "/assets/fonts/Kanit-Light.ttf", fontWeight: 300 },
    { src: "/assets/fonts/Kanit-Medium.ttf", fontWeight: 500 },
    { src: "/assets/fonts/Kanit-SemiBold.ttf", fontWeight: 600 },
    { src: "src/assets/fonts/Kanit-Bold.ttf", fontWeight: 700 },
  ],
});

export const styles = StyleSheet.create({
  // global
  textXs: {
    fontSize: 10,
  },
  textSm: {
    fontSize: 12,
  },
  textBase: {
    fontSize: 14,
  },
  textLg: {
    fontSize: 18,
  },
  fontMedium: {
    fontWeight: 500,
  },
  textGrayDark: {
    color: "#707070",
  },
  textOrange: {
    color: "#FF7500",
  },
  textBlue: {
    color: "#0075C9",
  },
  mainBorderBottom: {
    borderBottom: "1px solid #f4f5fa",
  },
  page: {
    padding: 20,
    fontFamily: "Kanit",
    width: 896,
  },
  widthTwoThird: {
    width: "66%",
  },
  widthOneThird: {
    width: "50%",
  },
  width40: {
    width: "40%",
  },
  width60: {
    width: "60%",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  mb10: {
    marginBottom: 10,
  },
  link: {
    textDecoration: "none",
  },
  itemsCenter: {
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  textCenter: {
    textAlign: "center",
  },

  // header
  header: {},
  headerLogo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  logo: {
    width: 70,
    height: 30,
  },
  textHeader: {
    color: "#231F20",
  },
  detailText: {
    paddingBottom: 16,
    borderBottom: "1px solid #f4f5fa",
    color: "#231F20",
  },

  // content
  content: {
    paddingTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  left: {
    width: "40%",
  },

  // order info
  orderNumberText: {
    marginBottom: 16,
  },
  orderNumberValue: {
    color: "#FF7500",
  },
  shipTo: {
    marginBottom: 16,
  },

  // order summary
  right: {
    width: "40%",
  },
  orderSummaryText: {
    marginBottom: 10,
  },
  summary: {
    paddingBottom: 20,
  },
  total: {
    paddingTop: 20,
    paddingBottom: 20,
  },

  // product
  productTable: {
    marginTop: 20,
  },
  tableHead: {
    marginBottom: 20,
  },
  tableRow: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  productImageContainer: {
    height: 50,
    width: 50,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginRight: 10,
  },
  productImageContainerWithBackground: {
    backgroundColor: "#F4F5FA",
  },
  productImage: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  productImageError: {
    maxWidth: "75%",
  },
  productName: {
    width: "80%",
  },
  productQuantity: {
    width: 100,
    height: 30,
    border: "1px solid #ebebeb",
    borderRadius: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  productQuantityBtn: {
    color: "#ebebeb",
    fontSize: 20,
  },
  totalPriceText30: {
    width: "30%",
  },
  totalPriceText55: {
    width: "55%",
  },
  totalPrice70: {
    width: "70%",
  },
  totalPrice45: {
    width: "45%",
  },
});
