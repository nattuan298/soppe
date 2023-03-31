import { Image } from "@react-pdf/renderer";
import { SourceObject } from "@react-pdf/types";
import { useMemo } from "react";
import useImageVideoFromUrl from "src/hooks/useImageVideoFromUrl";
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
  }, [imageVideo]) as SourceObject;
  if (type === "VIDEO") {
    <Image style={styles.productImage} src={imageVideo} />;
  }
  return (
    <Image style={image ? styles.productImage : styles.productImageError} source={sourceImage} />
  );
}
