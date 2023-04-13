import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: 100,
    },
    selectBorder: {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "#EBEBEB",
      },
    },
    paginationItem: {
      "& .MuiPaginationItem-outlinedPrimary.Mui-selected": {
        border: "1px solid rgba(255, 117, 0, 0.5)",
        backgroundColor: "rgba(255, 117, 0, 0.12)",
        fontFamily: "Kanit",
      },
      "& .MuiPaginationItem-outlined": {
        border: "none",
        backgroundColor: "#F4F5FA",
        fontFamily: "Kanit",
      },
    },
    input: {
      "& .MuiInputBase-input": {
        backgroundColor: "#F4F5FA",
        width: 78,
        borderRadius: "5px 0 0 5px",
        padding: "16px 20px",
        fontFamily: "Kanit",
        "&::placeholder": {
          color: "#BCBCBC",
        },
      },
    },
  }),
);
