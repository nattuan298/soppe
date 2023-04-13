import { ChangeEvent, useEffect, useMemo, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  getDataExportHistory,
  getPlatformStatisticPermission,
  getUserAccessHistoryPermission,
  setInternalUserAccessHistory,
} from "src/store/permission.slice";
import { CollapsibleBodyRow, RoundedCheckbox } from "src/components";
import { PermissionChecked } from "./types";
import { PermissionModel } from "src/types/permission.model";
import { useStyles } from "./styles";

interface PlatformStatisticFeatureRowProps {
  defaultValue: {
    platformStatisticAccess: string;
    platformStatisticExport: string;
    userAccessHistoryAccess: string;
    userAccessHistoryExport: string;
    dataExportHistoryAccess: string;
    dataExportHistoryExport: string;
    internalUserAccessHistoryAccess: string;
    internalUserAccessHistoryExport: string;
  };
  value: {
    platformStatisticAccess: PermissionModel;
    platformStatisticExport: PermissionModel;
    userAccessHistoryAccess: PermissionModel;
    userAccessHistoryExport: PermissionModel;
    dataExportHistoryAccess: PermissionModel;
    dataExportHistoryExport: PermissionModel;
    internalUserAccessHistoryAccess: PermissionModel;
    internalUserAccessHistoryExport: PermissionModel;
  };
}

