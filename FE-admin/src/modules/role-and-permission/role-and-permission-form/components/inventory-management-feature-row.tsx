import { ChangeEvent, useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import { isEmpty } from "lodash";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { getInventoryFeaturePermissions } from "src/store/permission.slice";
import { CollapsibleBodyRow, RoundedCheckbox } from "src/components";
import { PermissionModel } from "src/types/permission.model";
import { useStyles } from "./styles";

interface InventoryManagementFeatureRowProps {
  defaultValue: {
    accessFeature: string;
    updateFeature: string;
  };
  value: {
    accessFeature: PermissionModel;
    updateFeature: PermissionModel;
  };
}

export default function InventoryManagementFeatureRow({
  defaultValue,
  value,
}: InventoryManagementFeatureRowProps) {
  const [permissionChecked, setPermissionChecked] = useState({
    access: false,
    update: false,
  });
  const [permission, setPermission] = useState({
    access: "",
    update: "",
  });
  const dispatch = useDispatch();
  const { row } = useStyles();
  const { t } = useTranslation("common");

  useEffect(() => {
    setPermissionChecked({
      access: !isEmpty(value.accessFeature),
      update: !isEmpty(value.updateFeature),
    });
    setPermission({
      access: !isEmpty(value.accessFeature) ? value.accessFeature._id : "",
      update: !isEmpty(value.updateFeature) ? value.updateFeature._id : "",
    });
  }, [value.accessFeature, value.updateFeature]);
  useEffect(() => {
    dispatch(getInventoryFeaturePermissions(permission));
  }, [dispatch, permission]);

  function handleChangePermission(event: ChangeEvent<HTMLInputElement>) {
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
      <TableCell>{t("inventory-management-feature")}</TableCell>
      <TableCell>
        <RoundedCheckbox
          checked={permissionChecked.access}
          value={defaultValue?.accessFeature}
          name="access"
          onChange={handleChangePermission}
        />
      </TableCell>
      <TableCell />
      <TableCell />
      <TableCell>
        <RoundedCheckbox
          checked={permissionChecked.update}
          value={defaultValue?.updateFeature}
          name="update"
          onChange={handleChangePermission}
        />
      </TableCell>
      <TableCell />
    </CollapsibleBodyRow>
  );
}
