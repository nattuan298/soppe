import { MouseEvent, ReactNode, useMemo, useState } from "react";
import TableRow, { TableRowProps } from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "../../icons";
import { useStyles } from "./styles";
import "./styles.css";

interface CollapsibleBodyRowProps extends TableRowProps {
  collapsible?: boolean;
  borderedPreview?: boolean;
  colSpan?: number;
  children?: ReactNode;
  preview?: ReactNode;
  subFeatures?: ReactNode;
  memberid?: string;
  getDetail?: Function;
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
  ...props
}: CollapsibleBodyRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { root, closeRow, openRow, collapseButton, previewOpenedRow, previewClosedRow } =
    useStyles();

  const collapsibleRow = clsx(
    root,
    isOpen && borderedPreview ? openRow : closeRow,
    "collapsible-row",
    className && className,
  );
  const previewRow = clsx(isOpen && borderedPreview ? previewOpenedRow : previewClosedRow);
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

  const styleBorderRight = useMemo(
    () =>
      isOpen && !subFeatures
        ? {
          borderRight: "1px solid #FF7500",
        }
        : {},
    [isOpen, subFeatures],
  );

  return (
    <>
      <TableRow className={collapsibleRow} {...props}>
        {children}
        <TableCell size="small" align="center" style={styleBorderRight}>
          {collapsible && (
            <IconButton
              className={collapseButton}
              aria-label="expand row"
              size="small"
              onClick={clickGetDetail}
            >
              {isOpen ? <ChevronUp className="chevron-up" /> : <ChevronDown />}
            </IconButton>
          )}
        </TableCell>
      </TableRow>
      {preview && (
        <TableRow className={previewRow}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={colSpan}>
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
