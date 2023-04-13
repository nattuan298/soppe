import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ActionButton,
  ChipType,
  CollapsibleBodyRow,
  CollapsibleHeadRow,
  Modal,
  Pagination,
  ResultFor,
  Spinner,
  StatusDropdown,
} from "src/components";
import { NoDataIcon } from "src/components/icons";
import { CouponSearchBox } from "./coupon-search-box";
import { useEffect, useMemo, useState } from "react";
import { CouponPreview } from "./coupon-preview";
import { getStatus } from "src/constants/common.constants";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { Coupon, CouponParams, RedeemLimit } from "src/types/coupon.model";
import { formatNumber, getTotalPage, renderRangeDateStr, toQueryString } from "src/lib/common.lib";
import { CategoryModel } from "src/types/category.model";
import { identity, pickBy } from "lodash";
import { routeCouponEdit, routeCouponHistory } from "src/constants/routes";
import { textChangeLanguage } from "src/lib/format";
import TableContainer from "@material-ui/core/TableContainer";
import { makeStyles } from "@material-ui/core/styles";
import { deleteCouponAction, getCouponAction, updateCouponAction } from "src/store/coupons.action";

const useStyles = makeStyles({
  table: {
    maxWidth: 1920,
    minWidth: 1740,
  },
  couponName: {
    width: 390,
  },
  couponCode: {
    width: 184,
  },
  redeemPeriod: {
    width: 268,
  },
  redeemLimit: {
    width: 184,
  },
});

