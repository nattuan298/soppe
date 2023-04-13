import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { RootState } from "src/store";
import { TemplateHomeList } from "src/modules/template-home";
import { fetchHomeTemplateList } from "src/store/template-home.action";
import { routeCreateNewTemplateHomePage } from "src/constants/routes";
import {
  deleteTemplateHomeService,
  editTemplateHomeService,
} from "src/services/templatehome.services";
import { TempateHomeBodyModel } from "src/types/home-template.model";

export default function TemplateHomeManagement() {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const { hometemplates, loading } = useSelector((state: RootState) => state.internalHometemplate);

  const initTemplateHomeList = useCallback(
    ({ page, pageSize, startDate, endDate, keyword, countryCode }) => {
      sessionStorage.setItem("template-homepage-slide", `${page}`);
      dispatch(
        fetchHomeTemplateList({
          page,
          pageSize,
          startDate,
          endDate,
          keyword,
          countryCode,
        }),
      );
    },
    [dispatch],
  );

  const deleteTemplateService = useCallback((id: string) => deleteTemplateHomeService(id), []);

  const editTemplateService = useCallback(
    (editModel: TempateHomeBodyModel) => editTemplateHomeService(editModel),
    [],
  );

  const editLinkBanner =
    "/admin-dashboard/appearance-management/home-page-template-management/template-list/edit-template";

  return (
    <main className="w-full">
      <TemplateHomeList
        editService={editTemplateService}
        getDataPage={initTemplateHomeList}
        internalBannerData={hometemplates}
        deleteBannerService={deleteTemplateService}
        loading={loading}
        addBannerLink={routeCreateNewTemplateHomePage}
        addBannerTitle={t`create-new-template`}
        editLinkBanner={editLinkBanner}
      />
    </main>
  );
}
