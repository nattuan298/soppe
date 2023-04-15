import { useMemo } from "react";
import { Image } from "@react-pdf/renderer";
import { SourceObject } from "@react-pdf/types";
import useImageVideoFromUrl from "src/lib/useImageVideoFromUrl";
import { styles } from "./styles";

interface PDFImageProps {
  image: string;
  type?: string;
}

export default function PDFImageProduct({ image, type }: PDFImageProps) {
  const imageVideo = useImageVideoFromUrl(image, type);
  const sourceImage = useMemo(() => {
    return {
      uri: imageVideo,
      method: "GET",
      headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      body: null,
    };
  }, [type, imageVideo]) as SourceObject;
  if (type === "VIDEO") {
    <Image style={styles.productVideo} src={imageVideo} />;
  }
  return <Image style={styles.productImage} source={sourceImage} />;
}
