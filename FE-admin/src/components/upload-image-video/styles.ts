import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    width: "716px",
    minHeight: "150px",
    height: "150px",
    border: "2px dashed #EBEBEB",
    borderRadius: "5px",
    backgroundColor: "#F4F5FA",
    "& svg": {
      color: "#BCBCBC",
      width: "40px",
      height: "27px",
      marginTop: "-136px",
    },
  },
  text: {
    fontSize: "12px",
    fontFamily: "kanit",
    color: "#BCBCBC",
    marginTop: "86.34px",
  },
}));
