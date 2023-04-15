import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Image from "src/components/image";
import NewCollectionIcon from "src/components/svgs/new_collection";
import { defaultImages } from "src/constants/app";
import { Media } from "types/api-response-type";
import useLoggedIn from "src/hooks/useLoggedIn";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "../../components/svgs/share";
import { BackIcon } from "../../components";
import { useRouter } from "next/router";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
const settings = {
  dots: false,
  infinite: false,
  speed: 100,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

interface RefObject<T> {
  readonly current: T | null;
}

interface ImagesSliderType {
  isNewProduct?: boolean;
  images: string[];
  isFavourite?: boolean;
  addToFavorite?: () => void;
  removeFavorite?: () => void;
  handleShare?: () => void;
}

export default function ImagesSlider({
  isNewProduct,
  images,
  isFavourite,
  addToFavorite,
  removeFavorite,
  handleShare,
}: ImagesSliderType) {
  const [activeSlide, setActiveSlide] = useState(0);
  const { isLoggedIn } = useLoggedIn();
  const router = useRouter();
  const screen = useGetScreenWidth();
  const refSlider = useRef() as RefObject<Slider>;
  const refSlider2 = useRef() as RefObject<Slider>;
  const [nav, setNav] = useState<{
    nav1: Slider | undefined;
    nav2: Slider | undefined;
  }>({
    nav1: undefined,
    nav2: undefined,
  });

  useEffect(() => {
    setActiveSlide(0);
    refSlider.current?.slickGoTo(0);
  }, [images]);

  useEffect(() => {
    setNav({
      nav1: refSlider.current ? refSlider.current : undefined,
      nav2: refSlider2.current ? refSlider2.current : undefined,
    });
  }, [refSlider, refSlider2]);

  const handleClickLeft = () => {
    refSlider.current?.slickPrev();
    refSlider2.current?.slickPrev();
  };

  const handleClickRight = () => {
    refSlider.current?.slickNext();
    refSlider2.current?.slickNext();
  };

  const handleClick = (i: number) => () => {
    refSlider.current?.slickGoTo(i);
  };

  const newimages = images.length === 0 ? defaultImages : images;
  const handleBack = () => {
    router.back();
  };
  return (
    <div>
      <div className="relative mb-1">
        <Slider
          {...settings}
          ref={refSlider}
          asNavFor={newimages.length > 5 ? nav.nav2 : undefined}
          beforeChange={(_, next) => setActiveSlide(next)}
        >
          {newimages.map((item, i) => {
            return (
              <div key={i} className="p-1">
                <Image
                  src={item}
                  className="w-full"
                  isControl
                  fileType={"image"}
                />
              </div>
            );
          })}
        </Slider>

        {activeSlide !== 0 && (
          <ChevronLeftIcon
            className="text-orange absolute top-1/2 left-5 cursor-pointer hidden sm:block"
            onClick={handleClickLeft}
          />
        )}

        {activeSlide !== newimages.length - 1 && (
          <ChevronRightIcon
            className="text-orange absolute top-1/2 right-5 cursor-pointer hidden sm:block"
            onClick={handleClickRight}
          />
        )}
        <div
          onClick={handleBack}
          className="absolute top-5 left-5 h-[30px] w-[30px] bg-white rounded-1/2 flex justify-center items-center sm:hidden shadow-icon"
        >
          <BackIcon />
        </div>
        {isNewProduct && screen === "Desktop" && (
          <NewCollectionIcon className="absolute top-5 sm:top-0 left-14 sm:left-5 w-[15px] h-[19px] sm:h-9 sm:w-8" />
        )}
        {isNewProduct && screen === "Mobile" && (
          <NewCollectionIcon className="absolute top-[1.5rem] left-14 h-[22px] w-[30px] flex justify-center items-center" />
        )}
        {isLoggedIn && !isFavourite && (
          <span
            className="absolute top-5 right-14 h-[30px] w-[30px] bg-white rounded-1/2 flex justify-center items-center sm:hidden shadow-icon"
            onClick={addToFavorite}
          >
            <FavoriteBorderIcon className="h-[15px] w-[13.76px] cursor-pointer  text-orange" />
          </span>
        )}
        {isLoggedIn && isFavourite && (
          <span
            className="absolute top-5 right-14 h-[30px] w-[30px] bg-white rounded-1/2 flex justify-center items-center sm:hidden shadow-icon"
            onClick={removeFavorite}
          >
            <FavoriteIcon className="h-[15px] w-[13.76px] cursor-pointer  text-orange" />
          </span>
        )}
        <div
          onClick={handleShare}
          className="absolute top-5 right-5 h-[30px] w-[30px] bg-white rounded-1/2 flex justify-center items-center sm:hidden shadow-icon"
        >
          <ShareIcon className="h-[15px] w-[13.76px] cursor-pointer" />
        </div>
      </div>
      {newimages.length <= 5 && (
        <div className="flex items-center">
          {images.map((item, i) => {
            return (
              <div key={i} className="rounded cursor-pointer mr-2" onClick={handleClick(i)}>
                <Image
                  src={item}
                  style={{ width: 60 }}
                  className={`${activeSlide === i ? "border border-solid border-orange" : ""}`}
                  fileType={"image"}
                  showIconVideo
                />
              </div>
            );
          })}
        </div>
      )}
      {newimages.length > 5 && (
        <Slider
          {...settings}
          slidesToShow={5}
          swipeToSlide
          ref={refSlider2}
          focusOnSelect
          asNavFor={nav.nav1}
        >
          {newimages.map((item, i) => {
            return (
              <div key={i} className="rounded cursor-pointer mr-2">
                <Image
                  src={item}
                  style={{ width: 60 }}
                  className={`${activeSlide === i ? "border border-solid border-orange" : ""}`}
                  fileType={"IMAGE"}
                  showIconVideo
                />
              </div>
            );
          })}
        </Slider>
      )}
    </div>
  );
}
