import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import Box from "@material-ui/core/Box";
import { useHistory, useLocation } from "react-router-dom";

import { config } from "src/constants/config";
import { RootState } from "src/store";
import { notifyToast } from "src/constants/toast";
import { fetchProductSectionLoopList } from "src/store/internal-product-section-loop.action";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { InternalProductSectionLoopModel } from "src/types/internal-product-section-loop.model";
import { GenericTable as Table } from "src/components/generic-table";
import { ActionButton, ButtonLink, Modal, StatusDropdown } from "src/components";
import { NavbarProductSlideList } from "./navbar-product-slide-list";
import { ProductSlideListHeader } from "./product-slide-list-header";
import {
  deleteInternalProductSectionLoopService,
  editInternalProductSectionLoopService,
} from "src/services/internal-product-section-loop.services";
import "./styles.css";

export function ProductSlideList() {
  const [params, setParams] = useState<ParamListRequestBannerLoopModel>();
  const [selectedInternalBannerLoop, setSelectedInternalBannerLoop] =
    useState<InternalProductSectionLoopModel>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");

  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { productSectionLoops, loading } = useSelector(
    (state: RootState) => state.internalProductSectionLoop,
  );

  const header = useMemo(() => <ProductSlideListHeader />, []);

  const getData = useCallback(() => {
    if (!params) {
      return;
    }
    const { page, pageSize, status, keyword, startDate, endDate, countryCode } = params;
    sessionStorage.setItem("product-slide-list", `${page}`);
    if (page && pageSize) {
      dispatch(
        fetchProductSectionLoopList({
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

  const handleChangeStatus = (data: InternalProductSectionLoopModel, value: string) => {
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

  const handlecDeleteAction = (data: InternalProductSectionLoopModel) => {
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
        const response = await editInternalProductSectionLoopService(selectedInternalBannerLoop);
        if (!response?.statusCode) {
          getData();
        }
      } else if (confirmType === "delete") {
        const response = await deleteInternalProductSectionLoopService(
          selectedInternalBannerLoop._id,
        );
        if (!response?.statusCode) {
          if (productSectionLoops.data.length === 1) {
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
    productSectionLoops,
    location,
    history,
    params,
    getData,
    t,
  ]);

  const handleCopyLink = useCallback(
    (link: string) => {
      navigator.clipboard.writeText(link);
      notifyToast("default", "copied", t);
    },
    [t],
  );

  const renderRow = useCallback(
    (item: InternalProductSectionLoopModel) => {
      const { _id, name, createdAt, numberOfProduct, status } = item;
      const titleCreateAt = format(new Date(createdAt), "dd LLL yyyy HH:mm:ss");
      const [firstChar, ...restChar] = status;
      const defaultStatus = firstChar + restChar.join("").toLocaleLowerCase();
      const linkProducts = `${config.baseUrl}/sections-item/${_id}`;

      const dateSlice = (date: string) => {
        let result = "";

        result =
          date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);

        return result;
      };

      return (
        <TableRow>
          <TableCell align="left">
            <div className="name-banner flex w-96">{name}</div>
          </TableCell>
          <TableCell align="left">
            <Box maxWidth={125}>{dateSlice(titleCreateAt)}</Box>
          </TableCell>
          <TableCell align="center">{numberOfProduct}</TableCell>
          <TableCell align="center">
            <StatusDropdown
              data={item}
              statusOptions={["active", "inactive"]}
              defaultValue={defaultStatus.toLowerCase()}
              onChange={handleChangeStatus}
              trans={t}
            />
          </TableCell>
          <TableCell align="center" width={300}>
            <div className="flex action-buttons-wrapper justify-evenly items-center">
              <ActionButton action="getLink" onClick={() => handleCopyLink(linkProducts)} />
              <ButtonLink
                to={`/admin-dashboard/appearance-management/section-product-slide-management/slide-list/edit-product-slide/${_id}`}
              >
                <ActionButton action="edit" />
              </ButtonLink>
              <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
              <ButtonLink
                to={`/admin-dashboard/appearance-management/section-product-slide-management/slide-list/product-list/${_id}`}
                variant="text"
                className="bg-orange-light text-white px-3.5 py-1 hover:bg-orange-hover"
              >
                {t`manage-product`}
              </ButtonLink>
            </div>
          </TableCell>
        </TableRow>
      );
    },
    [t, handleCopyLink],
  );

  return (
    <Fragment>
      <Table
        header={header}
        FilterComponent={NavbarProductSlideList}
        renderRow={renderRow}
        results={productSectionLoops?.data}
        total={Math.ceil(productSectionLoops.total / productSectionLoops.limit)}
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
