/* eslint-disable indent */
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { useStyles } from "./styles";
import { RootState } from "src/store";
import {
  ActionButton,
  ButtonLink,
  ChipType,
  Modal,
  Pagination,
  ResultFor,
  Search,
  Select,
  Spinner,
  StatusDropdown,
} from "src/components";
import "./styles.css";
import { InputDatePicker2 } from "src/components/date-range-2";
import { format } from "date-fns";
import { FAQModel } from "src/types/faq.model";
import { activateFAQ, deactivateFAQ, deleteFAQ } from "src/services/faq.services";
import { NoDataIcon } from "src/components/icons";
import { getCategoryFaqAction, getFaqAction } from "src/store/faq.action";
const queryString = require("query-string");

export default function FAQList() {
  const { root, body } = useStyles();
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
  const [clearExpired, setClearExpired] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<FAQModel>({
    _id: "",
    question: {
      en: "",
      th: "",
    },
    createdAt: "",
    publishStartDate: "",
    publishEndDate: "",
    status: "",
    views: 0,
    helpful: 0,
    notHelpful: 0,
    category: {
      _id: "",
      name: "",
    },
    answer: {
      en: "",
      th: "",
    },
    id: "",
  });
  const { t } = useTranslation("common");
  const lang = localStorage.getItem("i18nextLng");
  const [userStatus, setUserStatus] = useState("");
  const [searchFilterChips, setSearchFilterChips] = useState<ChipType[]>([]);
  const [search, setSearch] = useState({
    id: "",
    name: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");
  const [statusFilter, setStatusFilter] = useState({
    id: "",
    name: "",
  });
  const [roleFilter, setRoleFilter] = useState({
    id: "",
    name: "",
    value: "",
  });
  const statusOptions = [
    {
      title: t("active"),
      value: "Active",
    },
    {
      title: t("inactive"),
      value: "Inactive",
    },
  ];

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { FAQData, loading } = useSelector((state: RootState) => state.faq);
  const { categoryFAQData } = useSelector((state: RootState) => state.faq);

  const locationSearch = queryString.parse(location.search);
  const getData = useCallback(async () => {
    dispatch(
      getFaqAction({
        page,
        pageSize,
        status: statusFilter.name,
        category: roleFilter.value,
        keyword: search.name,
        publishStartDate: from?.toISOString(),
        publishEndDate: to?.toISOString(),
      }),
    );
    dispatch(getCategoryFaqAction());
  }, [dispatch, statusFilter.name, search.name, roleFilter.value, page, pageSize, from, to]);
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
            name: status,
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }
  function handleSelectCategoryFilter(role: string | null) {
    if (role) {
      const roleName = categoryFAQData?.find((data) => data._id === role);
      setRoleFilter({
        id: "role",
        name: roleName ? roleName.name : "",
        value: role,
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "role") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "role",
            name: roleName ? roleName.name : "",
            value: role,
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }
  const handleSelectDate = useCallback(
    (startDate, endDate) => {
      setFrom(startDate);
      setTo(endDate);
      if (startDate) {
        const newValue = `${startDate && format(startDate, "dd-MM-yyyy")} to ${
          endDate ? format(endDate, "dd-MM-yyyy") : "Unexpired"
        }`;
        setSearchFilterChips((prevState) => {
          for (let i = 0; i < prevState.length; i++) {
            if (prevState[i] && prevState[i].id === "Date") prevState.splice(i, 1);
          }
          return [
            ...prevState,
            {
              id: "Date",
              name: newValue,
            },
          ];
        });
        history.push({
          search: "?page=1",
        });
        setPage(1);
      } else {
        setFrom(undefined);
        setTo(undefined);
        setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "Date"));
      }
    },
    [history],
  );
  function handleDeleteSearchFilter(id: string) {
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));
    if (id === "status") {
      setStatusFilter({
        id: "",
        name: "",
      });
    }
    if (id === "role") {
      setRoleFilter({
        id: "",
        name: "",
        value: "",
      });
    }
    if (id === "search") {
      setSearch({
        id: "",
        name: "",
      });
    }
    if (id === "Date") {
      setFrom(undefined);
      setTo(undefined);
      setClearExpired(!clearExpired);
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
    setRoleFilter({
      id: "",
      name: "",
      value: "",
    });
    setClearExpired(!clearExpired);
    setFrom(undefined);
    setTo(undefined);
  }
  function handlecDeleteAction(data: FAQModel) {
    setIsOpenModal(true);
    setConfirmType("delete");
    setSelectedFAQ(data);
  }
  function handleChangeStatus(data: any, value: string) {
    setSelectedFAQ(data);
    setUserStatus(value);
    if (value !== data.status) {
      setIsOpenModal(true);
      setConfirmType("action");
    }
  }
  function handleCancelConfirm() {
    setIsOpenModal(false);
  }
  async function handleConfirm() {
    if (confirmType === "action") {
      if (userStatus === "active") {
        try {
          await activateFAQ(selectedFAQ._id);
          setIsOpenModal(false);
          handleUpdateTable();
        } catch (e) {
          //
        }
      }
      if (userStatus === "inactive") {
        try {
          await deactivateFAQ(selectedFAQ._id);
          setIsOpenModal(false);
          handleUpdateTable();
        } catch (e) {
          //
        }
      }
      setIsOpenModal(false);
    }
    if (confirmType === "delete") {
      try {
        await deleteFAQ(selectedFAQ._id);
        setIsOpenModal(false);
        handleUpdateTable();
      } catch (e) {
        //
      }
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
  function handleChangePage(pageNumber: number) {
    setPage(pageNumber);
  }
  function handleChangePageSize(pageSizeNumber: number) {
    setPageSize(pageSizeNumber);
  }
  function handleUpdateTable() {
    getData();
    setPage(1);
  }

  const chipResults = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "status") {
          return {
            id: chip.id,
            name: t(chip.name.toLocaleLowerCase() as "to_pay"),
          };
        } else if (chip.id === "Date") {
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
    [t, searchFilterChips],
  );

  const dateSlice = (date: string) => {
    let result = "";

    result =
      date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);

    return result;
  };

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
    <div className="faq-list">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className="bg-white mb-5 px-5 search-filter"
      >
        <Grid item container xl={7} lg={7} spacing={2} className="filter-group">
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
            <p>{t("category")}</p>
            <Select
              className="w-full"
              placeholder={t("all-categories")}
              defaultValue={roleFilter.name}
              options={
                categoryFAQData?.length > 0
                  ? categoryFAQData?.map((category) => ({
                      title: category.name,
                      value: category._id,
                    }))
                  : []
              }
              onChange={handleSelectCategoryFilter}
            />
          </Grid>
          <Grid item xl={5} lg={5} className="filter">
            <p>{t("publish-date-range")}</p>
            <InputDatePicker2
              handleSelect={handleSelectDate}
              className="h-12 w-full focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
              defaultFrom={from}
              defaultTo={to}
              placeholder={t`all`}
              clearExpired={clearExpired}
            />
          </Grid>
        </Grid>
        <Grid item container xl={4} lg={5} className="search-group">
          <Grid item xl={7} lg={7}>
            <Search
              className="mr-7.5 w-full"
              placeholder={t`search`}
              onSearch={handleSubmitSearch}
              value={search.name}
            />
          </Grid>
          <Grid item xl={5} lg={5}>
            <ButtonLink
              to="/admin-dashboard/FAQ/create-new-FAQ"
              variant="text"
              className="bg-orange-light text-white h-full hover:bg-orange-hover"
            >
              {t("add-new-faq")}
            </ButtonLink>
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

      <div className="faq-table bg-white">
        <Table>
          <TableHead>
            <TableRow className={root}>
              <TableCell>{t("question")}</TableCell>
              <TableCell>{t("created-date")}</TableCell>
              <TableCell>{t("publish-period")}</TableCell>
              <TableCell>{t("category")}</TableCell>
              <TableCell>{t("views")}</TableCell>
              <TableCell>{t("helpful")}</TableCell>
              <TableCell>{t("not-helpful")}</TableCell>
              <TableCell align="center">{t("status")}</TableCell>
              <TableCell align="center">{t("action")}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={10}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              FAQData?.data?.map((FAQ: FAQModel) => (
                <TableRow className={body}>
                  <TableCell>
                    <div className="truncate-2-line">
                      {lang === "en"
                        ? `${FAQ.question.en ? FAQ.question.en : FAQ.question.th}`
                        : `${FAQ.question.th ? FAQ.question.th : FAQ.question.en}`}
                    </div>
                  </TableCell>
                  <TableCell width="10%">
                    {FAQ.createdAt
                      ? dateSlice(dayjs(FAQ.createdAt).format("DD MMM YYYY HH:mm:ss"))
                      : ""}
                  </TableCell>
                  <TableCell width="10%">
                    {FAQ.publishStartDate &&
                      dateSlice(dayjs(FAQ.publishStartDate).format("DD MMM YYYY"))}{" "}
                    {t("to")}{" "}
                    {FAQ.publishEndDate
                      ? dateSlice(dayjs(FAQ.publishEndDate).format("DD MMM YYYY"))
                      : t("unexpired")}
                  </TableCell>
                  <TableCell width="10%">
                    <div className="truncate-2-line">{FAQ.category?.name}</div>
                  </TableCell>
                  <TableCell width="10%">
                    {new Intl.NumberFormat("en-US").format(FAQ.views)}
                  </TableCell>
                  <TableCell width="10%">
                    {new Intl.NumberFormat("en-US").format(FAQ.helpful)}
                  </TableCell>
                  <TableCell width="10%">
                    {new Intl.NumberFormat("en-US").format(FAQ.notHelpful)}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center">
                      <StatusDropdown
                        data={FAQ}
                        statusOptions={["active", "inactive"]}
                        defaultValue={FAQ.status.toLowerCase()}
                        onChange={handleChangeStatus}
                        trans={t}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center action-buttons-wrapper">
                      <Link to={`/admin-dashboard/FAQ/full-FAQ-detail/${FAQ._id}`}>
                        <ActionButton action="view" />
                      </Link>
                      <Link to={`/admin-dashboard/FAQ/edit-FAQ/${FAQ._id}`}>
                        <ActionButton action="edit" />
                      </Link>
                      <ActionButton action="delete" onClick={() => handlecDeleteAction(FAQ)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
            {(!FAQData.data || FAQData.data.length === 0) && !loading && (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={10}>
                  <div className="text-center">
                    <NoDataIcon className="mx-auto mb-5" />
                    <span className="text-base">{t`no-data`}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Pagination
          totalPage={Math.ceil(FAQData?.total / FAQData?.limit)}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
          notPreventChangeRoute={true}
        />

        <Modal
          open={isOpenModal}
          confirmType={confirmType}
          onClose={handleCancelConfirm}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
