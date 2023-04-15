import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "src/store";
import { GenericTable as Table } from "src/components/generic-table";
import { ProductsHeader } from "./product-header";
import { getParams } from "src/store/router-params.slice";
import { ParamInventoryProductModel } from "src/types/params-list-request.model";
import { notifyToast } from "src/constants/toast";
import { fetchProductSectionList } from "src/store/internal-product-section.action";
import { ProductModel } from "src/types/inventory-management.model";
import { ProductSectionModel } from "src/types/internal-product-section-loop.model";
import { createProductSectionService } from "src/services/internal-product-section.services";
import { ProductRow } from "./product-row";
import { NavbarProductSlideList } from "./navbar-product-slide-list";

import { Button, Modal } from "src/components";
import "./styles.css";
import { getProductAction } from "src/store/inventory-management.action";
import { getCategoryAction } from "src/store/category.ation";

interface ParamsType {
  id: string;
}

export function AddSlideProduct() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [params, setParams] = useState<ParamInventoryProductModel>();
  const [productCodeSections, setProductCodeSection] = useState<Array<ProductSectionModel>>([]);

  const { id } = useParams<ParamsType>();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const history = useHistory();

  const { internalProductSection, loading: loadingProductSection } = useSelector(
    (state: RootState) => state.internalProductSection,
  );
  const { productData, loading: loadingProduct } = useSelector(
    (state: RootState) => state.inventoryManagements,
  );

  const countryCode = internalProductSection.countryCode;

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(getParams(id));
    dispatch(fetchProductSectionList({ productLoop: id }));
  }, [id, dispatch]);

  const getData = useCallback(() => {
    if (!params || !countryCode) {
      return;
    }
    const { page, pageSize, status, keyword, minPrice, maxPrice, category } = params;
    if (page && pageSize) {
      dispatch(
        getProductAction({
          page,
          pageSize,
          status,
          keyword,
          minPrice,
          maxPrice,
          category,
          countryCode,
          keySort: "MIN-MAX",
        }),
      );
    }
  }, [dispatch, params, countryCode]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  useEffect(() => {
    setProductCodeSection(internalProductSection.data);
  }, [internalProductSection]);

  const listSectionProduct = useMemo(
    () => productCodeSections.map((item: ProductSectionModel) => item.productCode),
    [productCodeSections],
  );

  const header = useMemo(() => {
    return <ProductsHeader />;
  }, []);

  const handleDeleteProductSection = async (item: ProductModel) => {
    setProductCodeSection((preState) =>
      preState.filter(({ productCode }) => item.productCode !== productCode),
    );
    // try {
    //   const productSection = productCodeSections.find(
    //     ({ productCode }) => productCode === item.productCode,
    //   );
    //   if (productSection) {
    //     const response = await deleteProductSectionService(productSection._id);
    //     if (!response?.statusCode) {
    //       setProductCodeSection((preState) =>
    //         preState.filter(({ _id }) => _id !== productSection._id),
    //       );
    //     }
    //   }
    // } catch (e: any) {
    //   notifyToast("error", e.response.data?.message, t);
    // }
  };

  const handleAddProductSection = async (item: ProductModel) => {
    // const { productCode } = item;
    const newProductSection: ProductSectionModel = {
      ...item,
      productLoop: id,
      statusProSec: "Active",
      _id: "",
    };
    setProductCodeSection((preState) => [...preState, newProductSection]);
    // try {
    //   const response = await createProductSectionService({
    //     productCode,
    //     productLoop: id,
    //   });
    //   if (!response?.statusCode) {
    //     setProductCodeSection((preState) => [...preState, response]);
    //   }
    // } catch (e: any) {
    //   notifyToast("error", e.response.data?.message, t);
    // }
  };

  const renderRows = (item: ProductModel) => {
    const checked = listSectionProduct.includes(item.productCode);
    const handleChangeSectionAction = checked
      ? handleDeleteProductSection
      : handleAddProductSection;
    return (
      <ProductRow
        key={item._id}
        item={item}
        checked={checked}
        handleChangeSectionAction={handleChangeSectionAction}
      />
    );
  };

  const loading = useMemo(
    () => loadingProduct || loadingProductSection,
    [loadingProduct, loadingProductSection],
  );

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    history.push(
      `/admin-dashboard/appearance-management/section-product-slide-management/slide-list/product-list/${id}`,
    );
  };

  const onSubmitPage = async () => {
    // const productCodes = internalProductSection.data.map(
    //   (item: ProductSectionModel) => item.productCode,
    // );
    // const addProducts = productCodeSections.filter(
    //   (item) => !productCodes.includes(item.productCode),
    // );
    // const deleteProduct = internalProductSection.data.filter(
    //   (item) => !listSectionProduct.includes(item.productCode),
    // );
    // const addPromises = addProducts.map((item) => {
    //   const { productCode } = item;
    //   const [imageUrl] = item.media.filter(({ fileType }) => fileType !== "video/mp4");
    //   const [videoUrl] = item.media.filter(({ fileType }) => fileType === "video/mp4");
    //   const image = imageUrl || videoUrl;

    //   if (image && image.url) {
    //     return createProductSectionService({
    //       productCode,
    //       image: image.url,
    //       productLoop: id,
    //     });
    //   }
    //   return createProductSectionService({
    //     productCode,
    //     productLoop: id,
    //   });
    // });
    // const addBodyProductCode = productCodeSections.map(({ productCode }) => productCode);
    const products = productCodeSections.map(({ productCode }) => {
      const exitsProduct = internalProductSection.data.find(
        (item) => item.productCode === productCode,
      );
      const status = exitsProduct ? exitsProduct.statusProSec : "Active";
      return { productCode, status };
    });
    const addBodyRequest = { countryCode, productLoop: id, products };
    // const addPromise = addProducts.length > 0 || deleteProduct.length > 0 ? [createProductSectionService(addBodyRequest)] : [];
    // const deletePromise = deleteProduct.map((item) => deleteProductSectionService(item._id));
    try {
      await createProductSectionService(addBodyRequest);
      handleConfirm();
    } catch (e: any) {
      getData();
      notifyToast("error", e.response.data?.message, t);
    }
  };

  return (
    <Fragment>
      <Table
        header={header}
        renderRow={renderRows}
        results={productData.data}
        setParams={setParams}
        loading={loading}
        FilterComponent={NavbarProductSlideList}
        total={Math.ceil(productData.total / productData.limit)}
      />
      <div className="button-wapper px-5 mb-10 flex mt-5">
        <Button
          variant="text"
          className="bg-orange-light text-white h-12 w-72 hover:bg-orange-hover mr-1.5"
          onClick={onSubmitPage}
        >
          {t`submit`}
        </Button>
        <Button
          variant="text"
          className="bg-white button-cancel border h-12 w-72 ml-6"
          onClick={openModal}
        >
          {t`cancel`}
        </Button>
      </div>
      <Modal
        open={isOpenModal}
        confirmType={"cancel"}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
}
