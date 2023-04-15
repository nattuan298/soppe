import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import dayjs from "dayjs";

import Preview from "./preview";
import { FormatNumber } from "src/lib/format-number";
import { NoDataIcon } from "src/components/icons";
import StatusLabel from "./status-label";
import { fetchGetOrderList } from "src/store/order.action";
import { RootState } from "src/store";
import {
  ActionButton,
  ButtonLink,
  ChipType,
  CollapsibleBodyRow,
  CollapsibleHeadRow,
  InputDatePicker,
  Modal,
  Pagination,
  ResultFor,
  Search,
  Select,
  TableBody,
} from "src/components";
import "./styles.css";
import { usePaymentMethodOptions, useStatusOptions } from "./constants";
import { textChangeLanguage } from "src/lib/format";
import { getOrder } from "src/services/orders.services";

const queryString = require("query-string");

export default function OrderList() {
  const [statusFilter, setStatusFilter] = useState({
    id: "",
    name: "",
  });
  const [paymentFilter, setPaymentFilter] = useState({
    id: "",
    name: "",
  });
  const [search, setSearch] = useState({
    id: "",
    name: "",
  });
  const [dateRange, setDateRange] = useState({
    id: "",
    name: "",
    startDate: "",
    endDate: "",
  });
  const location = useLocation();
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [searchFilterChips, setSearchFilterChips] = useState<ChipType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const history = useHistory();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { orderData, loading } = useSelector((state: RootState) => state.orders);
  const [isModalDeleted, setIsModalDeleted] = useState<boolean>(false);

  const locationSearch = queryString.parse(location.search);
  const statusOptions = useStatusOptions();
  const paymentMethodOptions = usePaymentMethodOptions();

  const getData = useCallback(async () => {
    dispatch(
      fetchGetOrderList({
        page,
        pageSize,
        sortBy: "createdAt-DESC",
        status: statusFilter.name,
        paymentMethod: paymentFilter.name,
        keyword: search.name,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }),
    );
  }, [
    dateRange.endDate,
    dateRange.startDate,
    dispatch,
    page,
    pageSize,
    paymentFilter.name,
    search.name,
    statusFilter.name,
  ]);
  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    if (locationSearch.page) {
      setPage(locationSearch.page);
    }
  }, [locationSearch.page]);

  function handleSelectStatusFilter(status: string | null) {
    if (status) {
      setStatusFilter({
        id: "status",
        name: status,
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "status") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "status",
            name: status === "Cancel-Refund" ? "Cancel/Refund" : textChangeLanguage(status),
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }
  function handleSelectPaymentMethodFilter(payment: string | null) {
    if (payment) {
      setPaymentFilter({
        id: "payment",
        name: payment,
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "payment") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "payment",
            name: textChangeLanguage(payment),
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }
  function handleSubmitSearch(search: string) {
    const regex = /^ *$/;
    if (search && !regex.test(search)) {
      setSearch({
        id: "search",
        name: search.trim(),
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "search") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "search",
            name: search,
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }
  function handleSelectDate(startDate: Date | null, endDate: Date | null) {
    if (startDate && endDate) {
      const newValue = `${format(startDate, "dd-MM-yyyy")} to ${format(endDate, "dd-MM-yyyy")}`;

      setFrom(startDate);
      setTo(endDate);
      setDateRange({
        id: "date-range",
        name: newValue,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "date-range") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "date-range",
            name: newValue,
          },
        ];
      });
      history.push({ search: "?page=1" });
    }
  }
  function handleChangePage(pageNumber: number) {
    setPage(pageNumber);
  }
  function handleChangePageSize(pageSizeNumber: number) {
    setPageSize(pageSizeNumber);
  }
  function handleDeleteSearchFilter(id: string) {
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));
    if (id === "status") {
      setStatusFilter({
        id: "",
        name: "",
      });
    }
    if (id === "payment") {
      setPaymentFilter({
        id: "",
        name: "",
      });
    }
    if (id === "search") {
      setSearch({
        id: "",
        name: "",
      });
    }
    if (id === "date-range") {
      setDateRange({
        id: "",
        name: "",
        startDate: "",
        endDate: "",
      });
      setFrom(null);
      setTo(null);
    }
  }
  function handleClearAll() {
    setSearchFilterChips([]);
    setSearch({
      id: "",
      name: "",
    });
    setStatusFilter({
      id: "",
      name: "",
    });
    setPaymentFilter({
      id: "",
      name: "",
    });
    setDateRange({
      id: "",
      name: "",
      startDate: "",
      endDate: "",
    });
    setFrom(null);
    setTo(null);
  }

  const chipResults = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "status") {
          return {
            id: chip.id,
            name: t(chip.name as "to_pay"),
          };
        } else if (chip.id === "date-range") {
          return {
            id: chip.id,
            name: `${chip.name.slice(0, 11)} ${t("to") as "to_ship"} ${chip.name.slice(14)}`,
          };
        } else if (chip.id === "payment") {
          return {
            id: chip.id,
            name: t(chip.name as "to_pay"),
          };
        }
        return {
          id: chip.id,
          name: chip.name,
        };
      }),
    [t, searchFilterChips],
  );

  const dateSlice = (date: string) => {
    let result = "";

    result =
      date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);

    return result;
  };

  const checkAndRedirect = (url: string) => async (id: string) => {
    try {
      const response = await getOrder(id);
      if (response.statusCode === 404) {
        setIsModalDeleted(true);
      }
      if (response.statusCode) return;
      setTimeout(() => {
        history.push(url);
      }, 0);
    } catch (e) {
      //
    }
  };

  const handleConfirm = () => {
    setIsModalDeleted(false);
    getData();
  };

  return (
    <div className="order-list">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className="bg-white mb-5 px-5 search-filter"
      >
        <Grid item container xl={9} lg={9} spacing={3} sm={9} className="filter-group">
          <Grid item xl={3} lg={3} className="filter">
            <p>{t("status")}</p>
            <Select
              className="w-full"
              placeholder={t("all-statuses")}
              defaultValue={statusFilter.name}
              options={statusOptions}
              onChange={handleSelectStatusFilter}
            />
          </Grid>
          <Grid item xl={3} lg={3} className="filter">
            <p>{t("payment-method")}</p>
            <Select
              className="w-full"
              placeholder={t("all-payment-methods")}
              defaultValue={paymentFilter.name}
              options={paymentMethodOptions}
              onChange={handleSelectPaymentMethodFilter}
            />
          </Grid>
          <Grid item xl={3} lg={3} className="filter">
            <p>{t("date-range")}</p>
            <InputDatePicker
              className="h-12 float-left w-72 pl-4"
              handleSelect={handleSelectDate}
              defaultFrom={from}
              defaultTo={to}
              placeholder={t("all")}
            />
          </Grid>
        </Grid>
        <Grid item container xl={3} lg={3} sm={3} className="search-group">
          <Grid item className="w-full">
            <Search
              className="mr-7.5 w-full"
              placeholder={t`search`}
              onSearch={handleSubmitSearch}
              value={search.name}
            />
          </Grid>
        </Grid>
      </Grid>

      {chipResults.length > 0 && (
        <ResultFor
          arrayResult={chipResults}
          onDelete={handleDeleteSearchFilter}
          onClearAll={handleClearAll}
        />
      )}

      <div className="order-table bg-white">
        <Table>
          <TableHead>
            <CollapsibleHeadRow>
              <TableCell>{t("order")}</TableCell>
              <TableCell>{t("quantity")}</TableCell>
              <TableCell>{t("total-price")}</TableCell>
              <TableCell>{t("total-pv")}</TableCell>
              <TableCell width={150}>{t("date")}</TableCell>
              <TableCell>{t("payment-method")}</TableCell>
              <TableCell align="center" className="wide:w-[200px] w-[120px]">
                {t("status")}
              </TableCell>
              <TableCell align="center">{t("action")}</TableCell>
              <TableCell />
            </CollapsibleHeadRow>
          </TableHead>
          <TableBody loading={loading} colSpan={9} dataLength={orderData?.data?.length}>
            {!orderData?.data?.length && !loading && (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={10}>
                  <div className="text-center">
                    <NoDataIcon className="mx-auto mb-5" />
                    <span className="text-base">{t`no-data`}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {orderData?.data?.map((order) => (
              <CollapsibleBodyRow
                key={order._id}
                colSpan={9}
                preview={
                  <Preview
                    buyer={{
                      name: order.buyer.name,
                      id: order.buyer.memberId,
                      avatar: order.buyer.avatarImage,
                      documentStatus: order.buyer.documentStatus,
                    }}
                    shippingAddress={order.shippingAddress}
                    billingAddress={order.billingAddress}
                    pickupAddress={order.pickupAddress as any}
                  />
                }
              >
                <TableCell>
                  <span className="text-orange-light">
                    {t("order-id")}: {order.orderNumber}
                  </span>
                </TableCell>
                <TableCell>
                  <FormatNumber value={order.totalQuantity} />
                </TableCell>
                <TableCell>
                  <span className="text-orange-light">
                    <FormatNumber value={order.totalPrice} />
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-gray-dark">
                    <FormatNumber value={order.totalPv} />
                  </span>
                </TableCell>
                <TableCell>
                  {dateSlice(dayjs(order.createdAt).format("DD MMM YYYY HH:mm:ss"))}
                </TableCell>
                <TableCell>
                  {t(textChangeLanguage(order.paymentMethod).toLocaleLowerCase() as "to_ship")}
                </TableCell>
                <TableCell align="center">
                  <StatusLabel
                    status={order.status}
                    name={t(textChangeLanguage(order.status).toLocaleLowerCase() as "to_ship")}
                  />
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <div className="flex action-buttons-wrapper items-center">
                    <ActionButton
                      onClick={() =>
                        checkAndRedirect(
                          `/admin-dashboard/order-management/full-order-detail/${order._id}`,
                        )(order._id)
                      }
                      action="view"
                    />
                    <ActionButton
                      disabled={order.status !== "To Pay" && order.status !== "To Ship"}
                      onClick={() =>
                        checkAndRedirect(
                          `/admin-dashboard/order-management/edit-order/${order._id}`,
                        )(order._id)
                      }
                      action="edit"
                    />

                    <ButtonLink
                      to={`/admin-dashboard/order-management/order-tracking/${order._id}`}
                      variant="primary"
                      className="px-3.5 py-1"
                      disabled={
                        ["To Pay", "Pickup", "Pending"].includes(order.status) ||
                        (order.status === "To Review" && order.type === "Pickup")
                      }
                    >
                      {t("track-package")}
                    </ButtonLink>
                  </div>
                </TableCell>
              </CollapsibleBodyRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          totalPage={Math.ceil(orderData?.total / orderData?.limit)}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
        />
      </div>
      <Modal
        open={isModalDeleted}
        confirmType="confirm"
        onClose={handleConfirm}
        onConfirm={handleConfirm}
        confirmText={t`ok`}
        content={t`this_order_id_no_longer_exists`}
      />
    </div>
  );
}
