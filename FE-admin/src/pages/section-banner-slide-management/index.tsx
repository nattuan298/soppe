import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "src/store";
import { BannerList } from "src/modules/banner-slide";
import { fetchBannerSliceList } from "src/store/internal-banner-slice.action";
import { routeSectionAddBannerSlide } from "src/constants/routes";
import {
  deleteInternalBannerSectionLoopService,
  editInternalBannerSectionLoopService,
} from "src/services/internal-banner-slice.services";

export default function LoopListBannerManagement() {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const { internalBannerSliceData, loading } = useSelector(
    (state: RootState) => state.internalBannersSlice,
  );

  const initBannerList = useCallback(
    ({ page, pageSize, startDate, endDate, status, keyword, sortBy }) => {
      sessionStorage.setItem("section-banner-slide", `${page}`);
      dispatch(
        fetchBannerSliceList({
          page,
          pageSize,
          startDate,
          endDate,
          status,
          keyword,
          sortBy,
        }),
      );
    },
    [dispatch],
  );

  const editBannerService = useCallback(
    (selectedBanner) => editInternalBannerSectionLoopService(selectedBanner),
    [],
  );
  const deleteBannerService = useCallback(
    (id: string) => deleteInternalBannerSectionLoopService(id),
    [],
  );

  const editLinkBanner =
    "/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/edit-banner-slide";
  const manageLinkBanner =
    "/admin-dashboard/appearance-management/section-banner-slide-management/slide-list/banner-list";

  return (
    <main className="w-full">
      <BannerList
        getDataPage={initBannerList}
        internalBannerData={internalBannerSliceData}
        editBannerService={editBannerService}
        deleteBannerService={deleteBannerService}
        loading={loading}
        addBannerLink={routeSectionAddBannerSlide}
        addBannerTitle={t`create-new-banner-slide`}
        editLinkBanner={editLinkBanner}
        manageLinkBanner={manageLinkBanner}
      />
    </main>
  );
}
