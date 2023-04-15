/* eslint-disable indent */
import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import TableRow from "@material-ui/core/TableRow";
import { NoDataIcon } from "src/components/icons";

// import { getInternalUserListThenAllRole } from "src/store/internal-user.slice";
import Preview from "./preview";
import { phoneNumberFormatter, textChangeLanguage } from "src/lib/format";
import {
  activateInternalUser,
  deactivateInternalUser,
  deleteInternalUser,
} from "src/services/internal-users.services";
import { RootState } from "src/store";
import {
  ActionButton,
  ButtonLink,
  ChipType,
  CollapsibleBodyRow,
  CollapsibleHeadRow,
  Modal,
  Pagination,
  ResultFor,
  Search,
  Select,
  StatusDropdown,
  TableBody,
  UserCard,
} from "src/components";
import "./styles.css";
import { InternalUserModel } from "src/types/internal-user.model";
import { getInternalUserListThenAllRole } from "src/store/internal-user.slice";

const queryString = require("query-string");

export default function InternalUserList() {
  const { t } = useTranslation("common");
  const [selectedInteralUser, setSelectedInternalUser] = useState<InternalUserModel>({
    roles: [],
    _id: "",
    firstName: "",
    lastName: "",
    status: "",
    jobType: "",
    email: "",
    phoneCode: "",
    phoneNumber: "",
    citizenship: "",
    dateOfBirth: "",
    salt: "",
    lastSignin: "",
    updatedAt: "",
    twoFaStatus: "",
    gender: "",
    avatarUrl: "",
  });
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
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(5);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { internalUserData, loading } = useSelector((state: RootState) => state.internalUsers);
  const { allRoleList } = useSelector((state: RootState) => state.roles);

  const locationSearch = queryString.parse(location.search);

  const getData = useCallback(async () => {
    if (page === 0) {
      return;
    }
    dispatch(
      getInternalUserListThenAllRole({
        page,
        pageSize,
        sortBy: "updatedAt-DESC",
        status: statusFilter.name,
        role: roleFilter.value,
        keyword: search.name,
      }),
    );
  }, [dispatch, statusFilter.name, search.name, roleFilter.value, page, pageSize]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (locationSearch.page) {
      setPage(locationSearch.page);
    } else {
      setPage(1);
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
            name: textChangeLanguage(status),
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }
  function handleSelectRoleFilter(role: string | null) {
    if (role) {
      const roleName = allRoleList?.find((data) => data._id === role);
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
  }
  function handlecDeleteAction(data: InternalUserModel) {
    setIsOpenModal(true);
    setConfirmType("delete");
    setSelectedInternalUser(data);
  }
  function handleChangeStatus(data: any, value: string) {
    setSelectedInternalUser(data);
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
          await activateInternalUser(selectedInteralUser._id);
          setIsOpenModal(false);
          handleUpdateTable();
        } catch (e) {
          //
        }
      }
      if (userStatus === "inactive") {
        try {
          await deactivateInternalUser(selectedInteralUser._id);
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
        await deleteInternalUser(selectedInteralUser._id);
        setIsOpenModal(false);
        handleDelete();
      } catch (e) {
        //
      }
    }
  }
  function handleSubmitSearch(search: string) {
    if (search) {
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

  function handleDelete() {
    if (internalUserData.data.length === 1 && page > 1) {
      setPage((page) => page - 1);
    } else {
      getData();
    }
  }

  const chipResult = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "status") {
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
    <div className="internal-user-list">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className="bg-white mb-5 px-5 search-filter"
      >
        <Grid item container xl={5} lg={5} spacing={3} className="filter-group">
          <Grid item xl={6} lg={6} className="filter">
            <p>{t("status")}</p>
            <Select
              className="w-full"
              placeholder={t("all-statuses")}
              defaultValue={statusFilter.name}
              options={statusOptions}
              onChange={handleSelectStatusFilter}
            />
          </Grid>
          <Grid item xl={6} lg={6} className="filter">
            <p>{t("role")}</p>
            <Select
              className="w-full"
              placeholder={t("all-roles")}
              defaultValue={roleFilter.name}
              options={
                allRoleList?.length > 0
                  ? allRoleList?.map((role) => ({
                      title: role.name,
                      value: role._id,
                    }))
                  : []
              }
              onChange={handleSelectRoleFilter}
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
              to="/admin-dashboard/internal-user-management/create-new-internal-user-account"
              variant="text"
              className="bg-orange-light text-white h-full hover:bg-orange-hover"
            >
              {t("create-new-account")}
            </ButtonLink>
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

      <div className="internal-user-table bg-white">
        <Table>
          <TableHead>
            <CollapsibleHeadRow>
              <TableCell>{t("name")}</TableCell>
              <TableCell>{t("phone-Number")}</TableCell>
              <TableCell>{t("email")}</TableCell>
              <TableCell>{t("job-title")}</TableCell>
              <TableCell width="10%">{t("last-signin")}</TableCell>
              <TableCell align="center">{t("status")}</TableCell>
              <TableCell>{t("action")}</TableCell>
              <TableCell />
            </CollapsibleHeadRow>
          </TableHead>
          <TableBody loading={loading} colSpan={8} dataLength={internalUserData?.data?.length}>
            {!internalUserData?.data?.length && !loading && (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={10}>
                  <div className="text-center">
                    <NoDataIcon className="mx-auto mb-5" />
                    <span className="text-base">{t`no-data`}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {internalUserData?.data?.map((internalUser: InternalUserModel) => (
              <CollapsibleBodyRow
                key={internalUser._id}
                colSpan={8}
                preview={
                  <Preview
                    lastModified={dayjs(internalUser.updatedAt).format("DD-MM-YYYY HH:MM:ss")}
                    dateOfBirth={dayjs(internalUser.dateOfBirth).format("DD-MM-YYYY")}
                    gender={t(internalUser.gender.toLocaleLowerCase() as "to_ship")}
                    citizenship={t(internalUser.citizenship.toLocaleLowerCase() as "to_ship")}
                    twoFaStatus={internalUser.googleAuth ? t`on-radio` : t`off-radio`}
                    roles={internalUser.roles}
                  />
                }
              >
                <TableCell>
                  <UserCard
                    name={`${internalUser.firstName} ${internalUser.lastName}`}
                    avatar={internalUser.avatarUrl}
                  />
                </TableCell>
                <TableCell>
                  {phoneNumberFormatter(internalUser.phoneCode, internalUser.phoneNumber)}
                </TableCell>
                <TableCell>
                  <div className="wide:max-w-max max-w-[150px] truncate">{internalUser.email}</div>
                </TableCell>
                <TableCell>{internalUser.jobType}</TableCell>
                <TableCell className="max-w-[150px]">
                  <div className="max-w-[120px]">
                    {internalUser.lastSignin
                      ? dateSlice(dayjs(internalUser.lastSignin).format("DD MMM YYYY HH:mm:ss"))
                      : ""}
                  </div>
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center">
                    <StatusDropdown
                      data={internalUser}
                      statusOptions={["active", "inactive"]}
                      defaultValue={internalUser.status.toLowerCase()}
                      onChange={handleChangeStatus}
                      trans={t}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex action-buttons-wrapper">
                    <Link
                      to={`/admin-dashboard/internal-user-management/edit-internal-user-account/${internalUser._id}`}
                    >
                      <ActionButton action="edit" />
                    </Link>
                    <ActionButton
                      action="delete"
                      onClick={() => handlecDeleteAction(internalUser)}
                    />
                  </div>
                </TableCell>
              </CollapsibleBodyRow>
            ))}
          </TableBody>
        </Table>

        <Pagination
          totalPage={Math.ceil(internalUserData?.total / internalUserData?.limit)}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
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
