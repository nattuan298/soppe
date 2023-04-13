import { ChangeEvent, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { getHelpCenterManagementFeaturePermission } from "src/store/permission.slice";
import { CollapsibleBodyRow, RoundedCheckbox } from "src/components";
import { PermissionModel } from "src/types/permission.model";
import { useStyles } from "./styles";

interface HelpCenterManagementFeatureRowProps {
  defaultValue?: {
    accessFeature: string;
    createFeature: string;
    updateFeature: string;
    deleteFeature: string;
  };
  value: {
    accessFeature: PermissionModel;
    createFeature: PermissionModel;
    updateFeature: PermissionModel;
    deleteFeature: PermissionModel;
  };
}

export default function HelpCenterManagementFeatureRow({
  defaultValue,
  value,
}: HelpCenterManagementFeatureRowProps) {
  const { t } = useTranslation("common");

  const [permissionChecked, setPermissionChecked] = useState({
    access: false,
    create: false,
    update: false,
    delete: false,
  });
  const [permission, setPermission] = useState({
    access: "",
    create: "",
    update: "",
    delete: "",
  });
  const dispatch = useDispatch();
  const { row } = useStyles();

  useEffect(() => {
    setPermissionChecked({
      access: !isEmpty(value.accessFeature),
      create: !isEmpty(value.createFeature),
      update: !isEmpty(value.updateFeature),
      delete: !isEmpty(value.deleteFeature),
    });
    setPermission({
      access: !isEmpty(value.accessFeature) ? value.accessFeature._id : "",
      create: !isEmpty(value.createFeature) ? value.createFeature._id : "",
      update: !isEmpty(value.updateFeature) ? value.updateFeature._id : "",
      delete: !isEmpty(value.deleteFeature) ? value.deleteFeature._id : "",
    });
  }, [value.accessFeature, value.createFeature, value.updateFeature, value.deleteFeature]);
  useEffect(() => {
    dispatch(getHelpCenterManagementFeaturePermission(permission));
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

  return (
    <CollapsibleBodyRow className={row} collapsible={false} borderedPreview={false}>
      <TableCell>{t("help-center-management-feature")}</TableCell>
      <TableCell>
        <RoundedCheckbox
          checked={permissionChecked.access}
          name="access"
          value={defaultValue?.accessFeature}
          onChange={handleChangePermissions}
        />
      </TableCell>
      <TableCell />
      <TableCell>
        <RoundedCheckbox
          checked={permissionChecked.create}
          name="create"
          value={defaultValue?.createFeature}
          onChange={handleChangePermissions}
        />
      </TableCell>
      <TableCell>
        <RoundedCheckbox
          checked={permissionChecked.update}
          name="update"
          value={defaultValue?.updateFeature}
          onChange={handleChangePermissions}
        />
      </TableCell>
      <TableCell>
        <RoundedCheckbox
          checked={permissionChecked.delete}
          name="delete"
          value={defaultValue?.deleteFeature}
          onChange={handleChangePermissions}
        />
      </TableCell>
    </CollapsibleBodyRow>
  );
}
