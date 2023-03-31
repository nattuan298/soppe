/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from "dayjs";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeftNavination } from "src/components";
import { DateIcon, EllipseIcon, EyeIcon, HelpFulIcon, NoHelpFulIcon } from "src/components/svgs";
import {
  reviewHelpful,
  reviewNotHelpful,
} from "src/feature/help-center/help-center-3/faq-detail.slice";
import { fetchGetFAQDetail } from "src/feature/help-center/help-center-3/faq-detail.action";
import { FormatNumber } from "src/lib/format-number";
import { RootState } from "src/state/store";
import styles from "./help-center-3.module.css";
import { CircularProgress } from "@material-ui/core";

export function HelpCenter3() {
  const { t, lang } = useTranslation("common");
  const [helpful, setHelpful] = useState<boolean>(false);
  const [notHelpful, setNotHelpful] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { faqDetailData, loading } = useSelector((state: RootState) => state.faqDetail);

  const { id } = router.query;

  const getFAQDetailData = useCallback(() => {
    id && dispatch(fetchGetFAQDetail(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    const initReview = async () => {
      if (localStorage.getItem("helpFul")) {
        if (id) {
          await reviewHelpful(id);
        }
        localStorage.removeItem("helpFul");
      }
      getFAQDetailData();
    };

    initReview();

    return () => {
      if (localStorage.getItem("helpFul")) {
        id && reviewHelpful(id);
        localStorage.removeItem("helpFul");
      }
      if (localStorage.getItem("notHelpFul")) {
        id && reviewNotHelpful(id);
        localStorage.removeItem("notHelpFul");
      }
    };
  }, [id]);

  const handleHelpful = () => {
    localStorage.setItem("helpFul", "helpFul");
    setHelpful(true);
    if (notHelpful) {
      setNotHelpful(false);
      localStorage.removeItem("notHelpFul");
    }
  };

  const handleNotHelpful = () => {
    localStorage.setItem("notHelpFul", "notHelpFul");
    setNotHelpful(true);
    if (helpful) {
      setHelpful(false);
      localStorage.removeItem("helpFul");
    }
  };
  const question = useMemo(() => {
    if (!faqDetailData?.question?.en) {
      return faqDetailData.question?.th;
    }
    if (!faqDetailData?.question?.th) {
      return faqDetailData.question?.en;
    }
    return lang === "en" ? faqDetailData.question.en : faqDetailData.question.th;
  }, [faqDetailData?.question?.en, faqDetailData?.question?.th, lang]);
  const answer = useMemo(() => {
    if (!faqDetailData?.answer?.en) {
      return faqDetailData.answer?.th;
    }
    if (!faqDetailData?.answer?.th) {
      return faqDetailData.answer?.en;
    }
    return lang === "en" ? faqDetailData.answer.en : faqDetailData.answer.th;
  }, [faqDetailData?.answer?.en, faqDetailData?.answer?.th, lang]);
  return (
    <div className="md:mx-auto md:w-1216 mb-8 mx-4 md:mx-0">
      <div className="float-left w-1/4 mb-8 hidden md:block">
        <LeftNavination />
      </div>
      <div className="md:float-left md:w-3/4 mt-4 md:mt-0">
        <div className="w-full">
          {!loading ? (
            <>
              <div className="text-base font-medium">
                <span className="float-left">{t`question`}&nbsp;</span>
                <div className="w-11/12">{faqDetailData ? question : null}</div>
              </div>
              <div className="mt-1.5">
                <div>
                  <div className="float-left">
                    <DateIcon />
                  </div>
                  <span className={`${styles.txtInformation} ${styles.txtDate} float-left`}>
                    {faqDetailData && faqDetailData.publishStartDate
                      ? dayjs(faqDetailData.publishStartDate).format("DD-MM-YYYY")
                      : null}
                  </span>
                </div>
                <div>
                  <div className={`${styles.iconEye}`}>
                    <EyeIcon />
                  </div>
                  <span className={`${styles.txtInformation} ${styles.txtView} float-left`}>
                    {faqDetailData ? <FormatNumber value={faqDetailData.views} /> : null}
                  </span>
                </div>
                <div>
                  <div className={`${styles.iconEllipse}`}>
                    <EllipseIcon />
                  </div>
                  <span className={`${styles.txtInformation} ${styles.txtCount} float-left`}>
                    {faqDetailData ? <FormatNumber value={faqDetailData.helpful} /> : null}
                  </span>
                  <span className={`${styles.txtInformation} ${styles.txtLike} float-left`}>
                    {t`people-found-this-article-helpful`}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full">
              <div className="w-24 mx-auto">
                <CircularProgress />
              </div>
            </div>
          )}
        </div>

        <div className="w-full float-left mt-2 pb-8 jodit">
          {!loading && faqDetailData && faqDetailData.answer ? (
            <div dangerouslySetInnerHTML={{ __html: answer as "string" }} />
          ) : null}
        </div>

        <div className="float-left pb-7 w-full">
          <div className={`${styles.crossbar} w-full `}></div>
          <div className="text-center pt-7 pb-7">
            <label>
              <p className="text-sm">{t`was_this_article_helpful`}</p>
            </label>
            <div className="flex justify-between w-32 mx-auto pt-5">
              <div className="flex-1 flex items-center">
                <div role="button" onClick={handleHelpful}>
                  {helpful ? (
                    <HelpFulIcon fill={"#FF7500"} className=" inline-block mr-1.5" />
                  ) : (
                    <HelpFulIcon className=" inline-block mr-1.5" />
                  )}
                </div>
                {helpful ? (
                  <span className="text-sm mr-1.5 mt-1 text-orange">{t`yes`}</span>
                ) : (
                  <span className="text-sm mr-1.5 mt-1">{t`yes`}</span>
                )}
              </div>
              <div className="flex-1 flex items-center">
                <div role="button" onClick={handleNotHelpful}>
                  {notHelpful ? (
                    <NoHelpFulIcon className="inline-block ml-1.5" fill={"#FF7500"} />
                  ) : (
                    <NoHelpFulIcon className="inline-block ml-1.5" />
                  )}
                </div>
                {notHelpful ? (
                  <span className="text-sm ml-1.5 mt-1 text-orange">{t`no`}</span>
                ) : (
                  <span className="text-sm ml-1.5 mt-1">{t`no`}</span>
                )}
              </div>
            </div>
          </div>
          <div className={`${styles.crossbar} w-full `}></div>
        </div>
      </div>
    </div>
  );
}
