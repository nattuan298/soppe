import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Box from "@material-ui/core/Box";
import { useHistory, useLocation } from "react-router-dom";

import { RootState } from "src/store";
import { notifyToast } from "src/constants/toast";
import { fetchBannerLoopList } from "src/store/internal-banner-loop.action";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { InternalBannerLoopModel } from "src/types/internal-banner-loop.model";
import { GenericTable as Table } from "src/components/generic-table";
import { BannerListHeader } from "./baner-list-header";
import { NavbarBannerList } from "./navbar-banner-list";
import { ActionButton, ButtonLink, Modal, StatusDropdown } from "src/components";
import {
  deleteInternalBannerLoopService,
  editInternalBannerLoopService,
} from "src/services/internal-banner-loop.services";
import "./styles.css";

export function BannerLoopList() {
  const [params, setParams] = useState<ParamListRequestBannerLoopModel>();
  const [selectedInternalBannerLoop, setSelectedInternalBannerLoop] =
    useState<InternalBannerLoopModel>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");

  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { internalBannerLoopData, loading } = useSelector(
    (state: RootState) => state.internalBannerLoop,
  );

  const header = useMemo(() => <BannerListHeader />, []);

  const getData = useCallback(() => {
    if (!params) {
      return;
    }
    const { page, pageSize, status, keyword, startDate, endDate, countryCode } = params;
    sessionStorage.setItem("banner-loop-page", `${page}`);
    if (page && pageSize) {
      dispatch(
        fetchBannerLoopList({
          page,
          pageSize,
          startDate,
          endDate,
          status,
          keyword,
          countryCode,
          sortBy: "createdAt-DESC",
        }),
      );
    }
  }, [dispatch, params]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChangeStatus = (data: InternalBannerLoopModel, value: string) => {
    if (value.toUpperCase() !== data.status.toUpperCase()) {
      setSelectedInternalBannerLoop({ ...data, status: value.toUpperCase() });
      setIsOpenModal(true);
      setConfirmType("action");
    }
  };

  const handleCancelConfirm = () => {
    setIsOpenModal(false);
    setSelectedInternalBannerLoop(undefined);
  };

  const handlecDeleteAction = (data: InternalBannerLoopModel) => {
    setIsOpenModal(true);
    setConfirmType("delete");
    setSelectedInternalBannerLoop(data);
  };
  const handleConfirm = useCallback(async () => {
    try {
      if (!selectedInternalBannerLoop) {
        return;
      }
      if (confirmType === "action") {
        const { updatedAt, createdAt, __v, url, ...body } = selectedInternalBannerLoop;
        const response = await editInternalBannerLoopService(body);
        if (!response?.statusCode) {
          getData();
        }
      } else if (confirmType === "delete") {
        const response = await deleteInternalBannerLoopService(selectedInternalBannerLoop._id);
        if (!response?.statusCode) {
          if (internalBannerLoopData.data.length === 1) {
            if (params && params.page && params.page > 1) {
              const pathname = location.pathname;
              history.push({ pathname, search: `?page=${params.page - 1}` });
            } else {
              getData();
            }
          } else {
            getData();
          }
        }
      }
      setIsOpenModal(false);
      setSelectedInternalBannerLoop(undefined);
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
      setIsOpenModal(false);
    }
  }, [
    confirmType,
    selectedInternalBannerLoop,
    internalBannerLoopData,
    params,
    location,
    history,
    getData,
    t,
  ]);

  const renderRow = useCallback(
    (item: InternalBannerLoopModel) => {
      const { _id, name, createdAt, status } = item;


      const titleCreateAt = format(new Date(createdAt ?? new Date), "dd LLL yyyy HH:mm:ss");
      const [firstChar, ...restChar] = status;
      const defaultStatus = firstChar + restChar.join("").toLocaleLowerCase();



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

      const dateSlice = (date: string) => {
        let result = "";

        result =
          date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);

        return result;
      };

      return (
        <TableRow>
          <TableCell align="left">
            <div className="name-banner flex w-64 wide:w-84">{name}</div>
          </TableCell>
          <TableCell align="left">
            <Box maxWidth={100}>{dateSlice(titleCreateAt)}</Box>
          </TableCell>

          <TableCell align="center">
            <StatusDropdown
              data={item}
              statusOptions={["active", "inactive"]}
              defaultValue={defaultStatus.toLowerCase()}
              onChange={handleChangeStatus}
              trans={t}
            />
          </TableCell>
          <TableCell align="center">
            <Box >
              <div className="flex action-buttons-wrapper justify-center items-center">
                <ButtonLink
                  to={`/admin-dashboard/appearance-management/home-banner-management/banner-loop-list/edit-banner-loop/${_id}`}
                >
                  <ActionButton action="edit" />
                </ButtonLink>
                <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
              </div>
            </Box>
          </TableCell>
        </TableRow>
      );
    },
    [t],
  );

  return (
    <Fragment>
      <Table
        header={header}
        FilterComponent={NavbarBannerList}
        renderRow={renderRow}
        results={internalBannerLoopData?.data}
        total={Math.ceil(internalBannerLoopData.total / internalBannerLoopData.limit)}
        setParams={setParams}
        loading={loading}
      />
      <Modal
        open={isOpenModal}
        confirmType={confirmType}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
}
