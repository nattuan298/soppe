import MuiPagination from "@material-ui/lab/Pagination";
import classNames from "classnames";
import { ChangeEvent, MouseEvent, useMemo, useState } from "react";

import useTranslation from "next-translate/useTranslation";
import InputOnlyNumber from "src/components/input/only-number";
import { CustomSelect } from "src/components/select/custom-select";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
import { Button } from "../button";
import cls from "./style.module.css";
import { useStyles } from "./styles";

export const pageSizeOptions = [
  {
    title: "5",
    value: 5,
  },
  {
    title: "10",
    value: 10,
  },
  {
    title: "35",
    value: 35,
  },
  {
    title: "50",
    value: 50,
  },
  {
    title: "100",
    value: 100,
  },
];

interface PaginationProps {
  totalPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  selectedPage?: number;
  pageSize?: number;
  screen?: number | string;
}

export function Pagination({
  totalPage,
  onPageChange,
  onPageSizeChange,
  selectedPage,
  pageSize,
}: PaginationProps) {
  const { t } = useTranslation("common");
  const [pageToGo, setPageToGo] = useState<string>("");
  const { paginationItem, input } = useStyles();
  const width = useGetScreenWidth();
  const isDisabled = useMemo(() => {
    if (pageToGo && Number(pageToGo) > totalPage) return true;
    if (pageToGo && Number(pageToGo) === 0) return true;
    if (!pageToGo) return true;
  }, [pageToGo, totalPage]);

  function handleChangeGoToPage(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setPageToGo(value);
  }
  function handleClickGoToPage(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (pageToGo) {
      onPageChange(Number(pageToGo));
    } else {
      onPageChange(1);
    }
  }

  function handleChangePage(event: object, page: number) {
    onPageChange(page);
  }

  const handleChangePageSize = ({ value }: { value: string | number; title: string }) => {
    onPageSizeChange(Number(value));
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-start justify-between">
      <div className="flex items-center mb-[27px] sm:mb-0">
        <p className="text-textSearch sm:text-gray-primary mr-4">{t("showing")}</p>
        <CustomSelect
          className={classNames(
            "mr-4 flex-shrink-0 h-auto flex items-center",
            cls.selectPagination,
          )}
          selectClassName={
            "text-black-dark justify-end py-2 px-4 h-[50px] sm:h-auto w-[100px] sm:w-20 mb-0"
          }
          options={pageSizeOptions}
          defaultValue={pageSize}
          onChange={handleChangePageSize}
        />
        <p className="text-textSearch sm:text-gray-primary flex-shrink-0">
          {t("listing-per-page")}
        </p>
      </div>
      <div className="flex items-center flex-wrap max-w-2xl md:justify-end gap-y-6 sm:gap-y-2">
        <MuiPagination
          className={classNames(paginationItem)}
          variant="outlined"
          color="primary"
          count={totalPage === 0 ? 1 : totalPage}
          page={selectedPage}
          onChange={handleChangePage}
          siblingCount={0}
          boundaryCount={1}
          size="large"
        />
        {width !== "Mobile" || (totalPage < 5 && width === "Mobile") ? (
          <div className="flex items-center md:ml-5">
            <InputOnlyNumber
              className={input}
              placeholder={t("go-to-page")}
              value={pageToGo}
              onChange={handleChangeGoToPage}
            />
            <Button
              disabled={isDisabled}
              variant="primary"
              className="rounded-r rounded-l-none py-1.5 bg-orange"
              type="button"
              onClick={handleClickGoToPage}
            >
              {t("go")}
            </Button>
          </div>
        ) : null}
      </div>
      {width !== "Desktop" && totalPage > 5 && (
        <div className="w-full flex justify-end pt-5">
          <div className="flex items-center md:ml-5">
            <InputOnlyNumber
              className={input}
              placeholder={t("go-to-page")}
              value={pageToGo}
              onChange={handleChangeGoToPage}
            />
            <Button
              disabled={isDisabled}
              variant="primary"
              className="rounded-r rounded-l-none py-1.5 bg-orange"
              type="button"
              onClick={handleClickGoToPage}
            >
              {t("go")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
