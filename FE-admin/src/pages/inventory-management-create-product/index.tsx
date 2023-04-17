import { GoBack } from "../../components";
import { routeInventoryManagementProductListBase } from "../../constants/routes";
import { ProductForm } from "../../modules/product/components/product-create/product";

export default function InventoryManagementUpdateProduct() {
  return (
    <main className="p-5">
      <GoBack url={routeInventoryManagementProductListBase} />
      <ProductForm/>
    </main>
  );
}
