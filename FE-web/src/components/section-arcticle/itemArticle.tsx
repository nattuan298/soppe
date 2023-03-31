import { useMemo } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import NumberFormatCustome from "src/components/text/number-format";
import { NewsArticleModel } from "types/api-response-type";
import cls from "./articles.module.css";
import classnames from "classnames";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

export default function ItemArcticle({
  article,
  isArticle,
}: {
  article: NewsArticleModel;
  isArticle?: boolean;
}) {
  const { imageUrl, name, views, startPublishDate, _id } = article;
  const { lang } = useTranslation("common");
  const linkUrl = useMemo(() => `/news-article/${_id}`, [_id]);
  const screen = useGetScreenWidth();
  const nameArticle = useMemo(() => {
    if (!name.en) {
      return name.th;
    }
    if (!name.th) {
      return name.en;
    }
    return lang === "en" ? name.en : name.th;
  }, [name, lang]);
  const widthImageArticle = useMemo(() => {
    if (screen !== "Desktop") {
      return isArticle ? 165 : 160;
    }
    return 290;
  }, [screen, isArticle]);
  const heightImageArticle = useMemo(() => {
    if (screen !== "Desktop") {
      return isArticle ? 120 : 160;
    }
    return 211;
  }, [screen, isArticle]);
  return (
    <Link as={linkUrl} href={linkUrl} shallow>
      <a target={""}>
        <div className={classnames(cls.article, "")}>
          <div className={classnames(cls.wr_image)}>
            <Image
              className={cls.article_image}
              width={widthImageArticle}
              height={heightImageArticle}
              src={imageUrl}
              layout="fixed"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between h-[56px] sm:h-4.375">
            <div className={cls.title_article}>{nameArticle}</div>
            <div className={`${cls.info_line} flex items-center`}>
              <img
                src="/assets/images/date_range_black_24dp.png"
                alt=""
                width="14"
                height="14"
                className={cls.date_icon}
              />
              <div className={cls.date}>{dayjs(startPublishDate).format("DD-MM-YYYY")}</div>
              <img
                src="/assets/images/read_black_24dp.png"
                alt=""
                width="14"
                height="14"
                className={cls.view_icon}
              />
              <NumberFormatCustome value={views} className={cls.view} />
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
