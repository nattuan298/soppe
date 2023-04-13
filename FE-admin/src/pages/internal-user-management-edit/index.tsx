import { InternalUserForm } from "src/modules/internal-user-managment";
import { GoBack } from "src/components";
import { routesInternalUserManagement } from "src/constants/routes";

export default function InternalUserManagementEdit() {
  return (
    <main className="p-5">
      <GoBack url={routesInternalUserManagement} />
      <InternalUserForm mode="edit" />
    </main>
  );
}
