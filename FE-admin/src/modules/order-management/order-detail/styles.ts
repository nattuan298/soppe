import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Font, StyleSheet } from "@react-pdf/renderer";

import kanitRegular from "src/assets/fonts/Kanit-Regular.ttf";
import kanitLight from "src/assets/fonts/Kanit-Light.ttf";
import kanitMedium from "src/assets/fonts/Kanit-Medium.ttf";
import kanitSemibold from "src/assets/fonts/Kanit-SemiBold.ttf";
import kanitbold from "src/assets/fonts/Kanit-Bold.ttf";

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
    { src: kanitRegular },
    { src: kanitLight, fontWeight: 300 },
    { src: kanitMedium, fontWeight: 500 },
    { src: kanitSemibold, fontWeight: 600 },
    { src: kanitbold, fontWeight: 700 },
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
  fontLight: {
    fontWeight: 300,
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
    width: "33%",
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
    padding: "10px 0",
    borderBottom: "1px solid #ebebeb",
  },
  productImage: {
    height: 50,
    width: 50,
    marginRight: 10,
    objectFit: "cover",
  },
  productVideo: {
    height: 50,
    width: 50,
    marginRight: 10,
    objectFit: "contain",
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
  show: {
    color: "#231F20",
  },
  hide: {
    color: "#ffffff",
  },
});