export default function PlatformStatisticFeatureRow({
  defaultValue,
  value,
}: PlatformStatisticFeatureRowProps) {
  const [fullPermissionChecked, setFullPermissionChecked] = useState({
    access: false,
    export: false,
  });
  const [platformStatisticPermissionChecked, setPlatformStatisticPermissionChecked] = useState({
    access: false,
    export: false,
  });
  const [userAccessHistoryPermissionChecked, setUserAccessHistoryPermissionChecked] = useState({
    access: false,
    export: false,
  });
  const [dataExportHistoryPermissionChecked, setDataExportHistoryPermissionChecked] = useState({
    access: false,
    export: false,
  });
  const [internalUserHistoryChecked, setInternalUserHistoryChecked] = useState({
    access: false,
    export: false,
  });

  const [platformStatisticPermissions, setPlatformStatisticPermissions] = useState({
    access: "",
    export: "",
  });
  const [userAccessHistoryPermissions, setUserAccessHistoryPermissions] = useState({
    access: "",
    export: "",
  });
  const [dataExportHistoryPermissions, setDataExportHistoryPermissions] = useState({
    access: "",
    export: "",
  });

  const [internalUserHistoryPermissions, setInternalUserHistoryPermissions] = useState({
    access: "",
    export: "",
  });

  const { row } = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const isFullAccess = useMemo(() => {
    if (
      platformStatisticPermissionChecked.access &&
      userAccessHistoryPermissionChecked.access &&
      dataExportHistoryPermissionChecked.access &&
      internalUserHistoryChecked.access
    )
      return true;
    if (
      !isEmpty(value.platformStatisticAccess) &&
      !isEmpty(value.userAccessHistoryAccess) &&
      !isEmpty(value.dataExportHistoryAccess) &&
      !isEmpty(value.internalUserAccessHistoryAccess)
    )
      return true;
    return false;
  }, [
    dataExportHistoryPermissionChecked.access,
    platformStatisticPermissionChecked.access,
    userAccessHistoryPermissionChecked.access,
    value.dataExportHistoryAccess,
    value.platformStatisticAccess,
    value.userAccessHistoryAccess,
    value.internalUserAccessHistoryAccess,
  ]);

  const isFullExport = useMemo(() => {
    if (
      platformStatisticPermissionChecked.export &&
      userAccessHistoryPermissionChecked.export &&
      dataExportHistoryPermissionChecked.export &&
      internalUserHistoryChecked.export
    )
      return true;
    if (
      !isEmpty(value.platformStatisticExport) &&
      !isEmpty(value.userAccessHistoryExport) &&
      !isEmpty(value.dataExportHistoryExport) &&
      !isEmpty(value.internalUserAccessHistoryExport)
    )
      return true;
    return false;
  }, [
    dataExportHistoryPermissionChecked.export,
    platformStatisticPermissionChecked.export,
    userAccessHistoryPermissionChecked.export,
    value.internalUserAccessHistoryExport,
    value.dataExportHistoryExport,
    value.platformStatisticExport,
    value.userAccessHistoryExport,
  ]);

  useEffect(() => {
    setPlatformStatisticPermissionChecked({
      access: !isEmpty(value.platformStatisticAccess),
      export: !isEmpty(value.platformStatisticExport),
    });
    setUserAccessHistoryPermissionChecked({
      access: !isEmpty(value.userAccessHistoryAccess),
      export: !isEmpty(value.userAccessHistoryExport),
    });
    setDataExportHistoryPermissionChecked({
      access: !isEmpty(value.dataExportHistoryAccess),
      export: !isEmpty(value.dataExportHistoryExport),
    });

    setInternalUserHistoryChecked({
      access: !isEmpty(value.internalUserAccessHistoryAccess),
      export: !isEmpty(value.internalUserAccessHistoryExport),
    });

    setPlatformStatisticPermissions({
      access: !isEmpty(value.platformStatisticAccess) ? value.platformStatisticAccess._id : "",
      export: !isEmpty(value.platformStatisticExport) ? value.platformStatisticExport._id : "",
    });
    setUserAccessHistoryPermissions({
      access: !isEmpty(value.userAccessHistoryAccess) ? value.userAccessHistoryAccess._id : "",
      export: !isEmpty(value.userAccessHistoryExport) ? value.userAccessHistoryExport._id : "",
    });
    setDataExportHistoryPermissions({
      access: !isEmpty(value.dataExportHistoryAccess) ? value.dataExportHistoryAccess._id : "",
      export: !isEmpty(value.dataExportHistoryExport) ? value.dataExportHistoryExport._id : "",
    });
    setInternalUserHistoryPermissions({
      access: !isEmpty(value.internalUserAccessHistoryAccess)
        ? value.internalUserAccessHistoryAccess._id
        : "",
      export: !isEmpty(value.internalUserAccessHistoryExport)
        ? value.internalUserAccessHistoryExport._id
        : "",
    });
  }, [
    value.dataExportHistoryAccess,
    value.dataExportHistoryExport,
    value.platformStatisticAccess,
    value.platformStatisticExport,
    value.userAccessHistoryAccess,
    value.userAccessHistoryExport,
    value.internalUserAccessHistoryAccess,
    value.internalUserAccessHistoryExport,
  ]);
  useEffect(() => {
    setFullPermissionChecked({
      access: isFullAccess,
      export: isFullExport,
    });
  }, [isFullAccess, isFullExport]);
  useEffect(() => {
    dispatch(getPlatformStatisticPermission(platformStatisticPermissions));
    dispatch(getUserAccessHistoryPermission(userAccessHistoryPermissions));
    dispatch(getDataExportHistory(dataExportHistoryPermissions));
    dispatch(setInternalUserAccessHistory(internalUserHistoryPermissions));
  }, [
    dataExportHistoryPermissions,
    dispatch,
    platformStatisticPermissions,
    userAccessHistoryPermissions,
    internalUserHistoryPermissions,
  ]);

  function handleChangeFullAccessPermission(event: ChangeEvent<HTMLInputElement>) {
    setFullPermissionChecked({
      ...fullPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setPlatformStatisticPermissionChecked({
      ...platformStatisticPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setUserAccessHistoryPermissionChecked({
      ...userAccessHistoryPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setDataExportHistoryPermissionChecked({
      ...dataExportHistoryPermissionChecked,
      [event.target.name]: event.target.checked,
    });

    setInternalUserHistoryChecked({
      ...internalUserHistoryChecked,
      [event.target.name]: event.target.checked,
    });

    if (event.target.checked) {
      setPlatformStatisticPermissions({
        ...platformStatisticPermissions,
        access: defaultValue.platformStatisticAccess,
      });
      setUserAccessHistoryPermissions({
        ...userAccessHistoryPermissions,
        access: defaultValue.userAccessHistoryAccess,
      });
      setDataExportHistoryPermissions({
        ...dataExportHistoryPermissions,
        access: defaultValue.dataExportHistoryAccess,
      });

      setInternalUserHistoryPermissions({
        ...internalUserHistoryPermissions,
        access: defaultValue.internalUserAccessHistoryAccess,
      });
    } else {
      setPlatformStatisticPermissions({
        ...platformStatisticPermissions,
        access: "",
      });
      setUserAccessHistoryPermissions({
        ...userAccessHistoryPermissions,
        access: "",
      });
      setDataExportHistoryPermissions({
        ...dataExportHistoryPermissions,
        access: "",
      });

      setInternalUserHistoryPermissions({
        ...internalUserHistoryPermissions,
        access: "",
      });
    }
  }
  function handleChangeFullExportPermission(event: ChangeEvent<HTMLInputElement>) {
    setFullPermissionChecked({
      ...fullPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setPlatformStatisticPermissionChecked({
      ...platformStatisticPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setUserAccessHistoryPermissionChecked({
      ...userAccessHistoryPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    setDataExportHistoryPermissionChecked({
      ...dataExportHistoryPermissionChecked,
      [event.target.name]: event.target.checked,
    });

    setInternalUserHistoryChecked({
      ...internalUserHistoryChecked,
      [event.target.name]: event.target.checked,
    });

    if (event.target.checked) {
      setPlatformStatisticPermissions({
        ...platformStatisticPermissions,
        export: defaultValue.platformStatisticExport,
      });
      setUserAccessHistoryPermissions({
        ...userAccessHistoryPermissions,
        export: defaultValue.userAccessHistoryExport,
      });
      setDataExportHistoryPermissions({
        ...dataExportHistoryPermissions,
        export: defaultValue.dataExportHistoryExport,
      });
      setInternalUserHistoryPermissions({
        ...internalUserHistoryPermissions,
        export: defaultValue.internalUserAccessHistoryExport,
      });
    } else {
      setPlatformStatisticPermissions({
        ...platformStatisticPermissions,
        export: "",
      });
      setUserAccessHistoryPermissions({
        ...userAccessHistoryPermissions,
        export: "",
      });
      setDataExportHistoryPermissions({
        ...dataExportHistoryPermissions,
        export: "",
      });
      setInternalUserHistoryPermissions({
        ...internalUserHistoryPermissions,
        export: "",
      });
    }
  }
  function handleChangePlatformStatisticPermission(event: ChangeEvent<HTMLInputElement>) {
    setPlatformStatisticPermissionChecked({
      ...platformStatisticPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setPlatformStatisticPermissions({
        ...platformStatisticPermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setPlatformStatisticPermissions({
        ...platformStatisticPermissions,
        [event.target.name]: "",
      });
    }
  }
  function handleChangeUserAccessHistoryPermission(event: ChangeEvent<HTMLInputElement>) {
    setUserAccessHistoryPermissionChecked({
      ...userAccessHistoryPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setUserAccessHistoryPermissions({
        ...userAccessHistoryPermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setUserAccessHistoryPermissions({
        ...userAccessHistoryPermissions,
        [event.target.name]: "",
      });
    }
  }
  function handleDataExportHistoryPermission(event: ChangeEvent<HTMLInputElement>) {
    setDataExportHistoryPermissionChecked({
      ...dataExportHistoryPermissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setDataExportHistoryPermissions({
        ...dataExportHistoryPermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setDataExportHistoryPermissions({
        ...dataExportHistoryPermissions,
        [event.target.name]: "",
      });
    }
  }

  function handleInternalUserAccessHistoryPermission(event: ChangeEvent<HTMLInputElement>) {
    setInternalUserHistoryChecked({
      ...internalUserHistoryChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setInternalUserHistoryPermissions({
        ...internalUserHistoryPermissions,
        [event.target.name]: event.target.value,
      });
    } else {
      setInternalUserHistoryPermissions({
        ...internalUserHistoryPermissions,
        [event.target.name]: "",
      });
    }
  }

  return (
    <CollapsibleBodyRow
      className={row}
      borderedPreview={false}
      subFeatures={
        <SubFeatures
          defaultValue={defaultValue}
          value={value}
          platformStatisticPermissionChecked={platformStatisticPermissionChecked}
          userAccessHistoryPermissionChecked={userAccessHistoryPermissionChecked}
          dataExportHistoryPermissionChecked={dataExportHistoryPermissionChecked}
          internalUserHistoryChecked={internalUserHistoryChecked}
          onChangePlatformStatisticPermission={handleChangePlatformStatisticPermission}
          onChangeUserAccessHistoryPermission={handleChangeUserAccessHistoryPermission}
          onChangeDataExportHistoryPermission={handleDataExportHistoryPermission}
          onChangeInternalUserAccessHistoryPermission={handleInternalUserAccessHistoryPermission}
        />
      }
      colSpan={7}
    >
      <TableCell>{t("platform-statistic-feature")}</TableCell>
      <TableCell>
        <RoundedCheckbox
          checked={fullPermissionChecked.access}
          name="access"
          onChange={handleChangeFullAccessPermission}
        />
      </TableCell>
      <TableCell>
        <RoundedCheckbox
          checked={fullPermissionChecked.export}
          name="export"
          onChange={handleChangeFullExportPermission}
        />
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </CollapsibleBodyRow>
  );
}

interface SubFeaturesProps extends PlatformStatisticFeatureRowProps {
  platformStatisticPermissionChecked: PermissionChecked;
  userAccessHistoryPermissionChecked: PermissionChecked;
  dataExportHistoryPermissionChecked: PermissionChecked;
  internalUserHistoryChecked: PermissionChecked;
  onChangePlatformStatisticPermission: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeUserAccessHistoryPermission: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeDataExportHistoryPermission: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeInternalUserAccessHistoryPermission: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SubFeatures({
  defaultValue,
  value,
  platformStatisticPermissionChecked,
  userAccessHistoryPermissionChecked,
  dataExportHistoryPermissionChecked,
  internalUserHistoryChecked,
  onChangePlatformStatisticPermission,
  onChangeUserAccessHistoryPermission,
  onChangeDataExportHistoryPermission,
  onChangeInternalUserAccessHistoryPermission,
}: SubFeaturesProps) {
  const { subFeature } = useStyles();
  const { t } = useTranslation("common");

  return (
    <>
      <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("platform-statistic")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={platformStatisticPermissionChecked.access}
            name="access"
            value={defaultValue.platformStatisticAccess}
            onChange={onChangePlatformStatisticPermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={platformStatisticPermissionChecked.export}
            name="export"
            value={defaultValue.platformStatisticExport}
            onChange={onChangePlatformStatisticPermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185} />
        <TableCell width={185} />
      </CollapsibleBodyRow>
      <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("user-access-history")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={userAccessHistoryPermissionChecked.access}
            name="access"
            value={defaultValue.userAccessHistoryAccess}
            onChange={onChangeUserAccessHistoryPermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={userAccessHistoryPermissionChecked.export}
            name="export"
            value={defaultValue.userAccessHistoryExport}
            onChange={onChangeUserAccessHistoryPermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185} />
        <TableCell width={185} />
      </CollapsibleBodyRow>
      <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("internal-user-access-history")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={internalUserHistoryChecked.access}
            name="access"
            value={defaultValue.internalUserAccessHistoryAccess}
            onChange={onChangeInternalUserAccessHistoryPermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={internalUserHistoryChecked.export}
            name="export"
            value={defaultValue.internalUserAccessHistoryExport}
            onChange={onChangeInternalUserAccessHistoryPermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185} />
        <TableCell width={185} />
      </CollapsibleBodyRow>
      <CollapsibleBodyRow className={subFeature} collapsible={false} borderedPreview={false}>
        <TableCell width={780}>{t("data-export-history")}</TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={dataExportHistoryPermissionChecked.access}
            name="access"
            value={defaultValue.dataExportHistoryAccess}
            onChange={onChangeDataExportHistoryPermission}
          />
        </TableCell>
        <TableCell width={185}>
          <RoundedCheckbox
            checked={dataExportHistoryPermissionChecked.export}
            name="export"
            value={defaultValue.dataExportHistoryExport}
            onChange={onChangeDataExportHistoryPermission}
          />
        </TableCell>
        <TableCell width={185} />
        <TableCell width={185} />
        <TableCell width={185} />
      </CollapsibleBodyRow>
    </>
  );
}
