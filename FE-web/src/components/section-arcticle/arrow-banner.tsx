import { Fragment } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Slider from "react-slick";

import cls from "./articles.module.css";

interface RefObject<T> {
  readonly current: T | null;
}

interface PropsTypes {
  activeSlide: number;
  length: number;
  refSlider: RefObject<Slider>;
}

export default function ArrowBanner({ activeSlide, length, refSlider }: PropsTypes) {
  const handleClickLeft = () => {
    refSlider.current?.slickPrev();
  };

  const handleClickRight = () => {
    refSlider.current?.slickNext();
  };
  return (
    <Fragment>
      {activeSlide > 0 && (
        <div className="h-1/4 items-center absolute left-0 top-1/4 hidden sm:flex">
          <div className={`${cls.arrowBg} pb-4`}>
            <ChevronLeftIcon className="text-5xl cursor-pointer" onClick={handleClickLeft} />
          </div>
        </div>
      )}

      <div
        className={`hidden sm:${
          activeSlide + 4 < length ? "block" : "hidden"
        } h-1/4 flex items-center absolute right-0 top-1/4`}
      >
        <div className={`${cls.arrowBg} pb-4`}>
          <ChevronRightIcon className="text-5xl cursor-pointer" onClick={handleClickRight} />
        </div>
      </div>
    </Fragment>
  );
}
