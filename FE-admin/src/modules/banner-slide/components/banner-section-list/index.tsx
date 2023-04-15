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
import { fetchBannerSliceSectionList } from "src/store/internal-banners.action";
import { fetchBannerSliceLoopSelected } from "src/store/internal-selected-banner-slice-loop.action";
import {
  deleteInternalBannerSectionService,
  editInternalBannerSectionService,
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

export function BannerSectionList() {
  const [, setParams] = useState<ParamsListType>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");
  const [selectedBanner, setSelectedBanner] = useState<InternalBannerModel>();
  const [data, setData] = useState<InternalBannerModel[]>([]);

  const { id } = useParams<ParamsType>();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const { internalBannerData, loading } = useSelector((state: RootState) => state.internalBanners);

  const { bannerSectionLoopData } = useSelector(
    (state: RootState) => state.internalSelectedBannerSectionLoop,
  );

  const getData = useCallback(() => {
    if (!bannerSectionLoopData || !bannerSectionLoopData._id) {
      setData([]);
      return;
    }
    const { _id: bannerLoop } = bannerSectionLoopData;
    dispatch(fetchBannerSliceSectionList({ bannerLoop }));
  }, [bannerSectionLoopData, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    dispatch(getParams(id));
    dispatch(fetchBannerSliceLoopSelected(id));
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
        setSelectedBanner({
          ...data,
          status: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
          bannerLoop: id,
        });
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
        // const { _id, status } = selectedBanner;
        response = await editInternalBannerSectionService(selectedBanner);
      } else if (confirmType === "delete") {
        response = await deleteInternalBannerSectionService(selectedBanner._id);
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
    if (!bannerSectionLoopData || !bannerSectionLoopData.name) return;
    return <BannerListHeader bannerLoopName={bannerSectionLoopData.name} />;
  }, [bannerSectionLoopData]);

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
              <img src={mobileBannerUrl} width={200} alt="mobile-banner" />
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
        <TableCell align="left">
          <div className="w-32">{titleCreateAt}</div>
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
              to={`/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list/edit-banner/${_id}`}
            >
              <ActionButton action="edit" />
            </ButtonLink>
            <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
          </div>
        </TableCell>
      </TableRow>
    );
  });

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
      .map((item) => editInternalBannerSectionService(item));
    try {
      await Promise.all(promises);
    } catch (e: any) {
      getData();
      notifyToast("error", e.response.data?.message, t);
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
