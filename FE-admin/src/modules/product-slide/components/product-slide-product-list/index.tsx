import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { SortEnd, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import { orderBy } from "lodash";

import { RootState } from "src/store";
import { GenericTable as Table } from "src/components/generic-table";
import { ProductListHeader } from "./product-list-header";
import { Modal } from "src/components";
import { getParams } from "src/store/router-params.slice";
import { ProductSectionModel } from "src/types/internal-product-section-loop.model";
import { notifyToast } from "src/constants/toast";
import { fetchProductSectionList } from "src/store/internal-product-section.action";
import {
  deleteProductSectionService,
  editProductSectionService,
} from "src/services/internal-product-section.services";
import { ProductRow } from "./product-row";
import "./styles.css";
import { getCategoryAction } from "src/store/category.ation";

interface ParamsType {
  id: string;
}

interface ParamsListType {
  page: number;
  pageSize: number;
}

export function ProductSlideProducts() {
  const [, setParams] = useState<ParamsListType>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");
  const [selectedSection, setSelectedSection] = useState<ProductSectionModel>();
  const [data, setData] = useState<ProductSectionModel[]>([]);

  const { id } = useParams<ParamsType>();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { internalProductSection, loading } = useSelector(
    (state: RootState) => state.internalProductSection,
  );

  const getData = useCallback(() => {
    if (!id) {
      return;
    }
    dispatch(getParams(id));
    dispatch(fetchProductSectionList({ productLoop: id }));
  }, [id, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  useEffect(() => {
    try {
      if (internalProductSection.data && internalProductSection.data.length > 0) {
        const data = orderBy(internalProductSection.data, ["position"], ["asc"]);
        setData(data);
      }
      if (internalProductSection.data && internalProductSection.data.length === 0) {
        setData([]);
      }
    } catch (e) {}
  }, [internalProductSection]);

  const handleChangeStatus = useCallback(
    (data: any, value: string) => {
      if (value.toUpperCase() !== data.statusProSec.toUpperCase()) {
        const { position = 0 } = data;
        setSelectedSection({
          ...data,
          position,
          statusProSec: value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
          productLoop: id,
        });
        setIsOpenModal(true);
        setConfirmType("action");
      }
    },
    [id],
  );

  const handlecDeleteAction = (data: ProductSectionModel) => {
    setIsOpenModal(true);
    setConfirmType("delete");
    setSelectedSection(data);
  };

  const handleConfirm = useCallback(async () => {
    try {
      if (!selectedSection) {
        return;
      }
      let response = null;
      if (confirmType === "action") {
        response = await editProductSectionService(selectedSection);
      } else if (confirmType === "delete") {
        response = await deleteProductSectionService(selectedSection._id);
      }
      if (!response?.statusCode) {
        getData();
      }
      setIsOpenModal(false);
      setSelectedSection(undefined);
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
    }
  }, [confirmType, selectedSection, getData, t]);

  const handleCancelConfirm = () => {
    setIsOpenModal(false);
    setSelectedSection(undefined);
  };

  const header = useMemo(() => {
    return <ProductListHeader />;
  }, []);

  const renderRows = SortableElement((item: ProductSectionModel) => {
    return (
      <ProductRow
        item={item}
        handleChangeStatus={handleChangeStatus}
        handlecDeleteAction={handlecDeleteAction}
      />
    );
  });

  const updatePostion = async (newArray: ProductSectionModel[]) => {
    const newDatas = newArray.map((item, idx) => ({ ...item, position: idx + 1 }));
    setData(newDatas);
    const promises = newDatas
      .reduce((s: ProductSectionModel[], item: ProductSectionModel, index: number) => {
        if (item._id === data[index]._id && item.position === data[index].position) {
          return s;
        }
        return [...s, item];
      }, [])
      .map((item) => editProductSectionService(item));
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
    <div className="inventory-product-table">
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
    </div>
  );
}
