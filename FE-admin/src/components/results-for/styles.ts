import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    margin: 0,
    "& .MuiChip-label": {
      fontFamily: "Kanit",
    },
    "&&:focus": {},
  },
  chip: {
    margin: theme.spacing(0.5),
    backgroundColor: "#F4F5FA",
    height: "40px",
    borderRadius: "20px",
    marginLeft: "15px",
  },
}));
