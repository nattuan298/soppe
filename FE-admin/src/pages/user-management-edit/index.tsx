import { UserForm } from "src/modules/user-managment";
import { GoBack } from "src/components";
import { routesUserManagement } from "src/constants/routes";

export default function UserManagementEdit() {
  return (
    <main className="p-5">
      <GoBack url={routesUserManagement} />
      <UserForm />
    </main>
  );
}
