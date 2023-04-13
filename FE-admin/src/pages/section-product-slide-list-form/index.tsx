import { useMemo } from "react";

import { ProductSlideForm } from "src/modules/product-slide";
import { GoBack } from "src/components";
import { routeSectionProductSlideList } from "src/constants/routes";

export default function SectionProductSlideListForm() {
  const page = sessionStorage.getItem("product-slide-list");
  const url = useMemo(() => {
    if (!page) {
      return routeSectionProductSlideList;
    }
    return `${routeSectionProductSlideList}?page=${page}`;
  }, [page]);

  return (
    <div className="p-5">
      <GoBack url={url} />
      <ProductSlideForm />
    </div>
  );
}
