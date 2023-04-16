/* eslint-disable indent */
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Button,
  CollapsibleBlock,
  EditorDescription,
  GoBack,
  Input,
  Label,
  Modal,
  OptionType,
  Select,
  getCharsAndWords,
} from "src/components";
import { routeArticleList } from "src/constants/routes";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { getStatus } from "src/constants/common.constants";
import { UploadPreviewMedia } from "./upload-preview-media";
import { InputDatePicker2 } from "src/components/date-range-2";
import { NewsArticle, NewsArticle2 } from "src/types/news-article.model";
import { ApiResponseError, CallbackResponse, StatusElement } from "src/types/common.modal";
import { setCanSwitch } from "src/store/news-articles.slice";
import { uploadImageFull } from "src/services/upload-image.services";
import { scrollToElement } from "src/lib/common.lib";

import dayjs from "dayjs";
import { notifyToast } from "src/constants/toast";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { getAllCategoryArtAction } from "src/store/news-article-categories.action";
import {
  addNewsAction,
  getDetailNewsAction,
  updateNewsAction,
} from "src/store/news-articles.action";
const queryString = require("query-string");
export type NewsArticleFormCProps = {
  type: "Edit" | "Create";
};

export function NewsArticleForm({ type }: NewsArticleFormCProps) {
  const location = useLocation();
  const { id } = queryString.parse(location.search);
  const [selectedMedida, setSelectedMedida] = useState<File | null>();
  const [contentEn, setContentEn] = useState<string>("");
  const [contentTh, setContentTh] = useState<string>("");
  const [modalType, setModalType] = useState<"action" | "confirm">("action");
  const [visibleModal, setVisibleModal] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const history = useHistory();
  const [languageContent, setLanguageContent] = useState<string | null>("English");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { CanSwitch } = useSelector((state: RootState) => state.newsArt);
  const { t } = useTranslation("common");
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  params.set("languageContent", languageContent || "en");
  const link = url.searchParams.get("languageContent");
  const dispatch = useAppDispatch();
  const {
    newsArt: { detailNewsArticles },
    newsArtCates: { allNewsArticleCates },
  } = useAppSelector((state) => state);
  const [newsArticle, setNewsArticle] = useState<NewsArticle2>({
    name: {
      en: "",
      th: "",
    },
    status: "Active",
    category: "",
    image: "",
    startPublishDate: "",
    endPublishDate: "",
    content: {
      en: "",
      th: "",
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    category: "",
    date: "",
    content: "",
  });
  useEffect(() => {
    if (
      ((newsArticle?.name?.en === "" && contentEn) ||
        (contentEn === "" && newsArticle?.name?.en)) &&
      languageContent === "English"
    ) {
      dispatch(setCanSwitch(false));
    } else if (
      ((newsArticle?.name?.th === "" && contentTh) ||
        (contentTh === "" && newsArticle?.name?.th)) &&
      languageContent === "Thai"
    ) {
      dispatch(setCanSwitch(false));
    } else {
      dispatch(setCanSwitch(true));
    }
  }, [newsArticle?.name?.en, newsArticle?.name?.th, contentEn, contentTh, link]);
  const startDateDf = newsArticle?.startPublishDate
    ? dayjs(newsArticle.startPublishDate).toDate()
    : undefined;
  const endDateDf = newsArticle?.endPublishDate
    ? dayjs(newsArticle.endPublishDate).toDate()
    : undefined;
  useEffect(() => {
    if (type === "Edit") dispatch(getDetailNewsAction(id));
    dispatch(getAllCategoryArtAction());
  }, []);
  useEffect(() => {
    setErrors({
      name: "",
      category: "",
      date: "",
      content: "",
    });
    if (languageContent === "Thai") {
      if (newsArticle.name.en === "" || contentEn === "") {
        setNewsArticle({
          ...newsArticle,
          name: {
            th: newsArticle.name.th,
            en: "",
          },
          content: {
            th: newsArticle.content.th,
            en: "",
          },
        });
        setContentEn("");
      }
    }
    if (languageContent === "English") {
      if (newsArticle.name.th === "" || contentTh === "") {
        setNewsArticle({
          ...newsArticle,
          name: {
            en: newsArticle.name.en,
            th: "",
          },
          content: {
            en: newsArticle.content.en,
            th: "",
          },
        });
        setContentTh("");
      }
    }
  }, [languageContent, link]);
  useEffect(() => {
    if (type === "Edit") {
      setNewsArticle(detailNewsArticles as any);
      setContentEn(detailNewsArticles?.content?.en || "");
      setContentTh(detailNewsArticles?.content?.th || "");
    }
    if (type === "Create") {
      setContentEn("");
      setContentTh("");
    }
  }, [JSON.stringify(detailNewsArticles)]);

  const handleNameChange = (name: string | null) => {
    setErrors({ ...errors, name: getNameError(name) });
    languageContent === "English"
      ? setNewsArticle({
          ...newsArticle,
          name: {
            th: newsArticle.name.th,
            en: name,
          },
        })
      : setNewsArticle({
          ...newsArticle,
          name: {
            en: newsArticle.name.en,
            th: name,
          },
        });
  };
  useEffect(() => {
    history.push(`?${params.toString()}`);
  }, [languageContent]);
  function handleRangeDateChange(startDate?: Date, endDate?: Date) {
    setErrors({
      ...errors,
      date: getDateError(startDate, endDate),
    });
    setNewsArticle({
      ...newsArticle,
      startPublishDate: startDate && startDate.toISOString(),
      endPublishDate: endDate && endDate.toISOString(),
    });
  }

  function getDateError(startDate?: Date | string, endDate?: Date | string) {
    return !startDate && !endDate ? "pls-fill-publish-period" : "";
  }

  function getContentError(
    words: number,
    content?: string,
    contentCompare?: string | null,
    name?: string,
  ) {
    if (!words && !content && !contentCompare) return "pls-fill-article-writing";
    if (!words && !content && name) return "pls-fill-article-writing";
    if (!content && contentCompare) return "";
    if (((content || "").match(/<img/gm) || []).length > 10) {
      return t("max-number-img-10");
    }
    return "";
  }

  function getCateError(category?: string | null) {
    return !category ? "pls-fill-category" : "";
  }

  function getNameError(name: string | null, content?: string, nameCompare?: string) {
    if (!name && !content && nameCompare) {
      return "";
    }
    if (!name) return "pls-fill-article-name";
    if (name.trim().length < 3) return "pls-enter-at-least-3-chars";
    return "";
  }

  async function handleSubmit() {

    setSubmitting(false);
  }

  function onSuccess() {
    type === "Create" && notifyToast("default", t("article-create-successful"), t);
    type === "Edit" && notifyToast("default", t("article-edit-successful"), t);
    history.push(routeArticleList);
  }
  function onError(messErr?: string) {
    notifyToast("error", messErr || "", t);
  }

  async function getImage() {
    const image = newsArticle?.image;
    setSubmitting(true);
    // if (selectedMedida) {
    //   image = await uploadImageFull({ file: selectedMedida, moduleName: "article" });
    // }
    // if (!image) {
    //   setSubmitting(false);
    //   setModalType("confirm");
    //   setVisibleModal(true);
    //   setConfirmText(t("pls-select-article-image"));
    //   return;
    // }
    // return image;
  }

  function getPayload(image: string) {
    return {
      payload: {
        ...newsArticle,
        name: {
          en: newsArticle.name.en !== "" ? newsArticle.name.en : null,
          th: newsArticle.name.th !== "" ? newsArticle.name.th : null,
        },
        content: {
          en: contentEn ? contentEn : null,
          th: contentTh ? contentTh : null,
        },
        image,
      },
      onSuccess,
      onError: (err?: ApiResponseError) => onError(err?.message),
    };
  }

  function hasFormErr() {
    const { words } = getCharsAndWords();
    const updateErr = {
      name: getNameError(
        languageContent === "English" ? newsArticle.name.en : newsArticle.name.th,
        languageContent === "English" ? contentEn : contentTh,
        languageContent === "English" ? newsArticle.name.th || "" : newsArticle.name.en || "",
      ),
      category: getCateError(newsArticle?.category),
      date: getDateError(newsArticle?.startPublishDate, newsArticle?.endPublishDate),
      content: getContentError(
        words,
        languageContent === "English" ? contentEn : contentTh,
        languageContent === "English" ? contentTh || "" : contentEn || "",
        languageContent === "English" ? newsArticle.name.en || "" : newsArticle.name.th || "",
      ),
    };
    setErrors(updateErr);
    return Object.keys(updateErr).some((k) => {
      /* @ts-ignore */
      if (updateErr[k]) scrollToElement(k);
      /* @ts-ignore */
      return updateErr[k];
    });
  }
  const handleChangeLanguage = async (country?: string) => {
    if (CanSwitch) {
      country && setLanguageContent(country);
    } else {
      setIsOpenModal(true);
    }
  };
  function getCateArtOptions(): OptionType[] | [] {
    return [
      ...(allNewsArticleCates || []).map((cate) => ({
        title: cate.name,
        value: cate._id,
      })),
    ];
  }
  const handleConfirm = () => {
    dispatch(setCanSwitch(false));
    link === "English" ? setLanguageContent("Thai") : setLanguageContent("English");
    setIsOpenModal(false);
  };
  function getDefaultCateName(id?: string) {
    if (!id) return "";
    return allNewsArticleCates.find((c) => c._id === id)?.name || "";
  }

  const editorMemo = useMemo(
    () => (
      <EditorDescription
        configs={{
          limitChars: Infinity,
          askBeforePasteHTML: false,
          askBeforePasteFromWord: false,
        }}
        description={languageContent === "English" ? contentEn : contentTh}
        onBlurEditor={(text, _, words) => {
          setErrors({ ...errors, content: getContentError(words, text) });
          languageContent === "English" ? setContentEn(text) : setContentTh(text);
        }}
      />
    ),
    [contentEn, contentTh, languageContent],
  );
  return (
    <div className="p-5">
      <GoBack
        url={routeArticleList}
        SelectLang
        onChange={handleChangeLanguage}
        CanSwitch={CanSwitch}
      />
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("general-information")}>
        <div className="flex flex-col space-y-5 w-[60%]">
          <div id="name">
            <Input
              label={t("article-name")}
              required
              placeholder={t("article-name")}
              onChange={(e) => handleNameChange(e.target.value)}
              errorMessage={t(errors.name as "to_ship")}
              value={
                languageContent === "English" ? newsArticle.name.en : newsArticle.name.th || ""
              }
              inputProps={{
                maxLength: 255,
              }}
            />
          </div>

          <div id="category" className="flex space-x-5">
            <Select
              label={t("category")}
              required
              className="w-full"
              defaultValue={getDefaultCateName(newsArticle?.category)}
              placeholder={t("select-category")}
              options={getCateArtOptions()}
              error={t(errors.category as "to_ship")}
              onChange={(category) => {
                setErrors({ ...errors, category: getCateError(category) });
                setNewsArticle({ ...newsArticle, category: category || "" });
              }}
            />
            <Select
              label={t("status")}
              required
              className="w-full"
              placeholder={t("status")}
              defaultValue={newsArticle?.status}
              options={getStatus(t, true)}
              onChange={(status) =>
                setNewsArticle({ ...newsArticle, status: status as StatusElement })
              }
            />
          </div>
          <UploadPreviewMedia
            defaultMedia={newsArticle?.imageUrl}
            onChangeMedia={(file: File | null) => {
              setNewsArticle({ ...newsArticle, image: file ? file.name : "" });
              setSelectedMedida(file);
            }}
          />
        </div>
      </CollapsibleBlock>
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("publish-date")}>
        <div id="date" className="flex flex-col space-y-1 mb-10 w-[30%] ">
          <Label required>{t("publish-period")}</Label>
          <InputDatePicker2
            handleSelect={(startDate, endDate) => handleRangeDateChange(startDate, endDate)}
            className="h-12 w-full focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
            placeholder={t`all`}
            defaultFrom={startDateDf}
            defaultTo={endDateDf}
            error={t(errors.date as "to_ship")}
            minDate={type === "Create" ? new Date() : undefined}
          />
        </div>
      </CollapsibleBlock>
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("article-writing")}>
        <div className="w-[50%]" id="article-editor">
          {editorMemo}
          {errors.content && (
            <p className="text-sm text-red-light mt-2">{t(errors.content as "to_ship")}</p>
          )}
        </div>
      </CollapsibleBlock>
      <div>
        <Button
          className="mr-7.5 w-[300px] h-50px bg-orange-light text-white hover:bg-orange-hover"
          variant="text"
          onClick={handleSubmit}
          loading={isSubmitting}
          loadingSize={15}
          type="submit"
        >
          {t("submit")}
        </Button>
        <Button
          variant="text"
          className="w-[300px] h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover hover:text-orange-hover"
          onClick={() => {
            setModalType("action");
            setVisibleModal(true);
          }}
        >
          {t("cancel")}
        </Button>
      </div>
      <Modal
        content={confirmText}
        open={visibleModal}
        confirmType={modalType}
        onConfirm={() => {
          modalType === "action" && history.push(routeArticleList);
          modalType === "confirm" && setVisibleModal(false);
        }}
        confirmText={modalType === "confirm" ? t("ok") : ""}
        onClose={() => setVisibleModal(false)}
      />
      <Modal
        open={isOpenModal}
        confirmType={"langContent"}
        onClose={() => {
          setIsOpenModal(false);
        }}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
