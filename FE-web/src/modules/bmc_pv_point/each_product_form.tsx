import Image from "src/components/image";
import NumberWithIcon from "src/components/input/number-with-icon";
import NumberFormatCustome from "src/components/text/number-format";
import { OrderProductDetailType } from "types/orders";

export default function EachProductForm({
  product,
  quantity,
  handleChangeQty,
}: {
  product: OrderProductDetailType;
  quantity: number;
  handleChangeQty: (e: number) => void;
}) {
  // const handleClickName = () => {
  //   router.push(makeUrlObjectFromRouteBase(routeProductDetailBase, { id: product.productCode }));
  // };

  return (
    <div className="grid grid-cols-4 gap-[10px] sm:gap-8">
      <div className="col-span-1 sm:col-span-2 flex">
        <Image
          src={product.productImage}
          className="sm:mr-4 w-[75px] min-h-[75px]"
          fileType={product.fileType}
        />
        <div style={{ width: "calc(100% - 75px)" }} className="hidden sm:block pl-4">
          <span className="line-clamp-2">{product.productName}</span>
        </div>
      </div>

      <div className="col-span-3 sm:col-span-2 grid grid-w grid-cols-5 items-center">
        <div className="col-span-5 block sm:hidden pl-4">
          <span className="line-clamp-2">{product.productName}</span>
        </div>
        <div className="col-span-3 flex justify-center">
          <div className="sm:w-3/4">
            <NumberWithIcon
              inputClassName="w-full"
              value={quantity}
              max={product.timesTransferLeft}
              showMaxValue
              onChange={handleChangeQty}
              widthInput
            />
          </div>
        </div>
        <div className="col-span-2 text-brown text-right">
          <NumberFormatCustome
            value={product.pv * quantity}
            suffix=" / "
            className="text-sm sm:text-base"
          />
          <NumberFormatCustome
            value={product.pv * product.timesTransferLeft}
            className="text-s sm:text-xs"
          />
          {" PV"}
        </div>
      </div>
    </div>
  );
}
