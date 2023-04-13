import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { BannerSectionList } from "src/modules/banner-slide";
import { Button, GoBack } from "src/components";
import { clearSelectBanner } from "src/store/internal-banners.slice";
import { routeSectionBannerSlideManagement } from "src/constants/routes";

interface ParamsType {
  id: string;
}

export default function BannerManagementList() {
  const { t } = useTranslation("common");
  const { id } = useParams<ParamsType>();

  const dispatch = useDispatch();
  const history = useHistory();

  const page = sessionStorage.getItem("section-banner-slide");
  const url = useMemo(() => {
    if (!page) {
      return routeSectionBannerSlideManagement;
    }
    return `${routeSectionBannerSlideManagement}?page=${page}`;
  }, [page]);

  const handleCreateNewBanner = () => {
    dispatch(clearSelectBanner());
    history.push(
      `/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list/add-new-banner/${id}`,
    );
  };

  return (
    <Fragment>
      <div className="pt-5 px-5">
        <GoBack className="flex justify-between" url={url}>
          <Button
            variant="text"
            className="bg-orange-light text-white w-72 h-12 hover:bg-orange-hover"
            onClick={handleCreateNewBanner}
          >
            {t`add-new-banner`}
          </Button>
        </GoBack>
      </div>
      <BannerSectionList />
    </Fragment>
  );
}
