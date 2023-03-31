import React from "react";
import cls from "./dummy-banner.module.css";
import DummyBannerIcon from "src/components/svgs/dummyBannerIcon";

export function DummyBanner() {
  return (
    <div
      className={`${cls.dummyBanner} w-screen sm:w-full h-full flex items-center justify-between`}
    >
      <div className="m-auto">
        <DummyBannerIcon />
      </div>
    </div>
  );
}
