import { createStyles, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() =>
  createStyles({
    error: {
      "& .MuiInputBase-input": {
        border: "1px solid #FF0000",
      },
    },
  }),
);
