// import { useMemo } from "react";
import ProductSkeleton from "./product-skeleton";
import cls from "./skeleton.module.css";

export function ProductsSkeleton() {
  // const countSkeleton = useMemo(() => {
  //   const innerWidth = window.innerWidth;
  //   if (innerWidth <= 1250) {
  //     return 3;
  //   }
  //   return 4;
  // }, []);

  return (
    <div className={cls.skeleton_sections}>
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </div>
  );
}
