import { MouseEvent, ReactNode, useState } from "react";
import TableRow, { TableRowProps } from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import { useStyles } from "./styles";
import { ChevronDown, ChevronUp } from "src/components/svgs";
import styles from "./collapsible-body-row.module.css";
import { makeStyles } from "@material-ui/core";

const useStylesCustom = makeStyles({
  previewCell: {
    padding: "0px 10px",
  },
});

interface CollapsibleBodyRowProps extends TableRowProps {
  collapsible?: boolean;
  borderedPreview?: boolean;
  colSpan?: number;
  children?: ReactNode;
  preview?: ReactNode;
  subFeatures?: ReactNode;
  memberid?: string;
  getDetail?: Function;
  index: number;
}

export function CollapsibleBodyRow({
  borderedPreview = true,
  collapsible = true,
  colSpan,
  children,
  preview,
  subFeatures,
  className,
  getDetail,
  memberid,
  index,
  ...props
}: CollapsibleBodyRowProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    root,
    closeRow,
    openRow,
    collapseButton,
    collapseButtonCustom,
    previewOpenedRow,
    previewClosedRow,
    previewOpenedRowCustom,
  } = useStyles();
  const classes = useStylesCustom();

  const collapsibleRow = clsx(
    root,
    isOpen && borderedPreview ? openRow : closeRow,
    "collapsible-row",
    className && className,
  );

  const previewRow = clsx(isOpen && borderedPreview ? previewOpenedRow : previewClosedRow);
  const previewRowCustom = clsx(
    isOpen && borderedPreview ? previewOpenedRowCustom : previewClosedRow,
  );
  const onClick = () => {
    getDetail && getDetail(memberid);
  };
  function handleClickCollapseRow(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsOpen(!isOpen);
  }
  const clickGetDetail = (e: MouseEvent<HTMLButtonElement>) => {
    onClick();
    handleClickCollapseRow(e);
  };

  return (
    <>
      {index % 2 === 0 ? (
        <TableRow className={collapsibleRow} {...props}>
          {children}
          <TableCell size="small" align="center">
            {collapsible && (
              <IconButton
                className={collapseButton}
                aria-label="expand row"
                size="small"
                onClick={clickGetDetail}
              >
                {isOpen ? <ChevronUp fill={"#ff7500"} /> : <ChevronDown />}
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      ) : (
        <TableRow className={`${collapsibleRow} ${styles.rowCustome}`} {...props}>
          {children}
          <TableCell size="small" align="center">
            {collapsible && (
              <IconButton
                className={collapseButtonCustom}
                aria-label="expand row"
                size="small"
                onClick={clickGetDetail}
              >
                {isOpen ? <ChevronUp fill={"#ff7500"} /> : <ChevronDown />}
              </IconButton>
            )}
          </TableCell>
        </TableRow>
      )}
      {preview && index % 2 === 0 ? (
        <TableRow className={`${previewRow}`}>
          <TableCell
            className={`${classes.previewCell}`}
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={colSpan}
          >
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              {preview}
            </Collapse>
          </TableCell>
        </TableRow>
      ) : (
        <TableRow className={`${previewRowCustom} ${classes.previewCell}`}>
          <TableCell
            className={`${classes.previewCell}`}
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={colSpan}
          >
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              {preview}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
      {subFeatures && <>{isOpen && subFeatures}</>}
    </>
  );
}
