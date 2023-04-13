import { Fragment, useEffect, useMemo, useState } from "react";
import { Button, CollapsibleBlock, Modal } from "src/components";
import { useFormik } from "formik";
import { useHistory, useParams } from "react-router-dom";
import { routeSectionProductSlideList } from "src/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { notifyToast } from "src/constants/toast";

import { RootState } from "src/store";
import { fetchProductSectionLoopSelected } from "src/store/internal-product-section-loop.action";
import { getParams } from "src/store/router-params.slice";
import { internalProductSlide } from "./schema";
import { InformationProductSlide } from "./information-product-slide";
import {
  createInternalProductSectionLoopService,
  editInternalProductSectionLoopService,
} from "src/services/internal-product-section-loop.services";
import "./style.css";

interface ParamsType {
  id: string;
}

const DEFAULT_COUNTRY = "Thailand";
export function ProductSlideForm() {
  const [status, setStatus] = useState<string>("2");
  const { id } = useParams<ParamsType>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [location, setLocation] = useState(DEFAULT_COUNTRY);

  const { selectedSectionLoops, loading } = useSelector(
    (state: RootState) => state.internalProductSectionLoop,
  );

  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
      dispatch(fetchProductSectionLoopSelected(id));
    }
  }, [id, dispatch]);

  const redirectPage = () => {
    const page = sessionStorage.getItem("product-slide-list");
    if (!page) {
      history.push(routeSectionProductSlideList);
    }
    return history.push(`${routeSectionProductSlideList}?page=${page}`);
  };

  const handleSubmit = async (values: any) => {
    const { name } = values;
    if (name === "") {
      return;
    }
    const statusValue = status === "1" ? "Active" : "Inactive";
    const body = {
      name,
      status: statusValue,
      countryCode: location,
    };
    try {
      let response = null;
      if (id && selectedSectionLoops) {
        const bannerLoop = { ...selectedSectionLoops, ...body };
        response = await editInternalProductSectionLoopService(bannerLoop);
      } else {
        response = await createInternalProductSectionLoopService(body);
      }
      if (!response?.statusCode) {
        redirectPage();
      }
    } catch (e: any) {
      notifyToast("error", e.response.data?.message, t);
    }
  };
  useEffect(() => {
    if (!selectedSectionLoops || loading) {
      return;
    }
    setStatus(selectedSectionLoops?.status === "Active" ? "1" : "2");
    setLocation(selectedSectionLoops?.countryCode || DEFAULT_COUNTRY);
  }, [selectedSectionLoops, loading, t, id]);

  const initialValues = useMemo(() => {
    if (selectedSectionLoops) {
      const { name } = selectedSectionLoops;
      return {
        name,
      };
    }
    return {
      name: "",
    };
  }, [selectedSectionLoops]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: internalProductSlide,
  });

  const updateStatus = (value: string | null) => {
    if (value) {
      setStatus(value);
    }
  };

  const handleChangeLocation = (value: string) => {
    if (value) {
      setLocation(value);
    }
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleConfirm = () => {
    redirectPage();
  };

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex items-start">
          <div className="w-full flex-1 items-start">
            <CollapsibleBlock className="mb-5" heading={t`section-product-slide-information`}>
              <InformationProductSlide
                formik={formik}
                status={status}
                disableStatus={!id}
                location={location}
                disableCountry={!!id}
                setStatus={updateStatus}
                handleChangeLocation={handleChangeLocation}
              />
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
                className="bg-white button-cancel border h-12 w-72 ml-4"
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
        onConfirm={handleConfirm}
      />
    </Fragment>
  );
}
