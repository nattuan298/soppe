import { InternalUserForm } from "src/modules/internal-user-managment";
import { GoBack } from "src/components";
import { routesUserManagement } from "src/constants/routes";

export default function InternalUserManagementCreate() {
  return (
    <main className="p-5">
      <GoBack url={routesUserManagement} />
      <InternalUserForm mode="create" />
    </main>
  );
}
