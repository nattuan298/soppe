import Image from "next/image";
import styles from "./common.module.css";
export function ImageDelivery() {
  return (
    <div className={`${styles.image_delivery} absolute sm:right-0`}>
      <Image
        className="min-w-[980px] min-h-[630px]"
        src="/assets/images/image_delivery.svg"
        alt="image delivery"
        width={980}
        height={630}
      />
    </div>
  );
}
