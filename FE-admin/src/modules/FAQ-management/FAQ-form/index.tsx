/* eslint-disable indent */
import { useCallback, useEffect, useMemo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import { getParams } from "src/store/router-params.slice";
import { RootState } from "src/store";
import {
  Button,
  CollapsibleBlock,
  EditorDescription,
  Input,
  Label,
  Modal,
  Select,
} from "src/components";
import { useIsErrorMessage } from "src/hooks";
import "./styles.css";
import { routeFAQManagement } from "src/constants/routes";
import { internalUserSchema } from "./schema";
import { InputDatePicker2 } from "src/components/date-range-2";
import { resetFAQ, setCanSwitch } from "src/store/faq.slice";
import { createFAQ, updateFAQ } from "src/services/faq.services";
import { getCategoryFaqAction, getDetailFaqAction } from "src/store/faq.action";
interface FAQFormProps {
  mode?: "create" | "edit";
}
type ParamsType = {
  id: string;
};
export default function FAQForm({ mode }: FAQFormProps) {
  const [from, setFrom] = useState<Date | undefined>(undefined);
  const [to, setTo] = useState<Date | undefined>(undefined);
  const [descriptionEn, setDescriptionEn] = useState<string>("");
  const [descriptionTh, setDescriptionTh] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("Inactive");
  const [errors, setErrors] = useState({
    category: "",
    date: "",
    answerEn: "",
    answerTh: "",
  });
  const [showError, setShowError] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [confirmType, setConfirmType] = useState<"action" | "cancel" | "langContent">("action");
  const [languageContent, setLanguageContent] = useState<string | null>("English");
  const { t } = useTranslation("common");
  const { id } = useParams<ParamsType>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { FAQDetail } = useSelector((state: RootState) => state.faq);
  const { categoryFAQData } = useSelector((state: RootState) => state.faq);
  const url = new URL(window.location.href);
  const link = url.searchParams.get("languageContent");
  useEffect(() => {
    setLanguageContent(link);
  }, [window.location.href]);
  useEffect(() => {
    dispatch(getCategoryFaqAction());
  }, [dispatch]);
  useEffect(() => {
    if (id && mode === "edit") {
      dispatch(getDetailFaqAction(id));
      dispatch(getParams(id));
    }
    if (mode === "create") {
      dispatch(resetFAQ());
    }
  }, [dispatch, id, mode]);
  useEffect(() => {
    setShowError(false);
    if (languageContent === "Thai") {
      if (formik.values.answerEn === "" || formik.values.questionEn === "") {
        formik.setFieldValue("questionEn", "");
        formik.setFieldValue("answerEn", "");
        formik.setFieldError("questionTh", "");
        formik.setFieldError("questionTh", "");
        setDescriptionEn("");
      }
    }
    if (languageContent === "English") {
      if (formik.values.answerTh === "" || formik.values.questionTh === "") {
        formik.setFieldValue("questionTh", "");
        formik.setFieldValue("answerTh", "");
        formik.setFieldError("questionEn", "");
        formik.setFieldError("questionEn", "");
        setDescriptionTh("");
      }
    }
  }, [languageContent, link]);
  const initialValues = useMemo(() => {
    if (mode === "edit") {
      setStatus(FAQDetail.status);
      setCategory(FAQDetail.category);
      setFrom(FAQDetail.publishStartDate ? new Date(FAQDetail.publishStartDate) : new Date());
      setTo(FAQDetail?.publishEndDate ? new Date(FAQDetail?.publishEndDate) : undefined);
      setDescriptionEn(FAQDetail.answer.en);
      setDescriptionTh(FAQDetail.answer.th);
      return {
        questionEn: FAQDetail.question.en,
        questionTh: FAQDetail.question.th,
        answerEn: FAQDetail.answer.en,
        answerTh: FAQDetail.answer.th,
      };
    }
    return {
      questionEn: "",
      questionTh: "",
      answerEn: "",
      answerTh: "",
    };
  }, [FAQDetail, mode]);
  const isErrorMessage = useIsErrorMessage(errors);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
    validationSchema: internalUserSchema,
  });
  useEffect(() => {
    setShowError(false);
  }, [category, descriptionEn, descriptionTh, formik.values, status]);
  useEffect(() => {
    if (
      ((formik.values.questionEn === "" && descriptionEn) ||
        (descriptionEn === "" && formik.values.questionEn)) &&
      link === "English"
    ) {
      dispatch(setCanSwitch(false));
    } else if (
      ((formik.values.questionTh === "" && descriptionTh) ||
        (descriptionTh === "" && formik.values.questionTh)) &&
      link === "Thai"
    ) {
      dispatch(setCanSwitch(false));
    } else {
      dispatch(setCanSwitch(true));
    }
  }, [formik.values.questionEn, formik.values.questionTh, link, descriptionEn, descriptionTh]);
  function handleChangeStatus(value: string | null) {
    if (value) setStatus(value);
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
      history.push(routeFAQManagement);
    }
  }
  const handleSelectDate = useCallback(
    (startDate, endDate) => {
      setErrors({ ...errors, date: "" });
      setFrom(startDate);
      setTo(endDate);
    },
    [errors],
  );
  function handleSelectCategoryFilter(category: string | null) {
    setErrors({ ...errors, category: "" });
    category && setCategory(category);
  }
  useEffect(() => {
    link === "Thai"
      ? formik.setFieldValue("answerTh", descriptionTh)
      : formik.setFieldValue("answerEn", descriptionEn);
  }, [descriptionEn, descriptionTh]);

  async function handleSubmit(values: any) {
    const sendData = {
      question: {
        en: values.questionEn,
        th: values.questionTh,
      },
      category,
      publishStartDate: from?.toISOString(),
      publishEndDate: to?.toISOString(),
      status,
      answer: {
        en: descriptionEn,
        th: descriptionTh,
      },
    };
    if (!category) {
      setErrors({ ...errors, category: "required_fields" });
      return;
    }
    if (!from) {
      setErrors({ ...errors, date: "required_fields" });
      return;
    }
    if (!descriptionEn && values.questionEn && link === "English") {
      setErrors({ ...errors, answerEn: "required_fields" });
      return;
    }
    if (!descriptionTh && values.questionTh && link === "Thai") {
      setErrors({ ...errors, answerTh: "required_fields" });
      return;
    }
    if (!isErrorMessage && mode === "create") {
      try {
        const response = await createFAQ({
          ...sendData,
        });
        if (response.statusCode) {
          return;
        }
        setTimeout(() => {
          history.push(routeFAQManagement);
        }, 1000);
      } catch (e) {
        //
      }
    }
    if (!isErrorMessage && mode === "edit") {
      try {
        const response = await updateFAQ({
          id,
          body: sendData,
        });
        if (response.statusCode) {
          return;
        }
        setTimeout(() => {
          history.push(routeFAQManagement);
        }, 1000);
      } catch (e) {
        //
      }
    }
  }
  return (
    <>
      <div className=" flex items-start">
        <div className="w-full mr-5 flex-1 items-start">
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <CollapsibleBlock className="mb-5" heading={t`general-information`}>
              <Grid container xl={6} lg={8} md={8}>
                <Grid className="mb-4" container>
                  <Grid item lg={12} md={12}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t("question-name")}</Label>
                      <Input
                        placeholder={t("question-name")}
                        name={languageContent === "English" ? "questionEn" : "questionTh"}
                        multiline={true}
                        value={
                          languageContent === "English"
                            ? formik.values.questionEn
                            : formik.values.questionTh
                        }
                        onChange={formik.handleChange}
                        errorMessage={
                          // eslint-disable-next-line no-nested-ternary
                          formik.touched.questionTh
                            ? t(formik.errors.questionTh as "to_ship")
                            : formik.touched.questionEn
                            ? t(formik.errors.questionEn as "to_ship")
                            : ""
                        }
                        inputProps={{
                          maxLength: 2500,
                        }}
                      />
                    </div>
                  </Grid>
                </Grid>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col  mr-4">
                      <Label required>{t("category")}</Label>
                      <Select
                        className="w-full"
                        placeholder={t("select-category")}
                        defaultValue={category}
                        options={
                          categoryFAQData?.length > 0
                            ? categoryFAQData?.map((category) => ({
                                title: category.name,
                                value: category._id,
                              }))
                            : []
                        }
                        onChange={handleSelectCategoryFilter}
                        error={t(errors.category as "to_ship")}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col  mr-4">
                      <Label required>{t("status")}</Label>
                      <Select
                        options={[
                          { title: t`active`, value: "Active" },
                          { title: t`inactive`, value: "Inactive" },
                        ]}
                        defaultValue={status}
                        onChange={handleChangeStatus}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t`publish-date`}>
              <Grid container xl={6} lg={8} md={8}>
                <Grid className="mb-4" container>
                  <Grid item lg={6} md={6}>
                    <div className="flex flex-col mr-4">
                      <Label required>{t`publish-period`}</Label>
                      <InputDatePicker2
                        handleSelect={handleSelectDate}
                        className="h-12 w-full focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
                        defaultFrom={from}
                        defaultTo={to}
                        placeholder={t`all`}
                        error={t(errors.date as "to_ship")}
                        minDate={mode === "create" ? new Date() : undefined}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </CollapsibleBlock>
            <CollapsibleBlock className="mb-5" heading={t`answer`}>
              <Grid container direction="column" lg={6}>
                <div className="description">
                  <EditorDescription
                    configs={{
                      limitChars: Infinity,
                      askBeforePasteHTML: false,
                      askBeforePasteFromWord: false,
                    }}
                    description={languageContent === "English" ? descriptionEn : descriptionTh}
                    onBlurEditor={(content, _chars, _words) => {
                      languageContent === "English"
                        ? setDescriptionEn(content)
                        : setDescriptionTh(content);
                      languageContent === "Thai"
                        ? formik.setFieldValue("answerTh", content)
                        : formik.setFieldValue("answerEn", content);
                    }}
                    errors={
                      languageContent === "English"
                        ? t(errors.answerEn as "answer")
                        : t(errors.answerTh as "answer")
                    }
                  />
                  <input
                    className="hidden"
                    name={languageContent === "English" ? "answerEn" : "answerTh"}
                    value={languageContent === "English" ? descriptionEn : descriptionTh}
                  />
                  <div className="text-sm text-red-light">
                    {showError &&
                      (languageContent === "English"
                        ? t(formik.errors.answerEn as "answer")
                        : t(formik.errors.answerTh as "answer"))}
                  </div>
                </div>
              </Grid>
            </CollapsibleBlock>
            <div className="flex">
              <Button
                className="mr-7.5 w-343px h-50px bg-orange-light text-white hover:bg-orange-hover"
                variant="text"
                type="submit"
                onClick={() => {
                  setShowError(true);
                }}
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
        onClose={() => {
          setIsOpenModal(false);
        }}
        onConfirm={handleConfirm}
      />
    </>
  );
}
