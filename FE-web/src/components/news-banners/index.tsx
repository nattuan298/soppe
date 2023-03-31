import { NewsArticleModel } from "types/api-response-type";
import Slider from "react-slick";
import Link from "next/link";

import NewsBannerItem from "./news-banner-item";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

interface PropTypes {
  articles: Array<NewsArticleModel>;
}
const slideSettings = {
  dots: true,
  autoplay: true,
  infinite: true,
  speed: 1000,
  autoplaySpeed: 4000,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export function NewsActiclesBanner({ articles }: PropTypes) {
  const screen = useGetScreenWidth();
  if (Array.isArray(articles) && articles.length === 0) {
    return null;
  }

  const getLinkURL = (_id: string) => {
    return `/news-article/${_id}`;
  };

  return (
    <div className="main-banner">
      <Slider {...slideSettings} className={"h-[375px] sm:h-auto"}>
        {Array.isArray(articles) &&
          articles.map((item) => {
            const { _id } = item;
            const linkUrl = getLinkURL(_id);
            return (
              <Link as={linkUrl} href={linkUrl} key={_id} shallow>
                <a target={""}>
                  <NewsBannerItem
                    key={item._id}
                    acticle={item}
                    height={screen === "Mobile" ? 375 : undefined}
                  />
                </a>
              </Link>
            );
          })}
      </Slider>
    </div>
  );
}
