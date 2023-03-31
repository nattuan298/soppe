import { Tooltip, makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  tooltip: {
    paddingBottom: 2,
    backgroundColor: "#FF7500",
    fontSize: "12px",
    fontWeight: "normal",
  },
  arrow: {
    color: "#FF7500",
    marginBottom: "-6px !important",
  },
  popper: {
    zIndex: 20,
  },
});

export function Point({
  textTooltip,
  className,
  showTooltip,
  style,
}: {
  textTooltip?: string;
  className?: string;
  showTooltip?: boolean;
  style?: object;
}) {
  const classes = useStyle();
  return (
    <div className={className} style={style}>
      {showTooltip ? (
        <Tooltip title={textTooltip || ""} arrow open placement="top" classes={classes}>
          <div
            style={{
              width: 10,
              height: 10,
              transform: "translateX(-50%)",
            }}
            className="bg-orange rounded-full absolute"
          />
        </Tooltip>
      ) : (
        <div
          style={{
            width: 10,
            height: 10,
            transform: "translateX(-50%)",
          }}
          className="bg-orange rounded-full absolute"
        />
      )}
    </div>
  );
}
