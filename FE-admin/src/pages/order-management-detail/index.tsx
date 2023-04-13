import { OrderDetail } from "src/modules/order-management";
import { GoBack } from "src/components";
import { routesOrderManagement } from "src/constants/routes";

export default function OrderManagementDetail() {
  return (
    <main className="p-5">
      <GoBack url={routesOrderManagement} />
      <OrderDetail />
    </main>
  );
}
