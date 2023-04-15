import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, CollapsibleBlock, GoBack, Input, Label, Modal } from "src/components";
import { routeArticleCategoryList } from "src/constants/routes";
import { useEffect, useState } from "react";
import { useAppDispatch } from "src/hooks/redux.hook";
import { notifyToast } from "src/constants/toast";
import { addNewsAction, updateNewsAction } from "src/store/news-article-categories.action";
const queryString = require("query-string");

export type NewsArticleFormCateProps = {
  type: "Edit" | "Create";
};
export function NewsArticleCateForm({ type }: NewsArticleFormCateProps) {
  const location = useLocation();
  const { id, name } = queryString.parse(location.search);
  const [topicName, setTopicName] = useState<string>(name || "");
  const [visibleConfirmModal, setVisibleConfirmModal] = useState(false);
  const [hasError, setHasError] = useState(false);
  const history = useHistory();

  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  function handleChangeTopicName(topicName: string) {
    setHasError(!topicName.trim());
    setTopicName(topicName);
  }

  function handleSubmit() {
    if (!topicName.trim()) {
      setHasError(true);
      return;
    }
    if (type === "Create") {
      dispatch(
        addNewsAction({
          name: topicName.trim(),
          onSuccess,
          onError: (err) => onError(err?.message),
        }),
      );
    }
    if (type === "Edit" && id) {
      dispatch(
        updateNewsAction({
          id,
          name: topicName.trim(),
          onSuccess,
          onError: (err) => onError(err?.message),
        }),
      );
    }
  }

  function onSuccess() {
    history.push(routeArticleCategoryList);
  }

  function onError(err?: string) {
    notifyToast("error", err || "", t);
  }
  useEffect(() => {}, [t]);

  return (
    <div className="py-5 px-5">
      <GoBack url={routeArticleCategoryList} />
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("category-information")}>
        <div className="flex flex-col w-[716px]">
          <Label required>{t("category-name")}</Label>
          <Input
            placeholder={t("category-name")}
            onChange={(e) => handleChangeTopicName(e.target.value)}
            errorMessage={hasError ? t("required_fields") : ""}
            defaultValue={name}
            inputProps={{
              maxLength: 255,
            }}
          />
        </div>
      </CollapsibleBlock>

      <div>
        <Button
          className="mr-7.5 w-[343px] h-50px bg-orange-light text-white hover:bg-orange-hover"
          variant="text"
          onClick={handleSubmit}
          type="submit"
        >
          {t("submit")}
        </Button>
        <Button
          variant="text"
          className="w-[343px] h-50px border border-solid border-orange-light text-orange-light hover:border-orange-hover hover:text-orange-hover"
          onClick={() => {
            setVisibleConfirmModal(true);
          }}
        >
          {t("cancel")}
        </Button>
      </div>
      <Modal
        open={visibleConfirmModal}
        confirmType={"action"}
        onConfirm={() => history.push(routeArticleCategoryList)}
        onClose={() => setVisibleConfirmModal(false)}
      />
    </div>
  );
}
