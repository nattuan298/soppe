import React from "react";
import useImageVideoFromUrl from "src/hooks/useImageVideoFromUrl";

export interface ImageType {
  src: string;
  className?: string;
}

export default function VideoImage({ className, src }: ImageType) {
  const imageVideo = useImageVideoFromUrl(src, "VIDEO");

  return <img className={className} src={imageVideo} alt="product" />;
}
