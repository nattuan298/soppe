import Image from "src/components/image";
import NumberWithIcon from "src/components/input/number-with-icon";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { Divider, IconButton } from "@material-ui/core";
import NumberFormatCustome from "src/components/text/number-format";
import { ProductTypeWithQty } from "src/feature/shopping-cart/type";
import useLoggedIn from "src/hooks/useLoggedIn";
import { getThumbimageFromMedia } from "src/utils/product";
import { useRouter } from "next/router";
import { makeUrlObjectFromRouteBase, routeProductDetailBase } from "src/constants/routes";
import { useLocationBase } from "src/hooks";
import { useState } from "react";
import { ModalConfirm } from "src/components";

interface RowType {
  handleRemoveItem?: () => void;
  product: ProductTypeWithQty;
  onChange: (qty: number) => void;
}

export default function Row({ handleRemoveItem, product, onChange }: RowType) {
  const disabled = product.status !== "Active";
  const { isLoggedIn, priceFieldName } = useLoggedIn();
  const router = useRouter();
  const { symbol, locationBase } = useLocationBase();
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const handleClickName = () => {
    router.push(
      makeUrlObjectFromRouteBase(routeProductDetailBase, { id: product._id }),
    );
  };

  return (
    <div>
      <div className={`flex pt-2 pb-2 ${disabled ? "opacity-70" : ""}`}>
        <div className={disabled ? "" : "cursor-pointer"} onClick={handleClickName}>
          <Image
            src={getThumbimageFromMedia(product.media)?.urlPreSign}
            style={{ width: 75, height: 75 }}
            fileType={getThumbimageFromMedia(product.media)?.fileType}
            showIconVideo
          />
        </div>
        <div className="flex-grow pl-3 pr-3" style={{ width: "calc(100% - 123px)" }}>
          <div>
            <p
              className={`line-clamp-2  ${
                disabled ? "text-lighterGray" : "cursor-pointer hover:underline"
              }`}
              onClick={handleClickName}
            >
              {product.productName}
            </p>
          </div>
          <div className="flex mt-1">
            <div className="mr-4">
              <NumberWithIcon
                value={product.qty}
                inputClassName="w-28"
                disabled={disabled}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col">
              <NumberFormatCustome
                value={product.qty * product[priceFieldName]}
                prefix={symbol}
                className={`text-orange ${disabled ? "text-lighterGray" : ""}`}
              />
              {isLoggedIn && (
                <NumberFormatCustome
                  value={product.qty * product.pv}
                  suffix=" PV"
                  className={`mt-1 text-brown text-sm ${disabled ? "text-lighterGray" : ""}`}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <IconButton onClick={() => setIsOpenConfirm(true)}>
            <DeleteOutlineOutlinedIcon className="text-red" />
          </IconButton>
        </div>
      </div>

      <Divider />
      <ModalConfirm
        open={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        confirmType="delete-confirm"
        onConfirm={handleRemoveItem}
      />
    </div>
  );
}
