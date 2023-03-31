import useTranslation from "next-translate/useTranslation";
import { OrderProductDetailType } from "types/orders";
import NoDataIcon from "../../svgs/no-data";
import Header from "./header";
import RowCart from "./rowCart";

interface ShoppingCartType {
  products: OrderProductDetailType[];
  disabledClickProduct?: boolean;
}

export default function ShoppingCart({ products, disabledClickProduct }: ShoppingCartType) {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="hidden sm:block">
        <Header />
      </div>
      {products.map((item) => {
        return (
          <RowCart
            product={item}
            key={item.productCode}
            disabledClickProduct={disabledClickProduct}
          />
        );
      })}
      {products.length === 0 && (
        <div className="mt-12 mb-5 flex flex-col justify-center items-center">
          <div>
            <NoDataIcon />
          </div>
          <span className="mt-4">{t`no_data`}</span>
        </div>
      )}
    </>
  );
}
