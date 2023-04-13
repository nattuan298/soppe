import { RoleAndPermissionForm } from "src/modules/role-and-permission";
import { GoBack } from "src/components";
import { routesRoleAndPermissionManagement } from "src/constants/routes";

export default function RoleAndPermissionManagementCreate() {
  return (
    <main className="p-5">
      <GoBack url={routesRoleAndPermissionManagement} />
      <RoleAndPermissionForm mode="create" />
    </main>
  );
}
