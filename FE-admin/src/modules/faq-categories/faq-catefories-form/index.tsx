/* eslint-disable indent */
import { useEffect, useMemo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { RootState } from "src/store";
import { Button, CollapsibleBlock, Input, Label, Modal } from "src/components";
import "./styles.css";
import { routeFAQCategoryList } from "src/constants/routes";
import { internalUserSchema } from "./schema";
import { createFAQCategory, updateCategoryFAQ } from "src/services/faq-category.services";
import { resetFAQCategory } from "src/store/faq-category.slice";
import { getParams } from "src/store/router-params.slice";
import { getDetailCategoryAction } from "src/store/faq-category.action";
interface FAQFormProps {
  mode?: "create" | "edit";
}

type ParamsType = {
  id: string;
};

export default function FAQForm({ mode }: FAQFormProps) {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "cancel">("action");
  const { t } = useTranslation("common");
  const { id } = useParams<ParamsType>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { FAQCategoryDetail } = useSelector((state: RootState) => state.faqCategory);

  useEffect(() => {
    if (id && mode === "edit") {
      dispatch(getDetailCategoryAction(id));
      dispatch(getParams(id));
    }
    if (mode === "create") {
      dispatch(resetFAQCategory());
    }
  }, [dispatch, id, mode]);
  const initialValues = useMemo(() => {

    return {
      category: "",
    };
  }, [FAQCategoryDetail, mode]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: internalUserSchema,
  });

  function handleCancelConfirm() {
    setIsOpenModal(false);
  }

  function handleClickCancelEdit() {
    if (mode === "edit") {
      setConfirmType("action");
      setIsOpenModal(true);
    }
    if (mode === "create") {
      setConfirmType("action");
      setIsOpenModal(true);
    }
  }

  async function handleConfirm() {
    if (confirmType === "action") {
      history.push(routeFAQCategoryList);
    }
  }

  async function handleSubmit(values: any) {
    const sendData = {
      ...values,
    };
    if (mode === "create") {
      try {
        const response = await createFAQCategory({
          category: [values.category],
        });
        if (response.statusCode) {
          return;
        }
        setTimeout(() => {
          history.push(routeFAQCategoryList);
        }, 1000);
      } catch (e) {
        //
      }
    }
    if (mode === "edit") {
      try {
        const response = await updateCategoryFAQ({
          id,
          body: sendData,
        });
        if (response.statusCode) {
          return;
        }
        setTimeout(() => {
          history.push(routeFAQCategoryList);
        }, 1000);
      } catch (e) {
        //
      }
    }
  }
  return (
    <>
      <div className=" flex items-start">
        <div className="w-full flex-1 items-start">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <CollapsibleBlock className="mb-5" heading={t`category-information`}>
              <Grid container xl={6} lg={8} md={8}>
                <Grid className="mb-4" container>
                  <Grid item lg={8} md={8}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("category-name")}</Label>
                      <Input
                        placeholder={t("category-name")}
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        errorMessage={formik.touched.category ? t(formik.errors.category as "to_ship") : ""}
                        inputProps={{
                          maxLength: 255,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CollapsibleBlock>
            <div className="flex">
              <Button
                className="mr-7.5 w-343px h-50px bg-orange-light text-white hover:bg-orange-hover"
                variant="text"
                type="submit"
              >
                {t("submit")}
              </Button>
              <Button
                variant="text"
                className="mr-7.5 w-343px h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover"
                onClick={handleClickCancelEdit}
              >
                {t("cancel")}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Modal
        open={isOpenModal}
        confirmType={confirmType}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
      />
    </>
  );
}
