import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from "react";
import MuiPagination from "@material-ui/lab/Pagination";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";

import { Button } from "../button";
import { Select } from "../select";
import { InputOnlyNumber } from "../input";
import { useStyles } from "./styles";
import { pageSizeOptions } from "./constants";
import "./styles.css";

const queryString = require("query-string");

interface PaginationProps {
  totalPage: number;
  onPageChange: (page: number, size: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  notPreventChangeRoute?: boolean;
  selectedPage?: number;
}

export function Pagination({
  totalPage,
  onPageChange,
  onPageSizeChange,
  notPreventChangeRoute,
  selectedPage,
}: PaginationProps) {
  console.log(totalPage);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(5);
  const [pageToGo, setPageToGo] = useState<string>("");
  const { paginationItem, input } = useStyles();
  const { t } = useTranslation("common");
  const history = useHistory();
  const location = useLocation();

  const locationSearch = queryString.parse(location.search);

  useEffect(() => {
    selectedPage && setCurrentPage(selectedPage);
  }, [selectedPage]);

  useEffect(() => {
    if (locationSearch.page) {
      setCurrentPage(Number(locationSearch.page));
    }
  }, [locationSearch.page]);

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
      setCurrentPage(Number(pageToGo));
      onPageChange(Number(pageToGo), currentSize);
    } else {
      setCurrentPage(1);
      onPageChange(1, currentSize);
    }
    !notPreventChangeRoute && history.push(`${location.pathname}?page=${Number(pageToGo)}`);
  }
  function handleChangePage(event: object, page: number) {
    setCurrentPage(page);
    onPageChange(page, currentSize);
    !notPreventChangeRoute && history.push(`${location.pathname}?page=${page}`);
  }
  function handlePageSizeChange(value: string | null) {
    setCurrentSize(Number(value));
    onPageSizeChange(Number(value));
    !notPreventChangeRoute && history.push(`${location.pathname}?page=1`);
    onPageChange(1, Number(value));
    setCurrentPage(1);
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="show-per-page flex items-center">
        <p className="text-gray-primary mr-4">{t("showing")}</p>
        <Select
          className="page-size-change mr-4 flex-shrink-0"
          defaultValue={currentSize}
          position="top"
          options={pageSizeOptions}
          onChange={handlePageSizeChange}
        />
        <p className="text-gray-primary flex-shrink-0">{t("listing-per-page")}</p>
      </div>
      <div className="pagination flex items-center">
        <MuiPagination
          className={clsx(paginationItem, "mr-5")}
          variant="outlined"
          color="primary"
          count={totalPage === 0 ? 1 : totalPage}
          page={currentPage}
          onChange={handleChangePage}
        />
        <div className="go-to-page flex items-center">
          <InputOnlyNumber
            className={input}
            placeholder={t("go-to-page")}
            value={pageToGo}
            onChange={handleChangeGoToPage}
          />
          <Button
            disabled={isDisabled}
            variant="primary"
            className="go-btn rounded-r rounded-l-none"
            type="button"
            onClick={handleClickGoToPage}
          >
            {t("go")}
          </Button>
        </div>
      </div>
    </div>
  );
}
