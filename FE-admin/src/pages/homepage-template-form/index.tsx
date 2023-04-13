import { useMemo } from "react";

import { TemplateHomeForm } from "src/modules/template-home";
import { GoBack } from "src/components";
import { routeHomePageTemplateManagement } from "src/constants/routes";

export default function TemplateHomeFormPage() {
  const page = sessionStorage.getItem("banner-loop-page");
  const url = useMemo(() => {
    if (!page) {
      return routeHomePageTemplateManagement;
    }
    return `${routeHomePageTemplateManagement}?page=${page}`;
  }, [page]);

  return (
    <div className="p-5">
      <GoBack url={url} />
      <TemplateHomeForm />
    </div>
  );
}
