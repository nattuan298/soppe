import { ChangeEvent, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { format } from "date-fns";
import Box from "@material-ui/core/Box";
import { useHistory, useLocation } from "react-router-dom";

import { notifyToast } from "src/constants/toast";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { TempateHomeBodyModel, TemplateHomeModel } from "src/types/home-template.model";
import { GenericTable as Table } from "src/components/generic-table";
import { TemplateHomeListHeader } from "./template-list-header";
import { NavbarTemplateHomePageList } from "./navbar-template-list";
import { ActionButton, ButtonLink, Modal, RoundedCheckbox } from "src/components";
import { ApiListModel } from "src/types/api-list.model";
import "./styles.css";

interface PropsPage {
  getDataPage: (params: any) => void;
  internalBannerData: ApiListModel<TemplateHomeModel>;
  deleteBannerService: (id: string) => Promise<void | any>;
  editService: (model: TempateHomeBodyModel) => Promise<void | any>;
  loading: boolean;
  addBannerLink: string;
  addBannerTitle: string;
  editLinkBanner: string;
}

export function TemplateHomeList({
  getDataPage,
  editService,
  internalBannerData,
  loading,
  deleteBannerService,
  addBannerLink,
  addBannerTitle,
  editLinkBanner,
}: PropsPage) {
  const [params, setParams] = useState<ParamListRequestModel>();
  const [selectedTemplateHome, setSelectedTemplateHome] = useState<TemplateHomeModel>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");

  const { t } = useTranslation("common");
  const location = useLocation();
  const history = useHistory();

  const header = useMemo(() => <TemplateHomeListHeader />, []);

  const filterComponent = useCallback(
    ({ setFilter }) => (
      <NavbarTemplateHomePageList
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
      getDataPage(params);
    }
  }, [getDataPage, params]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleCancelConfirm = () => {
    setIsOpenModal(false);
    setSelectedTemplateHome(undefined);
  };

  const handlecDeleteAction = (data: TemplateHomeModel) => {
    setIsOpenModal(true);
    setConfirmType("delete");
    setSelectedTemplateHome(data);
  };

  const handleConfirm = useCallback(async () => {
    try {
      if (!selectedTemplateHome) {
        return;
      }
      if (confirmType === "delete") {
        const response = await deleteBannerService(selectedTemplateHome._id);
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
      } else if (confirmType === "action") {
        const { _id, status, name, countryCode } = selectedTemplateHome;
        const response = await editService({ _id, status, name, countryCode });
        if (!response?.statusCode) {
          if (params && params.page && params.page > 1) {
            const pathname = location.pathname;
            history.push({ pathname, search: "?page=1" });
          } else {
            getData();
          }
        }
      }
      setIsOpenModal(false);
      setSelectedTemplateHome(undefined);
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
      setIsOpenModal(false);
    }
  }, [
    confirmType,
    location.pathname,
    history,
    params,
    selectedTemplateHome,
    internalBannerData,
    t,
    getData,
    editService,
    deleteBannerService,
  ]);

  const handleChangeTemplate = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;
      const editTemplate = internalBannerData.data.find(({ _id }) => _id === name);
      if (editTemplate) {
        setSelectedTemplateHome({ ...editTemplate, status: checked ? "Active" : "Inactive" });
        setIsOpenModal(true);
        setConfirmType("action");
      }
    },
    [internalBannerData],
  );

  const renderRow = useCallback(
    (item: TemplateHomeModel) => {
      const { _id, name, createdAt, numberOfBannerSec, numberOfProSec, status } = item;
      const titleCreateAt = format(new Date(createdAt), "dd LLL yyyy HH:mm:ss");
      const checked = status.toLocaleUpperCase() === "ACTIVE";

      const dateSlice = (date: string) => {
        let result = "";
        result =
          date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);
        return result;
      };

      return (
        <TableRow>
          <TableCell align="left">
            <div className="flex">
              <div className="pr-6">
                <RoundedCheckbox
                  className="checkbox-status"
                  checked={checked}
                  name={_id}
                  value={false}
                  onChange={handleChangeTemplate}
                />
              </div>
              <div className="name-banner flex w-80 wide:w-96">{name}</div>
            </div>
          </TableCell>
          <TableCell align="left">
            <Box maxWidth={125}>{dateSlice(titleCreateAt)}</Box>
          </TableCell>
          <TableCell align="center">{numberOfProSec}</TableCell>
          <TableCell align="center">{numberOfBannerSec}</TableCell>
          <TableCell align="center">
            <Box width={125}>
              <div className="flex action-buttons-wrapper justify-center items-center">
                <ButtonLink to={`${editLinkBanner}/${_id}`}>
                  <ActionButton action="edit" />
                </ButtonLink>
                <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
              </div>
            </Box>
          </TableCell>
        </TableRow>
      );
    },
    [editLinkBanner, handleChangeTemplate],
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
