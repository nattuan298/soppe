import { Fragment, useMemo, useRef, useState } from "react";
import classnames from "classnames";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { NewsArticleModel } from "types/api-response-type";
import cls from "./articles.module.css";
import ItemArcticle from "./itemArticle";
import ArrowBanner from "./arrow-banner";
interface PropsType {
  name?: string;
  articles: Array<NewsArticleModel>;
  hasNextArrow?: boolean;
}

interface RefObject<T> {
  readonly current: T | null;
}

export function SectionArcticleBanner({ name, articles, hasNextArrow }: PropsType) {
  const [activeSlide, setActiveSlide] = useState(0);
  const refSlider = useRef() as RefObject<Slider>;
  const router = useRouter();

  const slideSettings = useMemo(
    () => ({
      dots: false,
      autoplay: false,
      infinite: !hasNextArrow,
      speed: 1000,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 1250,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }),
    [hasNextArrow],
  );

  const arrowBanner = useMemo(() => {
    if (!hasNextArrow) {
      return <div></div>;
    }
    return <ArrowBanner refSlider={refSlider} activeSlide={activeSlide} length={articles.length} />;
  }, [activeSlide, articles.length, hasNextArrow]);

  if (Array.isArray(articles) && articles.length === 0) {
    return null;
  }
  return (
    <Fragment>
      {name && (
        <div className={`${cls.see_all} mt-4 sm:mt-0 ml-4 sm:ml-0`}>
          <div className={cls.title}>{name}</div>
        </div>
      )}
      <div className={"relative w-full overflow-hidden pb-2 sm:pb-6 ml-4 sm:ml-0"}>
        <Slider
          {...slideSettings}
          className={classnames(cls.articles)}
          ref={refSlider}
          beforeChange={(_, next) => setActiveSlide(next)}
        >
          {articles.map((article) => (
            <ItemArcticle
              article={article}
              key={article._id}
              isArticle={router?.pathname === "/news-article" && true}
            />
          ))}
        </Slider>
        {arrowBanner}
      </div>
    </Fragment>
  );
}
