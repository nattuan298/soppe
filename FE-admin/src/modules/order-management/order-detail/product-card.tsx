import { CSSProperties, useMemo } from "react";
import useImageVideoFromUrl from "src/lib/useImageVideoFromUrl";
import "./styles.css";

interface ProductCardProps {
  image: string;
  name: string;
  type?: string;
}

export default function ProductCard({ image, name, type }: ProductCardProps) {
  const imageVideo = useImageVideoFromUrl(image, type);
  const styleImage = useMemo(() => {
    const defaultStyle = {
      width: 75,
      height: 75,
      marginRight: 10,
      objectFit: "cover",
    };
    // if (type === "VIDEO") {
    //   return {
    //     ...defaultStyle,
    //     objectFit: "contain",
    //   };
    // }
    return defaultStyle;
  }, [type]) as CSSProperties;
  return (
    <div className="flex">
      <img style={styleImage} src={imageVideo} alt="product" />
      <p className="text-black text-base">{name}</p>
    </div>
  );
}
