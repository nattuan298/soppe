import { Divider } from "@material-ui/core";
import { useState } from "react";
import Avatar from "src/components/avatar";
import Image from "src/components/image";
import Stars from "src/components/stars";
import { ReviewProductType } from "types/api-response-type";
import { LightBox } from "react-lightbox-pack";
import "react-lightbox-pack/dist/index.css";

interface OneReviewType {
  review: ReviewProductType;
}

export default function OneReview({ review }: OneReviewType) {
  const [toggle, setToggle] = useState(false);
  const [sIndex, setSIndex] = useState(0);

  const handleClickImage = (state: boolean, sIndex: number) => {
    setToggle(state);
    setSIndex(sIndex);
  };
  return (
    <div className="mt-4">
      <div className="flex">
        <div className="w-10">
          <Avatar className="w-10 h-10" name={review.memberName} src={review.memberAvatar} />
        </div>
        <div className="flex-grow ml-2 mt-2">
          <div>
            <p className="font-medium">{review.memberName}</p>
            <div>
              <Stars numberOfStars={review.rating} />
            </div>
            <span>{review.detail}</span>
          </div>
          <div className="hidden sm:flex mt-4">
            {review.photos.map((item, i) => {
              return (
                <Image
                  key={i}
                  src={item}
                  className="mr-2 sm:mr-4 cursor-pointer max-w-[95px] max-h-[95px]"
                  onClick={() => handleClickImage(true, i)}
                />
              );
            })}
          </div>
          <div className="flex sm:hidden mt-4">
            {review.photos.map((item, i) => {
              if (i < 2) {
                return (
                  <Image
                    key={i}
                    src={item}
                    className="mr-2 sm:mr-4 cursor-pointer max-w-[95px] max-h-[95px]"
                    onClick={() => handleClickImage(true, i)}
                  />
                );
              } else if (i === 3) {
                return (
                  <div className="relative mr-2 sm:mr-4" onClick={() => handleClickImage(true, i)}>
                    <Image
                      key={i}
                      src={item}
                      className=" cursor-pointer max-w-[95px]  max-h-[95px]"
                    />
                    <div className="absolute bottom-0 w-full h-full flex items-center justify-center bg-blur text-white">
                      +{review.photos.length - 3}
                    </div>
                  </div>
                );
              }
              return "";
            })}
          </div>
        </div>
      </div>
      <LightBox
        state={toggle}
        event={handleClickImage}
        data={review.photos.map((url) => ({
          image: url,
        }))}
        imageWidth="60vw"
        imageHeight="70vh"
        thumbnailHeight={50}
        thumbnailWidth={50}
        setImageIndex={setSIndex}
        imageIndex={sIndex}
      />
      <Divider className="mt-6" />
    </div>
  );
}
