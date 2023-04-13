import { ChangeEvent, useEffect, useMemo, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  getBannerManagementFeaturePermission,
  getHomePageTemplateManagementFeaturePermission,
  getPlatformInformationPermission,
  getSectionBannerSlideManagementFeaturePermission,
  getSectionProductSlideManagementFeaturePersmission,
} from "src/store/permission.slice";
import { CollapsibleBodyRow, RoundedCheckbox } from "src/components";
import { PermissionChecked } from "./types";
import { PermissionModel } from "src/types/permission.model";
import { useStyles } from "./styles";
interface AppearanceManagementFeatureRowProps {
  defaultValue: {
    bannerFeatureAccess: string;
    bannerFeatureCreate: string;
    bannerFeatureUpdate: string;
    bannerFeatureDelete: string;
    sectionBannerSlideManagementFeatureAccess: string;
    sectionBannerSlideManagementFeatureCreate: string;
    sectionBannerSlideManagementFeatureUpdate: string;
    sectionBannerSlideManagementFeatureDelete: string;
    sectionProductSlideManagementFeatureAccess: string;
    sectionProductSlideManagementFeatureCreate: string;
    sectionProductSlideManagementFeatureUpdate: string;
    sectionProductSlideManagementFeatureDelete: string;
    homePageTemplateFeatureAccess: string;
    homePageTemplateFeatureCreate: string;
    homePageTemplateFeatureUpdate: string;
    homePageTemplateFeatureDelete: string;
    // platformInformationFeatureAccess: string;
    // platformInformationFeatureCreate: string;
    // platformInformationFeatureUpdate: string;
    // platformInformationFeatureDelete: string;
  };
  value: {
    bannerFeatureAccess: PermissionModel;
    bannerFeatureCreate: PermissionModel;
    bannerFeatureUpdate: PermissionModel;
    bannerFeatureDelete: PermissionModel;
    homePageTemplateFeatureAccess: PermissionModel;
    homePageTemplateFeatureCreate: PermissionModel;
    homePageTemplateFeatureUpdate: PermissionModel;
    homePageTemplateFeatureDelete: PermissionModel;
    sectionBannerSlideManagementFeatureAccess: PermissionModel;
    sectionBannerSlideManagementFeatureCreate: PermissionModel;
    sectionBannerSlideManagementFeatureUpdate: PermissionModel;
    sectionBannerSlideManagementFeatureDelete: PermissionModel;
    sectionProductSlideManagementFeatureAccess: PermissionModel;
    sectionProductSlideManagementFeatureCreate: PermissionModel;
    sectionProductSlideManagementFeatureUpdate: PermissionModel;
    sectionProductSlideManagementFeatureDelete: PermissionModel;
    // platformInformationFeatureAccess: PermissionModel;
    // platformInformationFeatureCreate: PermissionModel;
    // platformInformationFeatureUpdate: PermissionModel;
    // platformInformationFeatureDelete: PermissionModel;
  };
}

