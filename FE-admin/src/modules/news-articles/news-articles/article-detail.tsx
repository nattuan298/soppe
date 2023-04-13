/* eslint-disable indent */
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { CollapsibleBlock, GoBack } from "src/components";
import { CalendarIcon, EyeIcon } from "src/components/icons";
import { routeArticleList } from "src/constants/routes";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { formatNumber } from "src/lib/common.lib";
import { getDetailNewsAction } from "src/store/news-articles.action";
import { ArticleCategory, NewsArticleParams } from "src/types/news-article.model";
const queryString = require("query-string");

export interface ArticleDetailSearchBoxProps {
  searchParams: NewsArticleParams;
  onSearchValueChange: (searchValue: NewsArticleParams) => void;
  allNewsArticleCates: ArticleCategory[];
}
export function ArticleDetail() {
  const { t } = useTranslation("common");
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { detailNewsArticles } = useAppSelector((state) => state.newsArt);
  const lang = localStorage.getItem("i18nextLng");
  const { id } = queryString.parse(location.search);

  useEffect(() => {
    id && dispatch(getDetailNewsAction(id));
  }, []);

  return (
    <div className="p-5">
      <GoBack url={routeArticleList} />
      <CollapsibleBlock className="mb-10 shadow-box" heading={t("full-article-detail")}>
        <div className="m-auto w-[70%] text-[#707070] text-lg font-light">
          {detailNewsArticles?.imageUrl && (
            <div className="w-full h-[500px] relative mb-5">
              <img
                className="w-full h-full object-cover"
                src={detailNewsArticles.imageUrl}
                alt="thumnail article detail"
              />

              <div className="absolute bottom-5 left-10 text-white ">
                <p className="mb-2 text-lg truncate w-[500px]">
                  {lang === "en"
                    ? `${
                        detailNewsArticles?.name?.en
                          ? detailNewsArticles?.name?.en
                          : detailNewsArticles?.name?.th
                      }`
                    : `${
                        detailNewsArticles?.name.th
                          ? detailNewsArticles?.name?.th
                          : detailNewsArticles?.name?.en
                      }`}
                </p>
                <p className="flex items-center">
                  <CalendarIcon className="mr-4" fill="white" />
                  <p className="mr-8 text-sm">
                    {dayjs(detailNewsArticles?.createdAt).format("DD-MM-YYYY")}
                  </p>
                  <EyeIcon className="mr-4 w-6 h-6" fill="white" />
                  <p className="text-sm">{formatNumber(detailNewsArticles?.views)}</p>
                </p>
              </div>
            </div>
          )}

          <div
            className="break-words"
            dangerouslySetInnerHTML={{
              __html:
                lang === "en"
                  ? `${
                      detailNewsArticles?.content.en
                        ? detailNewsArticles?.content.en
                        : detailNewsArticles?.content.th
                    }`
                  : `${
                      detailNewsArticles?.content.th
                        ? detailNewsArticles?.content.th
                        : detailNewsArticles?.content.en
                    }`,
            }}
          ></div>
        </div>
      </CollapsibleBlock>
    </div>
  );
}