export function CouponList() {
  const [openActionModal, setOpenActionModal] = useState(false);
  const [actionModal, setActionModal] = useState<"delete" | "action" | "confirm">("action");
  const [contentConfirm, setContentConfirm] = useState<string | undefined>();
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon>();
  const [searchParams, setSearchParams] = useState<CouponParams>({
    page: 1,
    pageSize: 5,
  });
  const { t } = useTranslation("common");
  const STATUS = getStatus(t, true).map((st) => st.title);
  const { coupons, isGettingCoupons } = useAppSelector((state) => state.coupons);
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const { data, total } = coupons;
  const totalPage = getTotalPage(total, searchParams.pageSize);

  useEffect(() => {
    dispatch(getCouponAction(searchParams));
  }, [JSON.stringify(searchParams)]);

  function handlePageChange(page: number, pageSize: number) {
    handleUpdateParams({ page, pageSize });
  }

  function handleConfirm() {
    if (actionModal === "delete") handleDeleteCoupon();
    if (actionModal === "action") handleUpdateStatus();
    if (actionModal === "confirm") setOpenActionModal(false);
  }

  function handleDeleteCoupon() {
    selectedCoupon &&
      dispatch(
        deleteCouponAction({
          id: selectedCoupon._id!,
          onSuccess,
          onError: (err) => onError(err?.message),
        }),
      );
  }

  function handleUpdateStatus() {
    selectedCoupon &&
      dispatch(
        updateCouponAction({
          payload: {
            _id: selectedCoupon._id,
            status: selectedCoupon.status === "Active" ? "Inactive" : "Active",
          },
          onSuccess,
          onError: (err) => onError(err?.message),
        }),
      );
  }

  function onSuccess() {
    const newParams = {
      ...searchParams,
      page:
        data.length === 1 && searchParams.page! > 1 ? searchParams.page! - 1 : searchParams.page,
    };
    setSearchParams(newParams);
    dispatch(getCouponAction(newParams));
    setOpenActionModal(false);
  }
  function onError(error?: string) {
    setOpenActionModal(true);
    setActionModal("confirm");
    setContentConfirm(error);
  }

  function handleUpdateParams(newParams: CouponParams) {
    const params = { ...searchParams, page: 1, ...newParams };
    setSearchParams(params);
  }

  function getRedeemLimitDisplay(type: "Coupon" | "User", redeem: RedeemLimit) {
    if (redeem.isUnlimited)
      return t(textChangeLanguage(`Unlimited per ${type}`.toLocaleLowerCase()) as "to_ship");
    if (type === "Coupon") {
      return `${formatNumber(redeem.limitAmount)} ${t(
        textChangeLanguage(redeem.frequency.toLocaleLowerCase()) as "to_ship",
      )}`;
    }
    if (type === "User")
      return `${formatNumber(redeem.limitAmount)} ${t(
        textChangeLanguage(`per User ${redeem.frequency}`.toLocaleLowerCase()) as "to_ship",
      )}`;
  }

  function handleDeleteResult(key: keyof CouponParams | "date" | "all") {
    let paramsMap = { ...searchParams };
    if (key === "date") {
      delete paramsMap["redeemStartDate"];
      delete paramsMap["redeemEndDate"];
    } else if (key === "all") {
      paramsMap = { page: searchParams.page, pageSize: searchParams.pageSize };
    } else delete paramsMap[key];
    setSearchParams(paramsMap);
  }

  const RESULTS_SEARCH: ChipType[] = (() => {
    const { redeemStartDate, redeemEndDate, status, keyword, discountCategory, locationBase } =
      searchParams;
    const dateStr = renderRangeDateStr(redeemStartDate, redeemEndDate, "DD-MM-YYYY");
    const trulyParams = pickBy(
      {
        discountCategory,
        status,
        date: dateStr,
        keyword,
        locationBase,
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
        if (chip.id === "discountCategory") {
          return {
            id: chip.id,
            name: t(textChangeLanguage(chip.name) as "to_ship"),
          };
        } else if (chip.id === "status") {
          return {
            id: chip.id,
            name: t(chip.name.toLocaleLowerCase() as "to_ship"),
          };
        } else if (chip.id === "locationBase") {
          return {
            id: chip.id,
            name: t(chip.name.toLocaleLowerCase() as "to_ship"),
          };
        } else if (chip.id === "date") {
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

  const publicDateSlice = (date: string) => {
    let result = "";
    if (date.includes("Unexpired")) {
      result =
        date.slice(0, 3) +
        t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") +
        date.slice(6, 12) +
        t(date.slice(12, 14).toLocaleLowerCase() as "to_ship") +
        date.slice(14, 15) +
        t(date.slice(15).toLocaleLowerCase() as "to_ship");
    } else {
      result = result =
        date.slice(0, 3) +
        t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") +
        date.slice(6, 12) +
        t(date.slice(12, 14).toLocaleLowerCase() as "to_ship") +
        date.slice(14, 18) +
        t(date.slice(18, 21).toLocaleLowerCase() as "to_ship") +
        date.slice(21);
    }

    return result;
  };

  return (
    <div className="m-5">
      <CouponSearchBox searchParams={searchParams} onSearchValueChange={handleUpdateParams} />
      {chipResult.length > 0 && (
        <ResultFor
          arrayResult={chipResult}
          onDelete={(key) => handleDeleteResult(key as keyof CouponParams | "date" | "all")}
          onClearAll={() => handleDeleteResult("all")}
        />
      )}

      <div className="p-5 shadow-boxWrapper rounded-primary  bg-white">
        <TableContainer style={{ minWidth: "100%" }}>
          <Table className={classes.table}>
            <TableHead>
              <CollapsibleHeadRow>
                <TableCell>{t("coupon-name")}</TableCell>
                <TableCell>{t("coupon-code")}</TableCell>
                <TableCell>{t("coupon-redeem-period")}</TableCell>
                <TableCell>{t("coupon-discount-category")}</TableCell>
                <TableCell>{t("coupon-redeem-limit")}</TableCell>
                <TableCell>{t("coupon-total-redeem")}</TableCell>
                <TableCell align="center">{t("status")}</TableCell>
                <TableCell align="center">{t("action")}</TableCell>
                <TableCell />
              </CollapsibleHeadRow>
            </TableHead>
            <TableBody>
              {isGettingCoupons ? (
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
                        <CollapsibleBodyRow
                          colSpan={9}
                          key={1}
                          preview={
                            <CouponPreview
                              categories={coupon.productCategories as CategoryModel[]}
                              description={coupon.description}
                            />
                          }
                        >
                          <TableCell className="max-w-[300px]">
                            <div className="truncate-2-line break-words">{coupon.name}</div>
                          </TableCell>
                          <TableCell className="max-w-[300px]">
                            <div className="truncate-2-line break-words">{coupon.code}</div>
                          </TableCell>
                          <TableCell>
                            {publicDateSlice(
                              renderRangeDateStr(coupon.redeemStartDate, coupon.redeemEndDate),
                            )}
                          </TableCell>
                          <TableCell className="max-w-[300px]">
                            <div className="truncate-2-line break-words">
                              {t(
                                textChangeLanguage(
                                  coupon.discountCategory,
                                ).toLocaleLowerCase() as "to_ship",
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="w-max">
                            <div>{getRedeemLimitDisplay("Coupon", coupon.couponRedeemLimit)}</div>
                            <div>{getRedeemLimitDisplay("User", coupon.userRedeemLimit)}</div>
                          </TableCell>
                          <TableCell className="max-w-[300px] truncate">
                            {formatNumber(coupon.totalRedeem)}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center">
                              <StatusDropdown
                                data={[]}
                                statusOptions={STATUS}
                                defaultValue={coupon.status.toLowerCase()}
                                onChange={(_, status) => {
                                  if (status === coupon.status) return;
                                  setActionModal("action");
                                  setOpenActionModal(true);
                                  setSelectedCoupon(coupon);
                                }}
                                trans={t}
                              />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center action-buttons-wrapper space-x-2">
                              <Link
                                to={toQueryString(routeCouponHistory, {
                                  couponId: coupon._id,
                                })}
                              >
                                <ActionButton action="history" />
                              </Link>
                              <Link
                                to={toQueryString(routeCouponEdit, {
                                  couponId: coupon._id,
                                })}
                              >
                                <ActionButton action="edit" />
                              </Link>
                              <ActionButton
                                disabled={!coupon.isAbleToDelete}
                                action="delete"
                                onClick={() => {
                                  setActionModal("delete");
                                  setOpenActionModal(true);
                                  setSelectedCoupon(coupon);
                                }}
                              />
                            </div>
                          </TableCell>
                        </CollapsibleBodyRow>
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
        </TableContainer>

        <div className="py-10">
          <Pagination
            totalPage={totalPage}
            onPageChange={(page, size) => handlePageChange(page, size)}
            onPageSizeChange={() => {}}
            notPreventChangeRoute={true}
            selectedPage={searchParams.page}
          />
        </div>

        <Modal
          content={contentConfirm}
          open={openActionModal}
          confirmType={actionModal}
          onClose={() => setOpenActionModal(false)}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
