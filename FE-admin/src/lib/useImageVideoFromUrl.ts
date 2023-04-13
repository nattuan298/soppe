import { useEffect, useState } from "react";
import dummyImg from "src/assets/img/dummy-img.png";

const useImageVideoFromUrl = (videoUrl: string, type?: string) => {
  const [imageUrl, setImageUrl] = useState(dummyImg);
  useEffect(() => {
    const fetchImage = async () => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      video.addEventListener(
        "loadeddata",
        function () {
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;

          context?.drawImage(video, 0, 0, canvas.width, canvas.height);
          video.pause();
          const dataURI = canvas.toDataURL("image/jpeg");
          setImageUrl(dataURI);
        },
        false,
      );

      video.preload = "metadata";
      video.muted = true;
      video.playsInline = true;
      video.setAttribute("crossOrigin", "anonymous");
      video.src = videoUrl;
      video.play();
    };
    if (type && type.toLocaleUpperCase() === "VIDEO") {
      fetchImage();
    } else if (videoUrl !== "") {
      setImageUrl(videoUrl);
    }
  }, [videoUrl, type]);
  return imageUrl;
};

export default useImageVideoFromUrl;
