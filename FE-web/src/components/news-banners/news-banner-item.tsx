import { useMemo } from "react";
import dayjs from "dayjs";

import useTranslation from "next-translate/useTranslation";
import { NewsArticleModel } from "types/api-response-type";
import classNames from "classnames";
import { CalendarArcticle, ViewBannerArcticle } from "src/components";
import NumberFormatCustome from "src/components/text/number-format";
import cls from "./banner.module.css";

export default function NewsBannerItem({
  acticle,
  height,
}: {
  acticle: NewsArticleModel;
  height?: number;
}) {
  const { imageUrl, name, startPublishDate, views } = acticle;

  const { lang } = useTranslation("common");
  const nameArticle = useMemo(() => {
    if (!name.en) {
      return name.th;
    }
    if (!name.th) {
      return name.en;
    }
    return lang === "en" ? name.en : name.th;
  }, [name, lang]);

  return (
    <div className={`main-banner__slider-item relative ${height ? `height-${height}` : ""}`}>
      <img
        src={imageUrl}
        alt={""}
        className={classNames(cls.d_block, cls.w_100, "h-[375px] sm:h-[600px]")}
      />
      <div className="w-1/2 absolute left-5 bottom-5 text-white flex flex-col font-kanit z-50">
        <div className={classNames("font-normal text-xs sm:text-base mb-1", cls.acticleTitle)}>
          {nameArticle}
        </div>
        <div className="mt-0.5 flex items-center">
          <div className="text-[0.625rem] sm:text-sm font-light flex mr-5 items-center">
            <div className="pr-[5px] sm:pr-2">
              <CalendarArcticle className="w-3 sm:w-auto" />
            </div>
            {dayjs(startPublishDate).format("DD-MM-YYYY")}
          </div>
          <div className="flex items-center">
            <div className="pr-[5px] sm:pr-2">
              <ViewBannerArcticle className="w-3 sm:w-auto" />
            </div>
            <NumberFormatCustome
              value={views}
              className="text-white text-[0.625rem] sm:text-sm  font-light"
            />
          </div>
        </div>
      </div>
      <div className="absolute left-0 bottom-0 w-full h-1/6 bg-fade z-10 opacity-80"></div>
    </div>
  );
}
