import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { ChipType, CollapsibleBlock, GoBack, Pagination, ResultFor, Spinner } from "src/components";
import { NoDataIcon } from "src/components/icons";
import { CouponHistorySearchBox } from "./coupon-history-search-box";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { CouponParams } from "src/types/coupon.model";
import { formatNumber, getTotalPage, renderRangeDateStr } from "src/lib/common.lib";
import { identity, pickBy } from "lodash";
import { useStyles } from "./styles";
import { routeCouponList } from "src/constants/routes";
import { resetState } from "src/store/max-price.slice";
import { useDebounceValue } from "src/hooks";
import { getHistoryCouponAction } from "src/store/coupons.action";
import { getMaxPriceAction } from "src/store/max-price.action";

const queryString = require("query-string");

export function CouponHistory() {
  const location = useLocation();
  const { couponId } = queryString.parse(location.search);
  const [searchParams, setSearchParams] = useState<CouponParams>({
    _id: couponId,
    redeemMinAmount: 0,
    redeemMaxAmount: 1,
    page: 1,
    pageSize: 5,
  });
  const { t } = useTranslation("common");
  const { couponHistory, isGettingHistoryCoupon } = useAppSelector((state) => state.coupons);
  const { maxprice } = useAppSelector((state) => state.maxPriceLocation);

  const dispatch = useAppDispatch();

  const {
    coupon,
    orders: { data, total },
  } = couponHistory;
  const totalPage = getTotalPage(total, searchParams.pageSize);
  const { root, body } = useStyles();

  useEffect(() => {
    dispatch(getHistoryCouponAction(searchParams));
  }, [JSON.stringify(searchParams)]);

  useEffect(() => {
    const country = couponHistory.coupon.locationBase;
    if (country) {
      dispatch(getMaxPriceAction({ country, type: "Voucher" }));
    }
    return () => {
      dispatch(resetState());
    };
  }, [couponHistory.coupon.locationBase]);

  useEffect(() => {
    if (maxprice.type === "Voucher") {
      setSearchParams((current) => ({ ...current, redeemMaxAmount: maxprice.maxPrice }));
    }
  }, [maxprice.maxPrice]);

  function handlePageChange(page: number, pageSize: number) {
    handleUpdateParams({ page, pageSize });
  }

  function handleUpdateParams(newParams: CouponParams) {
    const params = { ...searchParams, page: 1, ...newParams };
    setSearchParams(params);
  }

  function handleDeleteResult(key: keyof CouponParams | "date" | "all" | "price") {
    let paramsMap = { ...searchParams };
    if (key === "date") {
      delete paramsMap["redeemStartDate"];
      delete paramsMap["redeemEndDate"];
    } else if (key === "price") {
      paramsMap["redeemMinAmount"] = 0;
      paramsMap["redeemMaxAmount"] = 0;
    } else if (key === "all") {
      paramsMap = {
        page: searchParams.page,
        pageSize: searchParams.pageSize,
        redeemMinAmount: 0,
        redeemMaxAmount: 0,
        _id: couponId,
      };
    } else delete paramsMap[key];

    setSearchParams(paramsMap);
  }

  const RESULTS_SEARCH: ChipType[] = (() => {
    const { redeemStartDate, redeemEndDate, redeemMinAmount, redeemMaxAmount, keyword } =
      searchParams;
    const dateStr = renderRangeDateStr(redeemStartDate, redeemEndDate, "DD-MM-YYYY");
    const trulyParams = pickBy(
      {
        price:
          redeemMinAmount !== 0 || redeemMaxAmount !== 0
            ? `${formatNumber(redeemMinAmount)} - ${formatNumber(redeemMaxAmount)}`
            : "",
        date: dateStr,
        keyword,
      },
      identity,
    );
    return Object.keys(trulyParams).map((key) => ({
      id: key + "",
      name: trulyParams[key] + "",
    }));
  })();

  const chipResult = useMemo(
    () =>
      RESULTS_SEARCH.map((chip: ChipType) => {
        if (chip.id === "date") {
          return {
            id: chip.id,
            name: `${chip.name.slice(0, 11)} ${t("to") as "to_ship"} ${chip.name.slice(14)}`,
          };
        }
        return {
          id: chip.id,
          name: chip.name,
        };
      }),
    [t, RESULTS_SEARCH],
  );

  const isLoading = useMemo(() => {
    if (isGettingHistoryCoupon || !maxprice.type) {
      return true;
    }
    return false;
  }, [maxprice.type, isGettingHistoryCoupon]);

  const isLoadingDebounce = useDebounceValue(isLoading, 500);

  return (
    <div className="m-5">
      <GoBack
        couponHistory
        url={routeCouponList}
        key={coupon._id}
        children={
          <CouponHistorySearchBox
            searchParams={searchParams}
            onSearchValueChange={handleUpdateParams}
            maxPrice={maxprice.maxPrice}
          />
        }
      />

      {chipResult.length > 0 && (
        <ResultFor
          arrayResult={chipResult}
          onDelete={(key) =>
            handleDeleteResult(key as keyof CouponParams | "date" | "all" | "price")
          }
          onClearAll={() => handleDeleteResult("all")}
        />
      )}

      <CollapsibleBlock className="mb-10 shadow-box" heading={t("coupon")}>
        <div className="w-full text-lg">
          <div>
            {t("coupon-name")}:&nbsp;&nbsp;&nbsp;&nbsp;{coupon.name}
          </div>
          <div className="mt-2">
            {t("coupon-code")}:&nbsp;&nbsp;&nbsp;&nbsp;{coupon.code}
          </div>
        </div>
      </CollapsibleBlock>

      <CollapsibleBlock className="mb-10 shadow-box" heading={t("coupon-redeem-history")}>
        <Table className={root}>
          <TableHead>
            <TableRow>
              <TableCell className="w-1/5 truncate text-2xl">{t("coupon-order-id")}</TableCell>
              <TableCell className="w-1/5 truncate">{t("coupon-member-id")}</TableCell>
              <TableCell className="w-1/5 truncate">{t("coupon-redeem-date")}</TableCell>
              <TableCell className="w-1/5 truncate">{t("total-price")}</TableCell>
              <TableCell className="w-1/5 truncate">{t("coupon-redeem-amount")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoadingDebounce ? (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={10}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {(data || []).length > 0 ? (
                  data.map((coupon) => {
                    return (
                      <TableRow className={body}>
                        <TableCell>
                          <div className="text-orange-light">{coupon.orderNumber}</div>
                        </TableCell>
                        <TableCell>{coupon.memberId}</TableCell>
                        <TableCell>
                          <div className="max-w-[120px]">
                            {coupon.redeemDate
                              ? dayjs(coupon.redeemDate).format("DD MMM YYYY HH:mm:ss")
                              : ""}
                          </div>
                        </TableCell>
                        <TableCell>{formatNumber(coupon.totalPrice)}</TableCell>
                        <TableCell>{formatNumber(coupon.couponRedeemAmount)}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell style={{ border: "none" }} colSpan={10}>
                      <div className="text-center">
                        <NoDataIcon className="mx-auto mb-5" />
                        <span className="text-base">{t`no-data`}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>

        <div className="py-10">
          <Pagination
            totalPage={totalPage}
            onPageChange={(page, size) => handlePageChange(page, size)}
            onPageSizeChange={() => {}}
            notPreventChangeRoute={true}
            selectedPage={searchParams.page}
          />
        </div>
      </CollapsibleBlock>
    </div>
  );
}
