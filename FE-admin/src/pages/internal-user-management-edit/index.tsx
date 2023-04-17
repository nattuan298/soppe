import { InternalUserForm } from "src/modules/internal-user-managment";
import { GoBack } from "src/components";
import { routesUserManagement } from "../../constants/routes";


export default function InternalUserManagementEdit() {
  return (
    <main className="p-5">
      <GoBack url={routesUserManagement} />
      <InternalUserForm mode="edit" />
    </main>
  );
}
