import { GoBack } from "src/components";
import { routesHomeDashboard } from "src/constants/routes";
import { Profile } from "src/modules/profile";

export default function ProfilePage() {
  return (
    <main className="p-5">
      <GoBack url={routesHomeDashboard} />
      <Profile />
    </main>
  );
}
