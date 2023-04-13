import { useCallback, useEffect, useState } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { NavbarRolePermission } from "./navbar";
import { activateRole, deactivateRole, deleteRole } from "src/services/roles.services";
import { RootState } from "src/store";
import { GenericTable as Table } from "src/components/generic-table";
import { RoleAndPermissionTableHead } from "./table-head";
import { ParamListRequestModel } from "src/types/params-list-request.model";
import { ActionButton, Modal, StatusDropdown } from "src/components";
import "./styles.css";
import { RoleModel } from "src/types/role.model";
import { useTranslation } from "react-i18next";
import { getRoleAction } from "src/store/role.action";

export default function RoleAndPermissionList() {
  const { t } = useTranslation("common");
  const [params, setParams] = useState<ParamListRequestModel>();
  const [selectedRole, setSelectedRole] = useState<RoleModel>({
    permissions: [],
    _id: "",
    name: "",
    status: "",
    fullAccess: false,
    updatedAt: "",
  });

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"action" | "delete">("action");
  const [userStatus, setUserStatus] = useState("");
  const dispatch = useDispatch();
  const { roleData, loading } = useSelector((state: RootState) => state.roles);

  const getData = useCallback(() => {
    if (!params) {
      return;
    }
    const { page, pageSize, status, keyword } = params;
    if (page && pageSize) {
      dispatch(
        getRoleAction({
          page,
          pageSize,
          status,
          keyword,
          sortBy: "updatedAt-DESC",
        }),
      );
    }
  }, [dispatch, params]);
  useEffect(() => {
    getData();
  }, [getData]);

  const renderRow = useCallback((item) => {
    const { _id, name, totalUsers, fullAccess, permissions, createdAt, updatedAt, status } = item;
    function getNumberOfAccessibleFeature(full: boolean, numberOfFeature: number) {
      if (full) return "All Features";
      if (numberOfFeature) return numberOfFeature;
    }
    return (
      <TableRow>
        <TableCell align="left">{name}</TableCell>
        <TableCell align="center">{totalUsers}</TableCell>
        <TableCell align="center">
          {getNumberOfAccessibleFeature(fullAccess, permissions.length)}
        </TableCell>
        <TableCell align="left">
          <Box maxWidth={150}>{dayjs(createdAt).format("DD MMM YYYY HH:mm:ss")}</Box>
        </TableCell>
        <TableCell align="left">
          <Box maxWidth={150}>{dayjs(updatedAt).format("DD MMM YYYY HH:mm:ss")}</Box>
        </TableCell>
        <TableCell align="center">
          <div className="flex justify-center">
            <StatusDropdown
              data={item}
              statusOptions={["active", "inactive"]}
              defaultValue={status.toLowerCase()}
              onChange={handleChangeStatus}
              trans={t}
            />
          </div>
        </TableCell>
        <TableCell align="center">
          <div className="flex action-buttons-wrapper">
            <Link to={`/admin-dashboard/role-&-permission-management/edit-role/${_id}`}>
              <ActionButton action="edit" />
            </Link>
            <ActionButton action="delete" onClick={() => handlecDeleteAction(item)} />
          </div>
        </TableCell>
      </TableRow>
    );
  }, []);

  function handleChangeStatus(data: any, value: string) {
    setSelectedRole(data);
    setUserStatus(value);
    if (value !== data.status) {
      setIsOpenModal(true);
      setConfirmType("action");
    }
  }
  function handlecDeleteAction(data: RoleModel) {
    setIsOpenModal(true);
    setConfirmType("delete");
    setSelectedRole(data);
  }
  function handleCancelConfirm() {
    setIsOpenModal(false);
  }
  async function handleConfirm() {
    if (confirmType === "action") {
      if (userStatus === "active") {
        try {
          await activateRole(selectedRole._id);
          setIsOpenModal(false);
          handleUpdateTable();
        } catch (e) {
          //
        }
      }
      if (userStatus === "inactive") {
        try {
          await deactivateRole(selectedRole._id);
          setIsOpenModal(false);
          handleUpdateTable();
        } catch (e) {
          //
        }
      }
      setIsOpenModal(false);
    }
    if (confirmType === "delete") {
      try {
        await deleteRole(selectedRole._id);
        setIsOpenModal(false);
        handleUpdateTable();
      } catch (e) {
        //
      }
    }
  }
  function handleUpdateTable() {
    getData();
  }

  return (
    <div className="role-permission-list">
      <div className="role-permission-table">
        <Table
          FilterComponent={NavbarRolePermission}
          header={<RoleAndPermissionTableHead />}
          results={roleData.data}
          total={Math.ceil(roleData.total / roleData.limit)}
          renderRow={renderRow}
          setParams={setParams}
          loading={loading}
        />
      </div>

      <Modal
        open={isOpenModal}
        confirmType={confirmType}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
