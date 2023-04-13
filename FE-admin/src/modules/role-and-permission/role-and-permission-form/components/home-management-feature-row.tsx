import { ChangeEvent, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { getHomeFeaturePermissions } from "src/store/permission.slice";
import { CollapsibleBodyRow, RoundedCheckbox } from "src/components";
import { PermissionModel } from "src/types/permission.model";
import { useStyles } from "./styles";

interface HomeManagementFeatureRowProps {
  defaultValue?: {
    accessFeature: string;
    exportFeature: string;
  };
  value: {
    accessFeature: PermissionModel;
    exportFeature: PermissionModel;
  };
}

export default function HomeManagementFeatureRow({
  defaultValue,
  value,
}: HomeManagementFeatureRowProps) {
  const [permissionChecked, setPermissionChecked] = useState({
    access: false,
    export: false,
  });
  const [permission, setPermission] = useState({
    access: "",
    export: "",
  });
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    setPermissionChecked({
      access: !isEmpty(value.accessFeature),
      export: !isEmpty(value.exportFeature),
    });

    setPermission({
      access: !isEmpty(value.accessFeature) ? value.accessFeature._id : "",
      export: !isEmpty(value.exportFeature) ? value.exportFeature._id : "",
    });
  }, [value.accessFeature, value.exportFeature]);
  useEffect(() => {
    dispatch(getHomeFeaturePermissions(permission));
  }, [dispatch, permission]);

  function handleChangePermissions(event: ChangeEvent<HTMLInputElement>) {
    setPermissionChecked({
      ...permissionChecked,
      [event.target.name]: event.target.checked,
    });
    if (event.target.checked) {
      setPermission({
        ...permission,
        [event.target.name]: event.target.value,
      });
    } else {
      setPermission({
        ...permission,
        [event.target.name]: "",
      });
    }
  }

  const { row } = useStyles();
  return (
    <CollapsibleBodyRow className={row} collapsible={false} borderedPreview={false}>
      <TableCell>{t("home-feature")}</TableCell>
      <TableCell>
        <RoundedCheckbox
          checked={permissionChecked.access}
          name="access"
          value={defaultValue?.accessFeature}
          onChange={handleChangePermissions}
        />
      </TableCell>
      <TableCell>
        <RoundedCheckbox
          checked={permissionChecked.export}
          name="export"
          value={defaultValue?.exportFeature}
          onChange={handleChangePermissions}
        />
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell />
    </CollapsibleBodyRow>
  );
}
