import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    badge: {
      "& .MuiBadge-anchorOriginTopRightRectangle": {
        right: 10,
        backgroundColor: "#FF0000",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  }),
);
