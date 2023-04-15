import { useMemo } from "react";

import { BannerLoopCreateForm } from "src/modules/banner";
import { GoBack } from "src/components";
import { routeManagementBannerLoopListBase } from "src/constants/routes";

export default function BannerLoopCreate() {
  const page = sessionStorage.getItem("banner-loop-page");
  const url = useMemo(() => {
    if (!page) {
      return routeManagementBannerLoopListBase;
    }
    return `/admin-dashboard/appearance-management/home-banner-management/banner-loop-list?page=${page}`;
  }, [page]);

  return (
    <div className="p-5">
      <GoBack url={url} />
      <BannerLoopCreateForm />
    </div>
  );
}
