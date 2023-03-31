import { useEffect, useState } from "react";

export default function useGetScreenWidth() {
  const [width, setWidth] = useState<string>("Desktop");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // console.log(window);
      // if (window.innerWidth < 768) {
      //   setWidth("mobile");
      // } else if (window.innerWidth > 768) {
      //   setWidth("Desktop");
      // }
      const handleAddAnimate = () => {
        if (window.innerWidth < 640) {
          setWidth("Mobile");
        } else if (window.innerWidth > 768) {
          setWidth("Desktop");
        }
      };
      handleAddAnimate();
      window.addEventListener("resize", handleAddAnimate);
      return () => {
        window.removeEventListener("resize", handleAddAnimate);
      };
    }
  }, []);
  return width;
}
