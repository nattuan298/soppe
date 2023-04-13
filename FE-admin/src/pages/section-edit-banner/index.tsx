import { useMemo } from "react";
import { SectionBannerForm } from "src/modules/banner-slide";
import { GoBack } from "src/components";
import { RootState } from "src/store";
import { useSelector } from "react-redux";

export default function AddBannerList() {
  const { selectedBanner } = useSelector((state: RootState) => state.internalBanners);
  const id = useMemo(() => selectedBanner?.bannerLoop, [selectedBanner]);
  const url =
    id &&
    `/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list/${id}`;
  return (
    <div className="p-5">
      <GoBack url={url} />
      <SectionBannerForm isEditMode />
    </div>
  );
}
