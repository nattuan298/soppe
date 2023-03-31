import { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useTranslation from "next-translate/useTranslation";
import { apiRoute } from "src/constants/apiRoutes";
import axios from "src/lib/client/request";

import { NewsArticleModel } from "types/api-response-type";
import paramsSerializer from "src/lib/paramsSerializer";
import { SectionArcticle } from "src/components";

interface PropsType {
  existArticle: Array<string>;
}

interface ParamUrlType {
  page: number;
  pageSize: number;
}

export default function MoreArticles({ existArticle }: PropsType) {
  const [moreArticles, setMoreArticles] = useState<Array<NewsArticleModel>>([]);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const { t } = useTranslation("common");

  const hasMore = useMemo(() => moreArticles.length < total, [moreArticles, total]);

  const getArticles = async (config: ParamUrlType) => {
    const params = paramsSerializer(config);
    const paramsURL = params !== "" ? `?${params}` : "";
    try {
      const response = await axios.get(`${apiRoute.article.getArticles}${paramsURL}`);
      return response.data;
    } catch (err) {
      return { data: [] };
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();
      const configParam = {
        page: 1,
        existArticle,
        pageSize: 20,
        currentDate: now.toISOString(),
      };
      const response = await getArticles(configParam);
      setMoreArticles(response.data);
      setTotal(response.total);
      setPage(1);
    };
    fetchData();
  }, [existArticle]);

  const getMoreProducts = async () => {
    const now = new Date();
    const configParam = {
      page: page + 1,
      existArticle,
      pageSize: 20,
      currentDate: now.toISOString(),
    };
    const response = await getArticles(configParam);
    const articles = response.data;
    setMoreArticles((currentArticles) => [...currentArticles, ...articles]);
    setPage((page) => page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={moreArticles.length}
      next={getMoreProducts}
      hasMore={hasMore}
      loader={null}
    >
      <SectionArcticle name={t`more-articles`} articles={moreArticles} />
    </InfiniteScroll>
  );
}
