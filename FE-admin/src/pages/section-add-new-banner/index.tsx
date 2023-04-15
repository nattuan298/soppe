import { SectionBannerForm } from "src/modules/banner-slide";
import { GoBack } from "src/components";
import { useParams } from "react-router-dom";

interface ParamsType {
  id: string;
}

export default function AddBannerList() {
  const { id } = useParams<ParamsType>();
  return (
    <div className="p-5">
      <GoBack
        url={`/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list/${id}`}
      />
      <SectionBannerForm />
    </div>
  );
}
