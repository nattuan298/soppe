import { ProductUpdate } from "src/modules/product/components/product-update/product-update";
import { ProductForm } from "../../modules/product/components/product-create/product";
import { GoBack } from "../../components";
import { routeInventoryManagementProductListBase } from "../../constants/routes";

export default function InventoryManagementUpdateProduct() {
  return (
    <main className="w-full">
      <GoBack url={routeInventoryManagementProductListBase} />
      <ProductForm />
    </main>
  );
}
