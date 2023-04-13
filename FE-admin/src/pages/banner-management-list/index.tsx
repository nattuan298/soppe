import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { BannerList } from "src/modules/banner";
import { Button, GoBack } from "src/components";
import { clearSelectBanner } from "src/store/internal-banners.slice";
import { routeManagementBannerLoopListBase } from "src/constants/routes";

interface ParamsType {
  id: string;
}

export default function BannerManagementList() {
  const { t } = useTranslation("common");
  const { id } = useParams<ParamsType>();

  const dispatch = useDispatch();
  const history = useHistory();

  const page = sessionStorage.getItem("banner-loop-page");
  const url = useMemo(() => {
    if (!page) {
      return routeManagementBannerLoopListBase;
    }
    return `/admin-dashboard/appearance-management/home-banner-management/banner-loop-list?page=${page}`;
  }, [page]);

  const handleCreateNewBanner = () => {
    dispatch(clearSelectBanner());
    history.push(
      `/admin-dashboard/appearance-management/home-banner-management/banner-loop-list/banner-list/add-new-banner/${id}`,
    );
  };

  return (
    <Fragment>
      <div className="w-97/100 m-auto">
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
      <BannerList />
    </Fragment>
  );
}
