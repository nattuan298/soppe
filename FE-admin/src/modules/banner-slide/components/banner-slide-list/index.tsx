import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { format } from "date-fns";
import Box from "@material-ui/core/Box";
import { useHistory, useLocation } from "react-router-dom";

import { notifyToast } from "src/constants/toast";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { InternalBannerLoopModel } from "src/types/internal-banner-loop.model";
import { GenericTable as Table } from "src/components/generic-table";
import { BannerListHeader } from "./baner-list-header";
import { NavbarBannerList } from "./navbar-banner-list";
import { ActionButton, ButtonLink, Modal, StatusDropdown } from "src/components";
import { ApiListModel } from "src/types/api-list.model";
import "./styles.css";

interface PropsPage {
  getDataPage: (params: any) => void;
  internalBannerData: ApiListModel<InternalBannerLoopModel>;
  editBannerService: (selectedInternalBannerLoop: InternalBannerLoopModel) => Promise<void | any>;
  deleteBannerService: (id: string) => Promise<void | any>;
  loading: boolean;
  addBannerLink: string;
  addBannerTitle: string;
  editLinkBanner: string;
  manageLinkBanner: string;
}

export function BannerList({
  getDataPage,
  internalBannerData,
  loading,
  editBannerService,
  deleteBannerService,
  addBannerLink,
  addBannerTitle,
  editLinkBanner,
  manageLinkBanner,
}: PropsPage) {
  const [params, setParams] = useState<ParamListRequestBannerLoopModel>();
  const [selectedInternalBannerLoop, setSelectedInternalBannerLoop] =
    useState<InternalBannerLoopModel>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");
  const { t } = useTranslation("common");

  const location = useLocation();
  const history = useHistory();
  const header = useMemo(() => <BannerListHeader />, []);
  const filterComponent = useCallback(
    ({ setFilter }) => (
      <NavbarBannerList
        addBannerTitle={addBannerTitle}
        addBannerLink={addBannerLink}
        setFilter={setFilter}
      />
    ),
    [addBannerLink, addBannerTitle],
  );

  const getData = useCallback(() => {
    if (!params) {
      return;
    }
    const { page, pageSize } = params;
    if (page && pageSize) {
      getDataPage({ ...params, sortBy: "createdAt-DESC" });
    }
  }, [getDataPage, params]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleChangeStatus = (data: InternalBannerLoopModel, value: string) => {
    if (value.toUpperCase() !== data.status.toUpperCase()) {
      setSelectedInternalBannerLoop({
        ...data,
        status: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
      });
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
        const response = await editBannerService(selectedInternalBannerLoop);
        if (!response?.statusCode) {
          getData();
        }
      } else if (confirmType === "delete") {
        const response = await deleteBannerService(selectedInternalBannerLoop._id);
        if (!response?.statusCode) {
          if (internalBannerData.data.length === 1) {
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
    internalBannerData,
    location,
    history,
    params,
    getData,
    t,
    editBannerService,
    deleteBannerService,
  ]);

  const renderRow = useCallback(
    (item: InternalBannerLoopModel) => {
      const { _id, name, createdAt, numberOfBanner, duration, status } = item;
      const titleCreateAt = format(new Date(createdAt), "dd LLL yyyy HH:mm:ss");
      const [firstChar, ...restChar] = status;
      const defaultStatus = firstChar + restChar.join("").toLocaleLowerCase();
      const total = duration * numberOfBanner;
      const totalDuration = total > 60 ? `${Math.floor(total / 60)}m ${total % 60}s` : `${total}s`;

      const dateSlice = (date: string) => {
        let result = "";

        result =
          date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);

        return result;
      };

      return (
        <TableRow>
          <TableCell align="left">
            <div className="name-banner flex w-80 wide:w-96">{name}</div>
          </TableCell>
          <TableCell align="left">
            <Box maxWidth={150}>{dateSlice(titleCreateAt)}</Box>
          </TableCell>
          <TableCell align="center">{numberOfBanner}</TableCell>
          <TableCell align="center">{totalDuration}</TableCell>
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
            <Box width={250}>
              <div className="flex action-buttons-wrapper justify-evenly items-center">
                <ButtonLink to={`${editLinkBanner}/${_id}`}>
                  <ActionButton action="edit" />
                </ButtonLink>
                <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
                <ButtonLink
                  to={`${manageLinkBanner}/${_id}`}
                  variant="text"
                  className="bg-orange-light text-white px-3.5 py-1 hover:bg-orange-hover"
                >
                  {t`manage-banner`}
                </ButtonLink>
              </div>
            </Box>
          </TableCell>
        </TableRow>
      );
    },
    [editLinkBanner, manageLinkBanner, t],
  );

  return (
    <Fragment>
      <Table
        header={header}
        FilterComponent={filterComponent}
        renderRow={renderRow}
        results={internalBannerData?.data}
        total={Math.ceil(internalBannerData.total / internalBannerData.limit)}
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
