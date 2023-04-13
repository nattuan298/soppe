import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { SortEnd, SortableElement, SortableHandle } from "react-sortable-hoc";
import arrayMove from "array-move";
import MenuIcon from "@material-ui/icons/Menu";

import { RootState } from "src/store";
import { GenericTable as Table } from "src/components/generic-table";
import { BannerListHeader } from "./baner-list-header";
import { ActionButton, ButtonLink, Modal, StatusDropdown } from "src/components";
import { getParams } from "src/store/router-params.slice";
import { InternalBannerModel } from "src/types/internal-banner.model";
import { notifyToast } from "src/constants/toast";
import { fetchBannerSectionList } from "src/store/internal-banners.action";
import { fetchSelectedBannerLoop } from "src/store/internal-selected-banner-loop.action";
import {
  deleteInternalBannerService,
  editInternalBannerService,
} from "src/services/internal-banner.services";
import { orderBy } from "lodash";
import "./style.css";

interface ParamsType {
  id: string;
}

interface ParamsListType {
  page: number;
  pageSize: number;
}

const DragHandle = SortableHandle(() => <MenuIcon />);

export function BannerList() {
  const [, setParams] = useState<ParamsListType>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");
  const [selectedBanner, setSelectedBanner] = useState<InternalBannerModel>();
  const [data, setData] = useState<InternalBannerModel[]>([]);

  const { id } = useParams<ParamsType>();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const { internalBannerData, loading } = useSelector((state: RootState) => state.internalBanners);

  const { bannerLoopData } = useSelector((state: RootState) => state.internalSelectedBannerLoop);

  const getData = useCallback(() => {
    if (!bannerLoopData) {
      return;
    }
    const { _id: bannerLoop } = bannerLoopData;
    dispatch(fetchBannerSectionList({ bannerLoop }));
  }, [bannerLoopData, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    dispatch(getParams(id));
    dispatch(fetchSelectedBannerLoop(id));
  }, [id, dispatch]);

  useEffect(() => {
    try {
      if (internalBannerData.data && internalBannerData.data.length > 0) {
        const data = orderBy(internalBannerData.data, ["position"], ["asc"]);
        setData(data);
      } else {
        setData([]);
      }
    } catch (e) {}
  }, [internalBannerData]);

  const handleChangeStatus = useCallback(
    (data: any, value: string) => {
      if (value.toUpperCase() !== data.status.toUpperCase()) {
        setSelectedBanner({ ...data, status: value.toUpperCase(), bannerLoop: id });
        setIsOpenModal(true);
        setConfirmType("action");
      }
    },
    [id],
  );

  const handlecDeleteAction = (data: InternalBannerModel) => {
    setIsOpenModal(true);
    setConfirmType("delete");
    setSelectedBanner(data);
  };

  const handleConfirm = useCallback(async () => {
    try {
      if (!selectedBanner) {
        return;
      }
      let response = null;
      if (confirmType === "action") {
        response = await editInternalBannerService(selectedBanner);
      } else if (confirmType === "delete") {
        response = await deleteInternalBannerService(selectedBanner._id);
      }
      if (!response?.statusCode) {
        getData();
      }
      setIsOpenModal(false);
      setSelectedBanner(undefined);
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
    }
  }, [confirmType, selectedBanner, getData, t]);

  const handleCancelConfirm = () => {
    setIsOpenModal(false);
    setSelectedBanner(undefined);
  };

  const header = useMemo(() => {
    if (!bannerLoopData || !bannerLoopData.name) return;
    return <BannerListHeader bannerLoopName={bannerLoopData.name} />;
  }, [bannerLoopData]);

  const renderRows = SortableElement((item: InternalBannerModel) => {
    const { name, createdAt, hyperlink, imageType, status, mobileBannerUrl, _id } = item;
    const titleCreateAt = format(new Date(createdAt), "dd LLL yyyy HH:mm:ss");
    const [firstChar, ...restChar] = status;
    const defaultStatus = firstChar + restChar.join("").toLocaleLowerCase();
    const isLink =
      hyperlink &&
      /[(http(s)?):\\/\\/(www.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/gi.test(
        hyperlink,
      );

    return (
      <TableRow>
        <TableCell align="left">
          <div className="flex">
            <div className="flex items-center justify-center min-w-24">
              <DragHandle />
            </div>
            <div className="flex container-main">
              <img src={encodeURI(mobileBannerUrl)} width={200} alt="mobile-banner" />
              {isLink ? (
                <a
                  href={hyperlink}
                  target="_blank"
                  rel="noreferrer"
                  className="self-center ml-6 w-96 name-banner hyperlink"
                >
                  {name}
                </a>
              ) : (
                <div className="self-center ml-6 w-96 name-banner">{name}</div>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell align="left" width={150}>
          {titleCreateAt}
        </TableCell>
        <TableCell align="center">{imageType}</TableCell>
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
          <div className="flex action-buttons-wrapper justify-center">
            <ButtonLink
              to={`/admin-dashboard/appearance-management/home-banner-management/banner-loop-list/banner-list/edit-banner/${_id}`}
            >
              <ActionButton action="edit" />
            </ButtonLink>
            <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
          </div>
        </TableCell>
      </TableRow>
    );
  });
  // const renderRow = useCallback(
  //   (item: InternalBannerModel) => {
  //     const { name, createdAt, imageType, status, mobileBannerUrl, _id } = item;
  //     const titleCreateAt = format(new Date(createdAt), "dd LLL yyyy HH:mm:ss");
  //     const [firstChar, ...restChar] = status;
  //     const defaultStatus = firstChar + restChar.join("").toLocaleLowerCase();
  //     return (
  //       <TableRow>
  //         <TableCell align="center"></TableCell>
  //         <TableCell align="left">
  //           <div className="flex">
  //             <img
  //               src={mobileBannerUrl}
  //               width={200}
  //               alt="mobile-banner"
  //               style={{
  //                 height: "90px",
  //                 objectFit: "cover",
  //                 borderRadius: "5px",
  //               }}
  //             />
  //             <div className="self-center ml-6 w-96 name-banner">{name}</div>
  //           </div>
  //         </TableCell>
  //         <TableCell align="left">{titleCreateAt}</TableCell>
  //         <TableCell align="center">{imageType}</TableCell>
  //         <TableCell align="center">
  //           <StatusDropdown
  //             data={item}
  //             statusOptions={["Active", "Inactive"]}
  //             defaultValue={defaultStatus}
  //             onChange={handleChangeStatus}
  //           />
  //         </TableCell>
  //         <TableCell align="center">
  //           <div className="flex action-buttons-wrapper justify-evenly">
  //             <ButtonLink
  //               to={`/admin-dashboard/appearance-management/home-banner-management/banner-loop-list/banner-list/edit-banner/${_id}`}
  //             >
  //               <ActionButton action="edit" />
  //             </ButtonLink>
  //             <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
  //           </div>
  //         </TableCell>
  //       </TableRow>
  //     );
  //   },
  //   [handleChangeStatus],
  // );

  const updatePostion = async (newArray: InternalBannerModel[]) => {
    const newDatas = newArray.map((item, idx) => ({ ...item, position: idx + 1 }));
    setData(newDatas);
    const promises = newDatas
      .reduce((s: InternalBannerModel[], item: InternalBannerModel, index: number) => {
        if (item._id === data[index]._id) {
          return s;
        }
        return [...s, item];
      }, [])
      .map((item) => editInternalBannerService(item));
    try {
      await Promise.all(promises);
    } catch (e: any) {
      getData();
      notifyToast("error", e.response?.data?.message, t);
    }
  };
  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    const newArray = arrayMove(data, oldIndex, newIndex);
    updatePostion(newArray);
  };

  return (
    <Fragment>
      <Table
        header={header}
        renderRow={renderRows}
        results={data}
        noPagination={true}
        setParams={setParams}
        loading={loading}
        onSortEnd={onSortEnd}
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
