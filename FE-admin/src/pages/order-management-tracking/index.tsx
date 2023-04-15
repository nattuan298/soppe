import { OrderTracking } from "src/modules/order-management";
import { GoBack } from "src/components";
import { routesOrderManagement } from "src/constants/routes";

export default function OrderManagementEdit() {
  return (
    <main className="p-5">
      <GoBack url={routesOrderManagement} />
      <OrderTracking />
    </main>
  );
}
