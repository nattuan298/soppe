import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Button, CollapsibleBlock, Input, InputDatePicker, Modal, Select } from "src/components";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { routeInventoryManagementProductListBase, routeManagementBannerLoopListBase } from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { notifyToast } from "src/constants/toast";

import { RootState } from "src/store";
import {
  createInternalBannerLoopService,
  editInternalBannerLoopService,
} from "src/services/internal-banner-loop.services";
import { fetchSelectedBannerLoop } from "src/store/internal-selected-banner-loop.action";
import { getParams } from "src/store/router-params.slice";
import { product } from "./schema";
import { uploadImageFull } from "../../../../services/upload.services";
import { useStatusOptions } from "../../../order-management/order-list/constants";
import { UploadSigleImage } from "../../../../components/upload-image-video/upload-single-image";
import { CategoryModel } from "../../../../types/category.model";
import { getCategoryAction } from "../../../../store/category.ation";
import { createProductService } from "../../../../services/inventory-management.service";

const DEFAULT_COUNTRY = "Thailand";
interface ParamsType {
  id: string;
}

export function ProductForm() {

  const [status, setStatus] = useState<string>("2");
  const { id } = useParams<ParamsType>();

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const history = useHistory();

  const [urlPreview, setUrlPreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [categoryFilter, setCategoryFilter] = useState({
    id: "",
    name: "",
    value: "",
  });
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const date = useMemo(() => new Date(), []);
  const statusOptions = useStatusOptions();
  const { bannerLoopData, loading } = useSelector(
    (state: RootState) => state.internalSelectedBannerLoop,
  );
  const { categoryData } = useSelector((state: RootState) => state.categories);
  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);
  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(fetchSelectedBannerLoop(id));
    }
  }, [id, dispatch]);



  const handleSubmit = async (values: any) => {
    const { productName, description, stock, price, categoryId, mediaUrl } = values;
    const upload = await uploadImageFull({ file: mediaUrl,
      moduleName: "product" });
    const body = {
      productName,
      mediaUrl: upload.key,
      description,
      stock,
      price,
      categoryId,
    };
    try {
      let response = null;
      if (id && bannerLoopData) {
        const bannerLoop = { ...bannerLoopData, ...body };
        response = await editInternalBannerLoopService(bannerLoop);
      } else {
        response = await createProductService(body);
      }
      console.log(response);
      if (response !== null) {
        history.push(routeInventoryManagementProductListBase);
      }
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
    }
  };


  const initialValues = useMemo(() => {
    return {
      productName: "",
      mediaUrl: "",
      description: "",
      stock: 0,
      price: 0,
      categoryId: "",
    };
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: product,
  });

  const updateStatus = (value: string | null) => {
    if (value) {
      setStatus(value);
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  // const handleConfirm = () => {
  //   redirectPage();
  // };


  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-start">
          <div className="w-full flex-1 items-start">
            <CollapsibleBlock className="mb-5" heading="Product information">
              <div className="w-full">
                <div className="w-6/12">
                  <label className="block">
                    <span className="block mt-2 text-base text-black required">Product Name</span>
                    <Input
                      name="productName"
                      className="h-12 w-full mt-1"
                      type="text"
                      placeholder="Product Name"
                      value={formik.values.productName}
                      onChange={formik.handleChange}
                      errorMessage={
                        formik.touched.productName && formik.errors.productName ? t(formik.errors.productName as "to_ship") : ""
                      }
                      inputProps={{
                        maxLength: 2500,
                      }}
                    />
                  </label>
                </div>
                <div className="w-6/12 flex mt-2">

                  <label className="block w-6/12">
                    <span className="block mt-2 text-base text-black required">Stock</span>
                    <Input
                      name="stock"
                      className="h-12 w-full mt-1"
                      type="number"
                      placeholder="Stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                      errorMessage={
                        ""
                      }
                    />
                  </label>
                </div>
                <div className="w-6/12 flex mt-2">
                  <label className="block w-6/12 mr-2">
                    <span className="block mt-2 text-base text-black">Price</span>
                    <Input
                      name="price"
                      className="h-12 w-full mt-1"
                      type="number"
                      placeholder="Price"
                      value={formik.values.price}
                      onChange={formik.handleChange}
                      errorMessage={
                        ""
                      }
                    />
                  </label>
                  <label className="block w-6/12">
                    <span className="block mt-2 text-base text-black required">Category</span>
                    <Select
                      className="w-[150px] 2xl:w-[343px]"
                      defaultValue={formik.values.categoryId}
                      options={categoryData?.map((category: CategoryModel) => ({
                        title: category.category,
                        value: category._id,
                      }))}
                      placeholder={t("all-categories")}
                      onChange={(id) => formik.setFieldValue("categoryId", id)}
                    />
                  </label>
                </div>
                <div className="w-full flex mt-2">
                  <label className="block w-6/12 mr-2">
                    <span className="block mt-2 text-base text-black">{t("description")}</span>
                    <Input
                      name="description"
                      className="w-full mt-1"
                      type="text"
                      multiline={true}
                      maxRows={4}
                      minRows={4}
                      placeholder={t("description")}
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      errorMessage={
                        ""
                      }
                    />
                  </label>
                </div>
                <UploadSigleImage
                  name={t`upload-the-image-or-video`}
                  setImage={(file : File) => {
                    setImage(file);
                    formik.setFieldValue("mediaUrl", file);
                  }
                  }
                  urlDefaultPreview={urlPreview}

                />
              </div>
            </CollapsibleBlock>
            <div className="button-wapper px-5 mb-10 flex">
              <Button
                variant="text"
                type="submit"
                className="bg-orange-light text-white h-12 w-72 hover:bg-orange-hover"
              >
                {t`submit`}
              </Button>
              <Button
                variant="text"
                className="bg-white button-cancel h-12 w-72 ml-4 border"
                onClick={openModal}
              >
                {t`cancel`}
              </Button>
            </div>
          </div>
        </div>
      </form>
      <Modal
        open={isOpenModal}
        confirmType={"cancel"}
        onClose={closeModal}
        onConfirm={() => {}}
      />
    </Fragment>
  );
}
