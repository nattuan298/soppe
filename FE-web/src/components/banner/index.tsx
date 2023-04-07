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

  if (Array.isArray(banners) && banners.length === 0) {
    return null;
  }

  const getClassName = () => {
    if (height === 400 && screenWidth > 640) {
      return "h-[400px]";
    } else if (height === 484 && screenWidth > 640) {
      return "h-[484px]";
    } else if (height === 164 && screenWidth < 640) {
      return "h-[164px]";
    }
    return "";
  };

  return (
    <div className="main-banner mb-[15px] sm:mb-0">
      <img src={banners.url} alt={""} className={classNames(cls.d_block, cls.w_100, getClassName())} />
    </div>
  );
}

export const BannerNoSSR = dynamic(() => Promise.resolve(Banner), {
  ssr: false,
});
