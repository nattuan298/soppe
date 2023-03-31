import useTranslation from "next-translate/useTranslation";
import { ProductTypeWithQty } from "src/feature/shopping-cart/type";
import NoDataIcon from "../svgs/no-data";
import Header from "./header";
import RowCart from "./rowCart";

interface ShoppingCartType {
  noSelect?: boolean;
  products: ProductTypeWithQty[];
  productsError?: ProductTypeWithQty[];
  onClickDelete?: (id: string) => void;
  handleChangeQty?: (e: { qty: number; id: string }) => void;
  handleChangeSelected?: (e: string[]) => void;
  selected?: string[];
  showPublicPrice?: boolean;
}

export default function ShoppingCart({
  noSelect,
  products,
  onClickDelete,
  handleChangeQty,
  handleChangeSelected,
  selected = [],
  showPublicPrice,
  productsError,
}: ShoppingCartType) {
  const { t } = useTranslation("common");

  const handleSelctRow = (id: string, checked: boolean) => {
    if (checked) {
      handleChangeSelected?.([...selected, id]);
    } else {
      handleChangeSelected?.(selected.filter((item) => item !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      handleChangeSelected?.(
        products.filter((item) => item.status === "Active").map((item) => item.productCode),
      );
    } else {
      handleChangeSelected?.([]);
    }
  };

  const onChange = (id: string) => (qty: number) => {
    handleChangeQty?.({ qty, id });
  };

  return (
    <>
      <Header
        noSelect={noSelect}
        totalProduct={products.length}
        numberSelected={selected.length}
        handleSelect={handleSelectAll}
      />

      {products.map((item) => {
        const isSelected = selected.includes(item.productCode);
        return (
          <RowCart
            product={item}
            key={item.productCode}
            noSelect={noSelect}
            onClickDelete={onClickDelete}
            isSelected={isSelected}
            onClickSelect={handleSelctRow}
            onChange={onChange(item.productCode)}
            showPublicPrice={showPublicPrice}
          />
        );
      })}
      {productsError?.map((item) => {
        const isSelected = selected.includes(item.productCode);
        return (
          <RowCart
            product={item}
            key={item.productCode}
            noSelect={noSelect}
            onClickDelete={onClickDelete}
            isSelected={isSelected}
            onClickSelect={handleSelctRow}
            onChange={onChange(item.productCode)}
            showPublicPrice={showPublicPrice}
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
