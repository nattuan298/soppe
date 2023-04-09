import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import IconPlay from "../svgs/iconPlay";
import VideoImage from "./videoInmage";

export interface ImageType {
  src?: string;
  className?: string;
  classNameImage?: string;
  isControl?: boolean;
  fileType?: string;
  showIconVideo?: boolean;
  sizeIcon?: {
    width?: string;
    height?: string;
  };
}

export default function Image({
  className,
  classNameImage,
  src,
  isControl,
  fileType,
  showIconVideo,
  sizeIcon,
  ...props
}: ImageType & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    if (ref.current) {
      const width = ref.current.clientWidth;
      if (width) {
        ref.current.style.height = `${width}px`;
      }
    }
  }, []);

  const isVideo = fileType?.toLowerCase().includes("video");

  const onError = () => {
    setIsError(true);
  };

  if (!src && isError) {
    return (
      <div
        ref={ref}
        className={`rounded overflow-hidden flex justify-center items-center bg-lighterGray ${className}`}
        {...props}
      >
        <img
          src={"/assets/images/dummy-image.png"}
          className={`w-auto max-w-full h-full ${classNameImage}`}
          alt="ecm"
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`rounded overflow-hidden flex justify-center items-center relative ${className}`}
      {...props}
    >
      {!isVideo && (
        <img
          src={src}
          className={`w-auto h-auto max-w-full max-h-full ${classNameImage}`}
          alt="ecm"
          onError={onError}
        />
      )}
      {isVideo && (
        <>
          {isControl && (
            <video
              src={`${src}#t=0.001`}
              controls={isControl}
              className={`w-auto h-auto max-w-full max-h-full ${classNameImage}`}
              playsInline
            />
          )}


          {showIconVideo && (
            <IconPlay
              className="absolute top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4"
              width={sizeIcon?.width}
              height={sizeIcon?.height}
            />
          )}
        </>
      )}
    </div>
  );
}