export default function AppearanceManagementFeatureRow({
  defaultValue,
  value,
}: AppearanceManagementFeatureRowProps) {
  const [appearancePermissionChecked, setAppearancePermissionChecked] = useState({
    access: false,
    create: false,
    update: false,
    delete: false,
  });
  const [bannerPermissionChecked, setBannerPermissionChecked] = useState({
    access: false,
    create: false,
    update: false,
    delete: false,
  });
  const [sectionBannerSlidePermissionChecked, setSectionBannerSlidePermissionChecked] = useState({
    access: false,
    create: false,
    update: false,
    delete: false,
  });
  const [sectionProductSlidePermissionChecked, setSectionProductSlidePermissionChecked] = useState({
    access: false,
    create: false,
    update: false,
    delete: false,
  });
  const [homePageTemplatePermissionChecked, setHomePageTemplatePermissionChecked] = useState({
    access: false,
    create: false,
    update: false,
    delete: false,
  });
  const [platformInfoPermissionChecked, setPlatformInfoPermissionChecked] = useState({
    access: false,
    create: false,
    update: false,
    delete: false,
  });
  const [bannerPermissions, setBannerPermissions] = useState({
    access: "",
    create: "",
    update: "",
    delete: "",
  });
  const [sectionBannerSlidePermissions, setSectionBannerSlidePermissions] = useState({
    access: "",
    create: "",
    update: "",
    delete: "",
  });
  const [sectionProductSlidePermissions, setSectionProductSlidePermissions] = useState({
    access: "",
    create: "",
    update: "",
    delete: "",
  });
  const [homePageTemplatePermissions, setHomePageTemplatePermissions] = useState({
    access: "",
    create: "",
    update: "",
    delete: "",
  });
  const [platformInfoPermissions, setPlatformInfoPermissions] = useState({
    access: "",
    create: "",
    update: "",
    delete: "",
  });

  const { row } = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const isFullAccess = useMemo(() => {
    if (
      bannerPermissionChecked.access &&
      sectionBannerSlidePermissionChecked.access &&
      sectionProductSlidePermissionChecked.access &&
      homePageTemplatePermissionChecked.access &&
      platformInfoPermissionChecked.access
    )
      return true;
    if (!isEmpty(value.bannerFeatureAccess) && !isEmpty(value.homePageTemplateFeatureAccess)) {
      return true;
    }
    return false;
  }, [
    bannerPermissionChecked.access,
    sectionBannerSlidePermissionChecked.access,
    sectionProductSlidePermissionChecked.access,
    homePageTemplatePermissionChecked.access,
    platformInfoPermissionChecked.access,
    value,
  ]);
  const isFullCreate = useMemo(() => {
    if (
      bannerPermissionChecked.create &&
      sectionBannerSlidePermissionChecked.create &&
      sectionProductSlidePermissionChecked.create &&
      homePageTemplatePermissionChecked.create &&
      platformInfoPermissionChecked.create
    )
      return true;
    if (!isEmpty(value.bannerFeatureCreate) && !isEmpty(value.homePageTemplateFeatureCreate)) {
      return true;
    }
    return false;
  }, [
    bannerPermissionChecked.create,
    homePageTemplatePermissionChecked.create,
    sectionBannerSlidePermissionChecked.create,
    sectionProductSlidePermissionChecked.create,
    platformInfoPermissionChecked.create,
    value,
  ]);
  const isFullUpdate = useMemo(() => {
    if (
      bannerPermissionChecked.update &&
      sectionBannerSlidePermissionChecked.update &&
      sectionProductSlidePermissionChecked.update &&
      homePageTemplatePermissionChecked.update &&
      platformInfoPermissionChecked.update
    )
      return true;
    if (!isEmpty(value.bannerFeatureUpdate) && !isEmpty(value.homePageTemplateFeatureUpdate)) {
      return true;
    }
    return false;
  }, [
    bannerPermissionChecked.update,
    sectionBannerSlidePermissionChecked.update,
    sectionProductSlidePermissionChecked.update,
    homePageTemplatePermissionChecked.update,
    platformInfoPermissionChecked.update,
    value,
  ]);
  const isFullDelete = useMemo(() => {
    if (
      bannerPermissionChecked.delete &&
      sectionBannerSlidePermissionChecked.delete &&
      sectionProductSlidePermissionChecked.delete &&
      homePageTemplatePermissionChecked.delete &&
      platformInfoPermissionChecked.delete
    )
      return true;
    if (!isEmpty(value.bannerFeatureDelete) && !isEmpty(value.homePageTemplateFeatureDelete)) {
      return true;
    }
    return false;
  }, [
    bannerPermissionChecked.delete,
    sectionBannerSlidePermissionChecked.delete,
    sectionProductSlidePermissionChecked.delete,
    homePageTemplatePermissionChecked.delete,
    platformInfoPermissionChecked.delete,
    value.bannerFeatureDelete,
    value.homePageTemplateFeatureDelete,
  ]);

  useEffect(() => {
    setBannerPermissionChecked({
      access: !isEmpty(value.bannerFeatureAccess),
      create: !isEmpty(value.bannerFeatureCreate),
      update: !isEmpty(value.bannerFeatureUpdate),
      delete: !isEmpty(value.bannerFeatureDelete),
    });
    setSectionBannerSlidePermissionChecked({
      access: !isEmpty(value.sectionBannerSlideManagementFeatureAccess),
      create: !isEmpty(value.sectionBannerSlideManagementFeatureCreate),
      update: !isEmpty(value.sectionBannerSlideManagementFeatureUpdate),
      delete: !isEmpty(value.sectionBannerSlideManagementFeatureDelete),
    });
    setSectionProductSlidePermissionChecked({
      access: !isEmpty(value.sectionProductSlideManagementFeatureAccess),
      create: !isEmpty(value.sectionProductSlideManagementFeatureCreate),
      update: !isEmpty(value.sectionProductSlideManagementFeatureUpdate),
      delete: !isEmpty(value.sectionProductSlideManagementFeatureDelete),
    });
    setHomePageTemplatePermissionChecked({
      access: !isEmpty(value.homePageTemplateFeatureAccess),
      create: !isEmpty(value.homePageTemplateFeatureCreate),
      update: !isEmpty(value.homePageTemplateFeatureUpdate),
      delete: !isEmpty(value.homePageTemplateFeatureDelete),
    });
    // setPlatformInfoPermissionChecked({
    //   access: !isEmpty(value.platformInformationFeatureAccess),
    //   create: !isEmpty(value.platformInformationFeatureCreate),
    //   update: !isEmpty(value.platformInformationFeatureUpdate),
    //   delete: !isEmpty(value.platformInformationFeatureDelete),
    // });
    setBannerPermissions({
      access: !isEmpty(value.bannerFeatureAccess) ? value.bannerFeatureAccess._id : "",
      create: !isEmpty(value.bannerFeatureCreate) ? value.bannerFeatureCreate._id : "",
      update: !isEmpty(value.bannerFeatureUpdate) ? value.bannerFeatureUpdate._id : "",
      delete: !isEmpty(value.bannerFeatureDelete) ? value.bannerFeatureDelete._id : "",
    });
    setSectionBannerSlidePermissions({
      access: !isEmpty(value.sectionBannerSlideManagementFeatureAccess)
        ? value.sectionBannerSlideManagementFeatureAccess._id
        : "",
      create: !isEmpty(value.sectionBannerSlideManagementFeatureCreate)
        ? value.sectionBannerSlideManagementFeatureCreate._id
        : "",
      update: !isEmpty(value.sectionBannerSlideManagementFeatureUpdate)
        ? value.sectionBannerSlideManagementFeatureUpdate._id
        : "",
      delete: !isEmpty(value.sectionBannerSlideManagementFeatureDelete)
        ? value.sectionBannerSlideManagementFeatureDelete._id
        : "",
    });
    setSectionProductSlidePermissions({
      access: !isEmpty(value.sectionProductSlideManagementFeatureAccess)
        ? value.sectionProductSlideManagementFeatureAccess._id
        : "",
      create: !isEmpty(value.sectionProductSlideManagementFeatureCreate)
        ? value.sectionProductSlideManagementFeatureCreate._id
        : "",
      update: !isEmpty(value.sectionProductSlideManagementFeatureUpdate)
        ? value.sectionProductSlideManagementFeatureUpdate._id
        : "",
      delete: !isEmpty(value.sectionProductSlideManagementFeatureDelete)
        ? value.sectionProductSlideManagementFeatureDelete._id
        : "",
    });
    setHomePageTemplatePermissions({
      access: !isEmpty(value.homePageTemplateFeatureAccess)
        ? value.homePageTemplateFeatureAccess._id
        : "",
      create: !isEmpty(value.homePageTemplateFeatureCreate)
        ? value.homePageTemplateFeatureCreate._id
        : "",
      update: !isEmpty(value.homePageTemplateFeatureUpdate)
        ? value.homePageTemplateFeatureUpdate._id
        : "",
      delete: !isEmpty(value.homePageTemplateFeatureDelete)
        ? value.homePageTemplateFeatureDelete._id
        : "",
    });
    // setPlatformInfoPermissions({
    //   access: !isEmpty(value.platformInformationFeatureAccess)
    //     ? value.platformInformationFeatureAccess._id
    //     : "",
    //   create: !isEmpty(value.platformInformationFeatureCreate)
    //     ? value.platformInformationFeatureCreate._id
    //     : "",
    //   update: !isEmpty(value.platformInformationFeatureUpdate)
    //     ? value.platformInformationFeatureUpdate._id
    //     : "",
    //   delete: !isEmpty(value.platformInformationFeatureDelete)
    //     ? value.platformInformationFeatureDelete._id
    //     : "",
    // });
  }, [
    value.bannerFeatureAccess,
    value.bannerFeatureCreate,
    value.bannerFeatureDelete,
    value.bannerFeatureUpdate,
    value.sectionBannerSlideManagementFeatureAccess,
    value.sectionBannerSlideManagementFeatureCreate,
    value.sectionBannerSlideManagementFeatureUpdate,
    value.sectionBannerSlideManagementFeatureDelete,
    value.sectionProductSlideManagementFeatureAccess,
    value.sectionProductSlideManagementFeatureCreate,
    value.sectionProductSlideManagementFeatureUpdate,
    value.sectionProductSlideManagementFeatureDelete,
    value.homePageTemplateFeatureAccess,
    value.homePageTemplateFeatureCreate,
    value.homePageTemplateFeatureDelete,
    value.homePageTemplateFeatureUpdate,
    // value.platformInformationFeatureAccess,
    // value.platformInformationFeatureCreate,
    // value.platformInformationFeatureDelete,
    // value.platformInformationFeatureUpdate,
  ]);

  useEffect(() => {
    setAppearancePermissionChecked({
      access: isFullAccess,
      create: isFullCreate,
      update: isFullUpdate,
      delete: isFullDelete,
    });
  }, [isFullAccess, isFullCreate, isFullUpdate, isFullDelete]);

  useEffect(() => {
    dispatch(getBannerManagementFeaturePermission(bannerPermissions));
    dispatch(getSectionBannerSlideManagementFeaturePermission(sectionBannerSlidePermissions));
    dispatch(getSectionProductSlideManagementFeaturePersmission(sectionProductSlidePermissions));
    dispatch(getHomePageTemplateManagementFeaturePermission(homePageTemplatePermissions));
    dispatch(getPlatformInformationPermission(platformInfoPermissions));
  }, [
    dispatch,
    bannerPermissions,
    sectionBannerSlidePermissions,
    sectionProductSlidePermissions,
    homePageTemplatePermissions,
    platformInfoPermissions,
  ]);

  function handleChangeFullAccessPermission(event: ChangeEvent<HTMLInputElement>) {
    setAppearancePermissionChecked({
      ...appearancePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setBannerPermissionChecked({
      ...bannerPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setSectionBannerSlidePermissionChecked({
      ...sectionBannerSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setSectionProductSlidePermissionChecked({
      ...sectionProductSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setHomePageTemplatePermissionChecked({
      ...homePageTemplatePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setPlatformInfoPermissionChecked({
      ...platformInfoPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setBannerPermissions({
        ...bannerPermissions,
        access: defaultValue.bannerFeatureAccess,
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        access: defaultValue.sectionBannerSlideManagementFeatureAccess,
      });
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        access: defaultValue.sectionProductSlideManagementFeatureAccess,
      });
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        access: defaultValue.homePageTemplateFeatureAccess,
      });
      // setPlatformInfoPermissions({
      //   ...platformInfoPermissions,
      //   access: defaultValue.platformInformationFeatureAccess,
      // });
    } else {
      setBannerPermissions({
        ...bannerPermissions,
        access: "",
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        access: "",
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        access: "",
      });
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        access: "",
      });
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        access: "",
      });
      // setPlatformInfoPermissions({
      //   ...platformInfoPermissions,
      //   access: "",
      // });
    }
  }
  function handleChangeFullCreatePermission(event: ChangeEvent<HTMLInputElement>) {
    setAppearancePermissionChecked({
      ...appearancePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setBannerPermissionChecked({
      ...bannerPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setSectionBannerSlidePermissionChecked({
      ...sectionBannerSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setSectionProductSlidePermissionChecked({
      ...sectionProductSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setHomePageTemplatePermissionChecked({
      ...homePageTemplatePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setPlatformInfoPermissionChecked({
      ...platformInfoPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setBannerPermissions({
        ...bannerPermissions,
        create: defaultValue.bannerFeatureCreate,
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        create: defaultValue.sectionBannerSlideManagementFeatureCreate,
      });
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        create: defaultValue.sectionProductSlideManagementFeatureCreate,
      });
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        create: defaultValue.homePageTemplateFeatureCreate,
      });
      // setPlatformInfoPermissions({
      //   ...platformInfoPermissions,
      //   create: defaultValue.platformInformationFeatureCreate,
      // });
    } else {
      setBannerPermissions({
        ...bannerPermissions,
        create: "",
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        create: "",
      });
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        create: "",
      });
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        create: "",
      });
      setPlatformInfoPermissions({
        ...platformInfoPermissions,
        create: "",
      });
    }
  }
  function handleChangeFullUpdatePermission(event: ChangeEvent<HTMLInputElement>) {
    setAppearancePermissionChecked({
      ...appearancePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setBannerPermissionChecked({
      ...bannerPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setSectionBannerSlidePermissionChecked({
      ...sectionBannerSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setSectionProductSlidePermissionChecked({
      ...sectionProductSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setHomePageTemplatePermissionChecked({
      ...homePageTemplatePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setPlatformInfoPermissionChecked({
      ...platformInfoPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setBannerPermissions({
        ...bannerPermissions,
        update: defaultValue.bannerFeatureUpdate,
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        update: defaultValue.sectionBannerSlideManagementFeatureUpdate,
      });
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        update: defaultValue.sectionProductSlideManagementFeatureUpdate,
      });
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        update: defaultValue.homePageTemplateFeatureUpdate,
      });
      // setPlatformInfoPermissions({
      //   ...platformInfoPermissions,
      //   update: defaultValue.platformInformationFeatureUpdate,
      // });
    } else {
      setBannerPermissions({
        ...bannerPermissions,
        update: "",
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        update: "",
      });
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        update: "",
      });
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        update: "",
      });
      setPlatformInfoPermissions({
        ...platformInfoPermissions,
        update: "",
      });
    }
  }
  function handleChangeFullDeletePermission(event: ChangeEvent<HTMLInputElement>) {
    setAppearancePermissionChecked({
      ...appearancePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setBannerPermissionChecked({
      ...bannerPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setSectionBannerSlidePermissionChecked({
      ...sectionBannerSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setSectionProductSlidePermissionChecked({
      ...sectionProductSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setHomePageTemplatePermissionChecked({
      ...homePageTemplatePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setPlatformInfoPermissionChecked({
      ...platformInfoPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setBannerPermissions({
        ...bannerPermissions,
        delete: defaultValue.bannerFeatureDelete,
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        delete: defaultValue.sectionBannerSlideManagementFeatureDelete,
      });
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        delete: defaultValue.sectionProductSlideManagementFeatureDelete,
      });
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        delete: defaultValue.homePageTemplateFeatureDelete,
      });
      // setPlatformInfoPermissions({
      //   ...platformInfoPermissions,
      //   delete: defaultValue.platformInformationFeatureDelete,
      // });
    } else {
      setBannerPermissions({
        ...bannerPermissions,
        delete: "",
      });
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        delete: "",
      });
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        delete: "",
      });
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        delete: "",
      });
      setPlatformInfoPermissions({
        ...platformInfoPermissions,
        delete: "",
      });
    }
  }
  function handleChangePermissionsBanner(event: ChangeEvent<HTMLInputElement>) {
    setBannerPermissionChecked({
      ...bannerPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setBannerPermissions({
        ...bannerPermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setBannerPermissions({
        ...bannerPermissions,
        [event.target.name]: "",
      });
    }
  }
  function handleChangePermissionsSectionBannerSlide(event: ChangeEvent<HTMLInputElement>) {
    setSectionBannerSlidePermissionChecked({
      ...sectionBannerSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setSectionBannerSlidePermissions({
        ...sectionBannerSlidePermissions,
        [event.target.name]: "",
      });
    }
  }
  function handleChangePermissionsProductBannerSlide(event: ChangeEvent<HTMLInputElement>) {
    setSectionProductSlidePermissionChecked({
      ...sectionProductSlidePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setSectionProductSlidePermissions({
        ...sectionProductSlidePermissions,
        [event.target.name]: "",
      });
    }
  }
  function handleChangePermissionsHomePageTemplate(event: ChangeEvent<HTMLInputElement>) {
    setHomePageTemplatePermissionChecked({
      ...homePageTemplatePermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setHomePageTemplatePermissions({
        ...homePageTemplatePermissions,
        [event.target.name]: "",
      });
    }
  }
  function handleChangePermissionsPlatformInfo(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.name);
    setPlatformInfoPermissionChecked({
      ...platformInfoPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setPlatformInfoPermissions({
        ...platformInfoPermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setPlatformInfoPermissions({
        ...platformInfoPermissions,
        [event.target.name]: "",
      });
    }
  }

  return (
    <>
      <CollapsibleBodyRow
        className={row}
        borderedPreview={false}
        subFeatures={
          <SubFeatures
            defaultValue={defaultValue}
            value={value}
            bannerPermissionChecked={bannerPermissionChecked}
            sectionBannerSlidePermissionChecked={sectionBannerSlidePermissionChecked}
            sectionProductSlidePermissionChecked={sectionProductSlidePermissionChecked}
            homePageTemplatePermissionChecked={homePageTemplatePermissionChecked}
            platformInfoPermissionChecked={platformInfoPermissionChecked}
            onChangeBannerPermission={handleChangePermissionsBanner}
            onChangeSectionBannerSlidePermission={handleChangePermissionsSectionBannerSlide}
            onChangeSectionProductSlidePermission={handleChangePermissionsProductBannerSlide}
            onChangeHomeTemplatePermission={handleChangePermissionsHomePageTemplate}
            onChangePlatformInfoPermission={handleChangePermissionsPlatformInfo}
          />
        }
        colSpan={7}
      >
        <TableCell>{t("appearance-management-feature")}</TableCell>
        <TableCell>
          <RoundedCheckbox
            checked={appearancePermissionChecked.access}
            name="access"
            onChange={handleChangeFullAccessPermission}
          />
        </TableCell>
        <TableCell />
        <TableCell>
          <RoundedCheckbox
            checked={appearancePermissionChecked.create}
            name="create"
            onChange={handleChangeFullCreatePermission}
          />
        </TableCell>
        <TableCell>
          <RoundedCheckbox
            checked={appearancePermissionChecked.update}
            name="update"
            onChange={handleChangeFullUpdatePermission}
          />
        </TableCell>
        <TableCell>
          <RoundedCheckbox
            checked={appearancePermissionChecked.delete}
            name="delete"
            onChange={handleChangeFullDeletePermission}
          />
        </TableCell>
      </CollapsibleBodyRow>
    </>
  );
}

interface SubFeaturesProps extends AppearanceManagementFeatureRowProps {
  bannerPermissionChecked: PermissionChecked;
  sectionBannerSlidePermissionChecked: PermissionChecked;
  sectionProductSlidePermissionChecked: PermissionChecked;
  homePageTemplatePermissionChecked: PermissionChecked;
  platformInfoPermissionChecked: PermissionChecked;
  onChangeSectionBannerSlidePermission: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeSectionProductSlidePermission: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeBannerPermission: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeHomeTemplatePermission: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangePlatformInfoPermission: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SubFeatures({
  bannerPermissionChecked,
  sectionBannerSlidePermissionChecked,
  sectionProductSlidePermissionChecked,
  homePageTemplatePermissionChecked,
  platformInfoPermissionChecked,
  onChangeBannerPermission,
  onChangeSectionBannerSlidePermission,
  onChangeSectionProductSlidePermission,
  onChangeHomeTemplatePermission,
  onChangePlatformInfoPermission,
  value,
  defaultValue,
}: SubFeaturesProps) {
  const { subFeature } = useStyles();
  const { t } = useTranslation("common");

  return (
    <>
      <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("banner-management-feature")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={bannerPermissionChecked.access}
            name="access"
            value={defaultValue?.bannerFeatureAccess}
            onChange={onChangeBannerPermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185}>
          <RoundedCheckbox
            checked={bannerPermissionChecked.create}
            name="create"
            value={defaultValue?.bannerFeatureCreate}
            onChange={onChangeBannerPermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={bannerPermissionChecked.update}
            name="update"
            value={defaultValue?.bannerFeatureUpdate}
            onChange={onChangeBannerPermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={bannerPermissionChecked.delete}
            name="delete"
            value={defaultValue?.bannerFeatureDelete}
            onChange={onChangeBannerPermission}
          />
        </TableCell>
      </CollapsibleBodyRow>
      <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("section-banner-slide-management-feature")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={sectionBannerSlidePermissionChecked.access}
            name="access"
            value={defaultValue?.sectionBannerSlideManagementFeatureAccess}
            onChange={onChangeSectionBannerSlidePermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185}>
          <RoundedCheckbox
            checked={sectionBannerSlidePermissionChecked.create}
            name="create"
            value={defaultValue?.sectionBannerSlideManagementFeatureCreate}
            onChange={onChangeSectionBannerSlidePermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={sectionBannerSlidePermissionChecked.update}
            name="update"
            value={defaultValue?.sectionBannerSlideManagementFeatureUpdate}
            onChange={onChangeSectionBannerSlidePermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={sectionBannerSlidePermissionChecked.delete}
            name="delete"
            value={defaultValue?.sectionBannerSlideManagementFeatureDelete}
            onChange={onChangeSectionBannerSlidePermission}
          />
        </TableCell>
      </CollapsibleBodyRow>
      <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("section-product-slide-management-feature")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={sectionProductSlidePermissionChecked.access}
            name="access"
            value={defaultValue?.sectionProductSlideManagementFeatureAccess}
            onChange={onChangeSectionProductSlidePermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185}>
          <RoundedCheckbox
            checked={sectionProductSlidePermissionChecked.create}
            name="create"
            value={defaultValue?.sectionProductSlideManagementFeatureCreate}
            onChange={onChangeSectionProductSlidePermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={sectionProductSlidePermissionChecked.update}
            name="update"
            value={defaultValue?.sectionProductSlideManagementFeatureUpdate}
            onChange={onChangeSectionProductSlidePermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={sectionProductSlidePermissionChecked.delete}
            name="delete"
            value={defaultValue?.sectionProductSlideManagementFeatureDelete}
            onChange={onChangeSectionProductSlidePermission}
          />
        </TableCell>
      </CollapsibleBodyRow>
      <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("home-page-template-management-feature")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={homePageTemplatePermissionChecked.access}
            name="access"
            value={defaultValue?.homePageTemplateFeatureAccess}
            onChange={onChangeHomeTemplatePermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185}>
          <RoundedCheckbox
            checked={homePageTemplatePermissionChecked.create}
            name="create"
            value={defaultValue?.homePageTemplateFeatureCreate}
            onChange={onChangeHomeTemplatePermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={homePageTemplatePermissionChecked.update}
            name="update"
            value={defaultValue?.homePageTemplateFeatureUpdate}
            onChange={onChangeHomeTemplatePermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={homePageTemplatePermissionChecked.delete}
            name="delete"
            value={defaultValue?.homePageTemplateFeatureDelete}
            onChange={onChangeHomeTemplatePermission}
          />
        </TableCell>
      </CollapsibleBodyRow>
      {/* <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("platform-information")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={platformInfoPermissionChecked.access}
            name="access"
            value={defaultValue?.platformInformationFeatureAccess}
            onChange={onChangePlatformInfoPermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185}>
          <RoundedCheckbox
            checked={platformInfoPermissionChecked.create}
            name="create"
            value={defaultValue?.platformInformationFeatureCreate}
            onChange={onChangePlatformInfoPermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={platformInfoPermissionChecked.update}
            name="update"
            value={defaultValue?.platformInformationFeatureUpdate}
            onChange={onChangePlatformInfoPermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={platformInfoPermissionChecked.delete}
            name="delete"
            value={defaultValue?.platformInformationFeatureDelete}
            onChange={onChangePlatformInfoPermission}
          />
        </TableCell>
      </CollapsibleBodyRow> */}
    </>
  );
}
