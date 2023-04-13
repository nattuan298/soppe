import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CollapsibleBlock } from "src/components";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { PreviewFAQ } from "src/services/faq.services";
import { FAQDetailModel } from "src/types/faq.model";
import dayjs from "dayjs";
import "./styles.css";
import { DateIcon, EyeIcon } from "src/components/icons";
type ParamsType = {
  id: string;
};
export default function FAQPreview() {
  const lang = localStorage.getItem("i18nextLng");
  const { t } = useTranslation("common");
  const [detail, setDetail] = useState<FAQDetailModel>({
    _id: "",
    question: {
      en: "",
      th: "",
    },
    createdAt: "",
    publishStartDate: "",
    publishEndDate: "",
    status: "",
    views: 0,
    helpful: 0,
    notHelpful: 0,
    category: "",
    answer: {
      en: "",
      th: "",
    },
    id: "",
  });
  const { id } = useParams<ParamsType>();
  const getDetail = useCallback(async (id) => {
    try {
      const response = (await PreviewFAQ(id)) as any;
      setDetail(response);
    } catch {}
  }, []);

  useEffect(() => {
    getDetail(id);
  }, [id, getDetail]);
  return (
    <>
      <div className=" flex items-start">
        <div className="w-full mr-5 flex-1 items-start">
          <CollapsibleBlock className="mb-5" heading={t`full-FAQ-detail`}>
            <Grid container lg={6} xl={6} md={8} className="mx-auto">
              <div>
                <div className="text-base question">
                  {t`question`}:
                  {lang === "en"
                    ? `${detail.question.en ? detail.question.en : detail.question.th}`
                    : `${detail.question.th ? detail.question.th : detail.question.en}`}
                </div>
                <div className="flex info">
                  <div className="flex mr-2.5">
                    <DateIcon className="mr-1.5" />
                    <div className="text-small">{dayjs(detail.createdAt).format("DD-MM-YYYY")}</div>
                  </div>
                  <div className="flex mr-2.5">
                    <EyeIcon className="mr-1.5" />
                    <div className="text-small">{detail.views}</div>
                  </div>
                  <div className="flex">
                    <div className="text-helpful mr-1.5">{detail.helpful}</div>
                    <div className="text-small">{t`preview-faq`}</div>
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      lang === "en"
                        ? `${detail.answer.en ? detail.answer.en : detail.answer.th}`
                        : `${detail.answer.th ? detail.answer.th : detail.answer.en}`,
                  }}
                  className="answer"
                ></div>
              </div>
            </Grid>
          </CollapsibleBlock>
        </div>
      </div>
    </>
  );
}
