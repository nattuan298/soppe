import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "src/store";
import {
  Button,
  ChipType,
  CollapsibleBodyRow,
  CollapsibleHeadRow,
  InputDatePicker,
  Pagination,
  ResultFor,
  Search,
  Spinner,
  UserCard,
} from "src/components";
import "./styles.css";
import { format } from "date-fns";
import { NoDataIcon } from "src/components/icons";
import { InternalUserHistoryModel } from "src/types/flatform.model";
import { phoneNumberFormatter } from "src/lib/format";
import { fetchInternalUserHistoryList } from "src/store/internal-access-history.action";
import { getLinkInternalUserHistory } from "src/services/export-data.services";
import Preview from "./preview";
const queryString = require("query-string");

export default function InternalAccessHistoryList() {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  const [from, setFrom] = useState<Date | null>(firstDay);
  const [to, setTo] = useState<Date | null>(lastDay);
  const [loadingExport, setLoadingExport] = useState<boolean>(false);
  const [searchFilterChips, setSearchFilterChips] = useState<ChipType[]>([]);
  const [search, setSearch] = useState({
    id: "",
    name: "",
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { t } = useTranslation("common");
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { InternalUserHistoryData, loading, errorMessage } = useSelector(
    (state: RootState) => state.internalUserHistory,
  );
  const locationSearch = queryString.parse(location.search);
  const getData = useCallback(async () => {
    dispatch(
      fetchInternalUserHistoryList({
        page,
        pageSize,
        keyword: search.name,
        startDate: from?.toISOString(),
        endDate: to?.toISOString(),
      }),
    );
  }, [dispatch, search.name, page, pageSize, from, to]);
  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    if (InternalUserHistoryData?.data?.length === 0 && !loading && errorMessage) {
      return;
    }
  }, [InternalUserHistoryData, loading, errorMessage, t]);
  useEffect(() => {
    if (locationSearch.page) {
      setPage(locationSearch.page);
    }
  }, [locationSearch.page]);

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
        setFrom(null);
        setTo(null);
        setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "Date"));
      }
    },
    [history],
  );
  function handleDeleteSearchFilter(id: string) {
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));

    if (id === "search") {
      setSearch({
        id: "",
        name: "",
      });
    }
    if (id === "Date") {
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
    setFrom(null);
    setTo(null);
  }
  async function handleExport() {
    setLoadingExport(true);
    getLinkInternalUserHistory({
      keyword: search.name,
      startDate: from?.toISOString(),
      endDate: to?.toISOString(),
    }).then((res) => {
      setLoadingExport(false);
      window.open(`${res}`, "_self");
    });
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

  const chipResult = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "Date") {
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

  return (
    <div className="access-history-list">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className="bg-white mb-5 px-5 search-filter"
      >
        <Grid item container xl={7} lg={7} spacing={2} className="filter-group">
          <Grid item xl={5} lg={5} className="filter">
            <p>{t("date-range")}</p>
            <InputDatePicker
              handleSelect={handleSelectDate}
              className="h-12 w-full focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
              defaultFrom={from}
              defaultTo={to}
              placeholder={t`all`}
            />
          </Grid>
        </Grid>
        <Grid item container xl={5} lg={5} className="search-group">
          <Grid item xl={7} lg={7}>
            <Search
              className="w-full"
              placeholder={t`search`}
              onSearch={handleSubmitSearch}
              value={search.name}
            />
          </Grid>
          <Grid item xl={5} lg={5}>
            <Button
              onClick={handleExport}
              variant="text"
              className="bg-orange-light text-white h-full hover:bg-orange-hover w-full"
              loading={loadingExport}
              loadingSize={20}
            >
              {t("export")}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      {chipResult.length > 0 && (
        <ResultFor
          arrayResult={chipResult}
          onDelete={handleDeleteSearchFilter}
          onClearAll={handleClearAll}
        />
      )}

      <div className="faq-table bg-white">
        <Table>
          <TableHead>
            <CollapsibleHeadRow>
              <TableCell>{t("name")}</TableCell>
              <TableCell>{t("phone-number")}</TableCell>
              <TableCell>{t("email")}</TableCell>
              <TableCell>{t("type")}</TableCell>
              <TableCell>{t("os")}</TableCell>
              <TableCell>{t("ip")}</TableCell>
              <TableCell>{t("date")}</TableCell>
              <TableCell />
            </CollapsibleHeadRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={11}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              InternalUserHistoryData?.data?.map((history: InternalUserHistoryModel) => (
                <CollapsibleBodyRow
                  colSpan={9}
                  key={history._id}
                  preview={
                    <Preview
                      lastModified={dayjs(history.updatedAt).format("DD-MM-YYYY HH:MM:ss")}
                      dateOfBirth={dayjs(history.dateOfBirth).format("DD-MM-YYYY")}
                      gender={history.gender}
                      citizenship={history.citizenship}
                      twoFaStatus={history.twoFactorStatus ? t`on-radio` : t`off-radio`}
                      roles={history.roles}
                    />
                  }
                >
                  <TableCell>
                    <UserCard
                      name={`${history.firstName} ${history.lastName}`}
                      avatar={history.imageUrl}
                    />
                  </TableCell>
                  <TableCell>
                    {history.phoneNumber &&
                      phoneNumberFormatter(history.phoneCode, history.phoneNumber)}
                  </TableCell>
                  <TableCell>
                    <div className="wide:max-w-max max-w-[150px] truncate">{history.email}</div>
                  </TableCell>
                  <TableCell>{history.type}</TableCell>
                  <TableCell>{history.OS}</TableCell>
                  <TableCell>{history.IP}</TableCell>
                  <TableCell className="max-w-[150px]">
                    <div className="max-w-[120px]">
                      {history.createdAt && dayjs(history.createdAt).format("DD MMM YYYY HH:mm:ss")}
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                </CollapsibleBodyRow>
              ))
            )}
            {(!InternalUserHistoryData?.data || InternalUserHistoryData?.data?.length === 0) &&
              !loading && (
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
          totalPage={Math.ceil(InternalUserHistoryData?.total / InternalUserHistoryData?.limit)}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
          notPreventChangeRoute
          selectedPage={page}
        />
      </div>
    </div>
  );
}
