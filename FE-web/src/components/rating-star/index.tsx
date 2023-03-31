import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { ChangeEvent } from "react";
import { Box } from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";

interface RatingStarProps {
  handleRatingQuality?: (number: number) => void;
  handleRatingShipping?: (number: number) => void;
  setStarProduct?: Function;
  value?: number;
  name: string;
}

const StyledRating = withStyles({
  icon: {
    height: "28.75px",
    width: "30.26px",
    marginRight: "4px",
    marginLeft: "4px",
    borderBlockColor: "#FF7500",
  },
  iconFilled: {
    color: "#FF7500",
  },
  iconHover: {
    color: "#FF7500",
  },
})(Rating);

export function RatingStar({
  value,
  name,
  handleRatingQuality,
  handleRatingShipping,
  ...props
}: RatingStarProps) {
  const handleChange = (event: ChangeEvent<{}>, value: number | null): void => {
    handleRatingQuality && handleRatingQuality(value || 0);
    handleRatingShipping && handleRatingShipping(value || 0);
  };
  return (
    <div>
      <Box component="fieldset" mb={2} borderColor="grey.200" {...props}>
        <StyledRating
          name={name}
          className="text-3xl"
          // defaultValue={0}
          value={value}
          precision={0.5}
          onChange={handleChange}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
        />
      </Box>
    </div>
  );
}
