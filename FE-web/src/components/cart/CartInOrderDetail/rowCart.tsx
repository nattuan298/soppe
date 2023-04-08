import { Divider, FormHelperText } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { makeUrlObjectFromRouteBase, routeProductDetailBase } from "src/constants/routes";
import { useLocationBase } from "src/hooks";
import { OrderProductDetailType } from "types/orders";
import Image from "../../image";
import NumberInputWithIcon from "../../input/number-with-icon";
import NumberFormatCustome from "../../text/number-format";
import { ProductTypeWithQty } from "../../../feature/shopping-cart/type";

interface ShoppingCartType {
  product: ProductTypeWithQty & { hasChangeprice?: boolean; hasChangePV?: boolean };
  disabledClickProduct?: boolean;
}

export default function RowCart({ product, disabledClickProduct }: ShoppingCartType) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { symbol, locationBase } = useLocationBase();

  const handleClickName = () => {
    router.push(
      makeUrlObjectFromRouteBase(routeProductDetailBase, { id: product.productCode, locationBase }),
    );
  };
  console.log(product);
  return (
    <div>
      <div className="grid grid-cols-10 mt-2 sm:mt-4 items-center min-h-[85px] mb-2">
        <div className="grid grid-cols-12 col-span-10 gap-[10px] items-center">
          <div className="col-span-3 sm:col-span-6 mb-2.5 flex items-center">
            <div className="flex sm:pl-3 items-center justify-center">
              <Image
                src={product.mediaUrl}
                className="mr-4 w-[75px] min-h-[75px]"
                fileType={"IMAGE"}
              />
              <div className="hidden sm:block">
                {disabledClickProduct ? (
                  <span>{product.productName}</span>
                ) : (
                  <span className={"cursor-pointer hover:underline"} onClick={handleClickName}>
                    {product.productName}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-8 sm:col-span-2 sm:text-center">
            <div className="block sm:hidden mb-[5px]">
              <span>{product.productName}</span>
            </div>
            <div className="max-w-[125px]">
              <NumberInputWithIcon value={product.qty} disabled stillShowColorTextInput />
            </div>
            <div className="flex justify-between items-center mt-[5px]">
              <div className="block sm:hidden  text-orange">
                <NumberFormatCustome value={product.price} prefix={symbol} />
              </div>
            </div>
          </div>
          <div className="hidden sm:flex justify-center col-span-4  text-center text-orange">
            <NumberFormatCustome value={product.price} prefix={symbol} />
          </div>

        </div>
      </div>

      <div className="pl-3 flex">
        {product?.hasChangeprice && (
          <FormHelperText error className="mr-2">{t`price_changed`}</FormHelperText>
        )}
        {product?.hasChangePV && (
          <FormHelperText error className="mr-2">{t`pv_changed`}</FormHelperText>
        )}
      </div>
      <div>
        <Divider />
      </div>
    </div>
  );
}
