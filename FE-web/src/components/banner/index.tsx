import React from "react";
import dynamic from "next/dynamic";
import { get } from "lodash";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cls from "./banner.module.css";
import Link from "next/link";
import classNames from "classnames";
import { BannersType } from "types/api-response-type";
import { useScreenWidth } from "src/hooks/useScreenWidth";
import { DummyBanner } from "src/components/dummy-banner";

const slideSettingsDefault = {
  // adaptiveHeight: true,
  dots: true,
  autoplay: true,
  infinite: true,
  speed: 850,
  autoplaySpeed: 4000,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export type BannerProps = {
  banners: {
    desktopBanner: string;
    tabletBanner: string;
    mobileBanner: string;
    hyperlink: string;
    position: number;
  };
};

export function Banner({ banners, height }: { banners: BannersType; height: 400 | 484 | 164 }) {
  const { screenWidth } = useScreenWidth();

  const autoplaySpeed: number = React.useMemo(() => {
    if (banners.length === 0) {
      return 4000;
    }
    const [banner] = banners;
    return banner.duration * 1000;
  }, [banners]);

  const slideSettings = { ...slideSettingsDefault, autoplaySpeed };

  if (Array.isArray(banners) && banners.length === 0) {
    return null;
  }

  const getClassName = () => {
    if (height === 400 && screenWidth > 640) {
      return "height-400";
    } else if (height === 484 && screenWidth > 640) {
      return "height-484";
    } else if (height === 164 && screenWidth < 640) {
      return "height-164";
    }
    return "";
  };

  return (
    <div className="main-banner mb-[15px] sm:mb-0">
      <Slider {...slideSettings} className={getClassName()}>
        {Array.isArray(banners) &&
          banners.map((item, key) => {
            const image = () => {
              let src = item.desktopBanner;
              if (screenWidth < 640) {
                src = item.mobileBanner;
              } else if (screenWidth < 1280) {
                src = item.tabletBanner;
              } else {
                src = item.desktopBanner;
              }
              return (
                <>
                  {src ? (
                    <img src={src} alt={""} className={classNames(cls.d_block, cls.w_100)} />
                  ) : (
                    <div className="dummy">
                      <DummyBanner />
                    </div>
                  )}
                </>
              );
            };
            if (item.hyperlink) {
              return (
                <Link as={String(item.hyperlink)} href={String(item.hyperlink)} key={key} shallow>
                  <a target={get(item, "banner.url") ? "_blank" : ""}>
                    <div className="main-banner__slider-item">{image()}</div>
                  </a>
                </Link>
              );
            }
            return (
              <div className="main-banner__slider-item outline-none" key={key}>
                {image()}
              </div>
            );
          })}
      </Slider>
    </div>
  );
}

export const BannerNoSSR = dynamic(() => Promise.resolve(Banner), {
  ssr: false,
});
