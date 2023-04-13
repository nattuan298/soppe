import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { RootState } from "src/store";
import { fetchBannerSliceLoopSelected } from "src/store/internal-selected-banner-slice-loop.action";
import { BannerSlideForm } from "src/modules/banner-slide";
import { GoBack } from "src/components";
import { routeSectionBannerSlideManagement } from "src/constants/routes";
import { getParams } from "src/store/router-params.slice";
import {
  createInternalBannerSectionLoopService,
  editInternalBannerSectionLoopService,
} from "src/services/internal-banner-slice.services";

interface ParamsType {
  id: string;
}

export default function SectionBannerSlideAddAndEditPage() {
  const dispatch = useDispatch();
  const { id } = useParams<ParamsType>();
  const history = useHistory();

  const page = sessionStorage.getItem("section-banner-slide");
  const url = useMemo(() => {
    if (!page) {
      return routeSectionBannerSlideManagement;
    }
    return `${routeSectionBannerSlideManagement}?page=${page}`;
  }, [page]);

  const { bannerSectionLoopData, loading } = useSelector(
    (state: RootState) => state.internalSelectedBannerSectionLoop,
  );

  useEffect(() => {
    if (id) {
      dispatch(getParams(id));
    }
  }, [id, dispatch]);

  const initBannerPage = useCallback(() => {
    if (id) {
      dispatch(fetchBannerSliceLoopSelected(id));
    }
  }, [dispatch, id]);

  const redirectPage = useCallback(() => {
    const page = sessionStorage.getItem("section-banner-slide");
    if (!page) {
      history.push(routeSectionBannerSlideManagement);
    }
    return history.push(`${routeSectionBannerSlideManagement}?page=${page}`);
  }, [history]);

  const editBannerService = useCallback(
    (banner) => editInternalBannerSectionLoopService(banner),
    [],
  );
  const createBannerService = useCallback(
    (body) => createInternalBannerSectionLoopService(body),
    [],
  );

  return (
    <div className="p-5">
      <GoBack url={url} />
      <BannerSlideForm
        loading={loading}
        bannerData={bannerSectionLoopData}
        initBannerPage={initBannerPage}
        redirectPage={redirectPage}
        editBannerService={editBannerService}
        createBannerService={createBannerService}
      />
    </div>
  );
}
