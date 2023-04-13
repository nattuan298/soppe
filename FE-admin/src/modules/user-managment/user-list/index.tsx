/* eslint-disable indent */
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import clsx from "clsx";
import { phoneNumberFormatter, textChangeLanguage } from "src/lib/format";
import { RootState } from "src/store";
import {
  ActionButton,
  ChipType,
  CollapsibleBodyRow,
  CollapsibleHeadRow,
  Pagination,
  ResultFor,
  Search,
  Select,
  Spinner,
  UserCard,
} from "src/components";
import "./user-management.css";
import { LabelStatus } from "src/components/label";
import { resetUser } from "src/store/user.slice";
import { SelectCountry2 } from "src/components/select-country-2";
import Preview from "./preview";
import { NoDataIcon } from "src/components/icons";
import { userModel } from "src/types/user.model";
import { getUserAction } from "src/store/user.action";

const queryString = require("query-string");

export default function UserList() {
  const { t } = useTranslation("common");
  const statusOptions = [
    {
      title: t("active"),
      value: "Active",
    },
    {
      title: t("terminate"),
      value: "Terminate",
    },
    {
      title: t("expired"),
      value: "Expired",
    },
  ];
  const [searchFilterChips, setSearchFilterChips] = useState<ChipType[]>([]);
  const [searchFilter, setSearchFilter] = useState({
    id: "",
    search: "",
  });
  const [statusFilter, setStatusFilter] = useState({
    id: "",
    name: "",
  });
  const [locationFilter, setLocationFilter] = useState({
    id: "locationBase",
    name: "Thailand",
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { userData, loading } = useSelector((state: RootState) => state.users);
  const locationSearch = queryString.parse(location.search);
  const getData = useCallback(() => {
    dispatch(
      getUserAction({
        page,
        pageSize,
        locationBase: locationFilter.name,
        status: statusFilter.name,
        search: searchFilter.search,
      }),
    );
  }, [dispatch, page, pageSize, statusFilter.name, locationFilter.name, searchFilter.search]);
  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    if (locationSearch.page) {
      setPage(locationSearch.page);
    }
  }, [locationSearch.page]);

  function handleChangeLocation(value: string) {
    if (value) {
      setLocationFilter({
        id: "locationBase",
        name: value,
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "locationBase") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "locationBase",
            name: value,
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }
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
            name: status === "Expire" ? "Expired" : textChangeLanguage(status),
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }

  function handleDeleteSearchFilter(id: string) {
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));
    if (id === "status") {
      setStatusFilter({
        id: "",
        name: "",
      });
    }
    if (id === "locationBase") {
      setLocationFilter({
        id: "locationBase",
        name: "Thailand",
      });
    }
    if (id === "search") {
      setSearchFilter({
        id: "",
        search: "",
      });
    }
  }
  function handleClearAll() {
    setSearchFilterChips([]);
    setSearchFilter({
      id: "",
      search: "",
    });
    setStatusFilter({
      id: "",
      name: "",
    });
    setLocationFilter({
      id: "locationBase",
      name: "Thailand",
    });
  }
  function handleSubmitSearch(search: string) {
    const searchFilterArray = [
      statusFilter,
      {
        id: "search",
        name: search,
      },
    ];
    // setSearchFilterChips(searchFilterArray.filter((item) => item.id && item.name));
    setSearchFilter({
      id: "search",
      search,
    });
    // setPage(1);
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
  function handleChangePage(pageNumber: number) {
    setPage(pageNumber);
  }
  function handleChangePageSize(pageSizeNumber: number) {
    setPageSize(pageSizeNumber);
  }

  const chipResult = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "locationBase") {
          return {
            id: chip.id,
            name: t(chip.name.toLocaleLowerCase() as "pending"),
          };
        } else if (chip.id === "status") {
          return {
            id: chip.id,
            name: t(chip.name as "pending"),
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

  return (
    <div className="user-list">
      <div className="bg-white rounded-navbar flex justify-between items-center mb-5 px-5 search-filter">
        <div className="filter-group flex">
          <div className="filter mr-6">
            <p>{t("status")}</p>
            <Select
              className="dropdown"
              placeholder={t("all-statuses")}
              options={statusOptions}
              onChange={handleSelectStatusFilter}
              defaultValue={statusFilter.name}
            />
          </div>
          <div className="filter ">
            <p>{t("location-base")}</p>
            <SelectCountry2
              country={locationFilter.name}
              onSelect={handleChangeLocation}
              className="dropdown"
            />
          </div>
        </div>
        <div className="search-group flex">
          <Search
            className="mr-7.5 search-input"
            onSearch={handleSubmitSearch}
            placeholder={t`search`}
            value={searchFilter.search}
          />
        </div>
      </div>

      {searchFilterChips.length > 0 && (
        <ResultFor
          arrayResult={chipResult}
          onDelete={handleDeleteSearchFilter}
          onClearAll={handleClearAll}
        />
      )}

      <TableContainer className="user-table bg-white">
        <Table>
          <TableHead>
            <CollapsibleHeadRow>
              <TableCell align="left">{t("name")}</TableCell>
              <TableCell align="center">{t("member-id")}</TableCell>
              <TableCell align="left">{t("phone-Number")}</TableCell>
              <TableCell align="center">{t("matching")}</TableCell>
              <TableCell align="center">{t("document")}</TableCell>
              <TableCell align="center">{t("expired-date")}</TableCell>
              <TableCell align="center">{t("status")}</TableCell>
              <TableCell align="center">{t("action")}</TableCell>
              <TableCell />
            </CollapsibleHeadRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={8}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              userData.data?.map((userItem: userModel) => (
                <CollapsibleBodyRow
                  key={1}
                  colSpan={9}
                  memberid={userItem.memberId}
                  preview={
                    <Preview
                      email={userItem.email}
                      dateOfBirth={dayjs(userItem.dateOfBirth).format("DD-MM-YYYY")}
                      gender={userItem.gender}
                      citizenship={userItem.citizenship}
                      facebookConnect={userItem.facebookAuth ? t("on-radio") : t("off-radio")}
                      FAStatus={userItem.googleAuth ? t("on-radio") : t("off-radio")}
                      shippingAddress={userItem.shippingAddress}
                      billingAddress={userItem.billingAddress}
                      sponsorData={userItem.sponsor}
                    />
                  }
                >
                  <TableCell align="left">
                    <UserCard
                      name={userItem.name ? userItem.name : ""}
                      avatar={`${userItem.avatar}`}
                    />
                  </TableCell>
                  <TableCell align="center">{userItem.memberId}</TableCell>
                  <TableCell align="left">
                    {" "}
                    {userItem.phoneNumber &&
                      phoneNumberFormatter(userItem.phoneCode, userItem.phoneNumber)}
                  </TableCell>
                  <TableCell align="center">{userItem.matching}</TableCell>
                  <TableCell align="center">
                    <span
                      className={clsx(
                        userItem.documentStatus === "Complete"
                          ? "document-status-complete"
                          : "document-status-pending",
                      )}
                    >
                      {t(
                        textChangeLanguage(
                          userItem.documentStatus,
                        ).toLocaleLowerCase() as "to_ship",
                      )}
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    {dateSlice(dayjs(userItem.expiredDate).format("DD MMM YYYY"))}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex justify-center">
                      <LabelStatus defaultValue={userItem.status ? userItem.status : ""} />
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex action-buttons-wrapper justify-center">
                      <Link
                        to={`/admin-dashboard/user-management/edit-user-information/${userItem.memberId}`}
                      >
                        <ActionButton action="edit" onClick={() => dispatch(resetUser())} />
                      </Link>
                      <ActionButton action="delete" disabled />
                    </div>
                  </TableCell>
                </CollapsibleBodyRow>
              ))
            )}
            {(!userData.data || userData?.data?.length === 0) && !loading && (
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
          totalPage={Math.round(userData.total / userData.limit)}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
        />
      </TableContainer>
    </div>
  );
}
