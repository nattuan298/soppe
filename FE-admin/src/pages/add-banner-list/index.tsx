import { AddBannerForm } from "src/modules/banner";
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
        url={`/admin-dashboard/appearance-management/home-banner-management/banner-loop-list/banner-list/${id}`}
      />
      <AddBannerForm />
    </div>
  );
}
