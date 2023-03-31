import { Divider, IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { useRouter } from "next/router";
import { useState } from "react";
import { makeUrlObjectFromRouteBase, routeProductDetailBase } from "src/constants/routes";
import { ProductTypeWithQty } from "src/feature/shopping-cart/type";
import { useLocationBase } from "src/hooks";
import useLoggedIn from "src/hooks/useLoggedIn";
import { getThumbimageFromMedia } from "src/utils/product";
import { CheckBox } from "../checkbox";
import Image from "../image";
import NumberInputWithIcon from "../input/number-with-icon";
import { ModalConfirm } from "../modal-confirm";
import NumberFormatCustome from "../text/number-format";

interface ShoppingCartType {
  noSelect?: boolean;
  onClickDelete?: (id: string) => void;
  product: ProductTypeWithQty;
  isSelected?: boolean;
  onClickSelect?: (id: string, checked: boolean) => void;
  onChange: (qty: number) => void;
  showPublicPrice?: boolean;
}

export default function RowCart({
  product,
  noSelect,
  onClickDelete,
  isSelected,
  onClickSelect,
  onChange,
  showPublicPrice,
}: ShoppingCartType) {
  const router = useRouter();
  const { symbol, locationBase } = useLocationBase();
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const { isLoggedIn, priceFieldName } = useLoggedIn();
  const disabled = product.status !== "Active" || (!isLoggedIn && product.personalPrice === 0);
  const handleClickName = () => {
    if (disabled) {
      return;
    }
    router.push(
      makeUrlObjectFromRouteBase(routeProductDetailBase, { id: product.productCode, locationBase }),
    );
  };

  const formatToNumber = (val: string) => {
    if (val.charAt(0) === "0") {
      const newval = val.replace(/^0+/, "");
      return newval;
    }
    return val;
  };

  return (
    <div>
      <div
        className="sm:grid grid-cols-10 mt-4 items-center text-black hidden"
        style={{ height: 85 }}
      >
        <div className="grid grid-cols-12 col-span-9 items-center">
          <div className="col-span-6 mb-2.5 flex items-center">
            <div>
              {!noSelect && (
                <CheckBox
                  checked={disabled ? false : !!isSelected}
                  onChange={(e) => !disabled && onClickSelect?.(product.productCode, e.checked)}
                  disabled={disabled}
                />
              )}
            </div>

            <div className="flex pl-3">
              <div className={disabled ? "" : "cursor-pointer"} onClick={handleClickName}>
                <Image
                  src={getThumbimageFromMedia(product.media)?.urlPreSign}
                  style={{ width: 75, height: 75 }}
                  className={`mr-4 ${disabled ? "opacity-70" : ""}`}
                  fileType={getThumbimageFromMedia(product.media)?.fileType}
                  showIconVideo
                  sizeIcon={{ width: "60%", height: "60%" }}
                />
              </div>
              <div className="col-span-4">
                <span className={disabled ? "text-lighterGray" : ""}>{product.productName}</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-center">
            <NumberInputWithIcon
              value={product.qty}
              disabled={noSelect || disabled}
              onChange={onChange}
              formatToNumber={formatToNumber}
            />
          </div>
          <div
            className={`${
              isLoggedIn ? "sm:col-span-2 col-span-4" : "col-span-4"
            } text-center text-orange ${disabled ? "text-lighterGray" : ""}`}
          >
            <div className="m-auto ml-2">
              <NumberFormatCustome
                value={product[priceFieldName]}
                prefix={symbol}
                className={`${isLoggedIn && "float-left ml-2"}`}
              />
              {showPublicPrice && (
                <NumberFormatCustome
                  className="text-lighterGray text-sm line-through pl-2 mt-1 float-left"
                  value={product.personalPrice}
                  prefix={symbol}
                />
              )}
            </div>
          </div>
          {isLoggedIn && (
            <div
              className={`col-span-2 text-center text-xs sm:text-base text-brown ml-4 ${
                disabled ? "text-lighterGray" : ""
              }`}
            >
              <NumberFormatCustome value={product.pv} suffix=" PV" />
            </div>
          )}
        </div>
        {!noSelect && (
          <div className="col-span-1 text-center">
            <IconButton onClick={() => setIsOpenConfirm(true)}>
              <DeleteOutlineIcon className="text-red" />
            </IconButton>
          </div>
        )}
      </div>

      {/* Mobile */}
      <div className="p-2 sm:hidden">
        <div className="flex flex-row items-center gap-1">
          {!noSelect && (
            <CheckBox
              checked={disabled ? false : !!isSelected}
              onChange={(e) => !disabled && onClickSelect?.(product.productCode, e.checked)}
              disabled={disabled}
            />
          )}

          <div className={disabled ? "" : "cursor-pointer ml-3 sm:ml-0"} onClick={handleClickName}>
            <Image
              src={getThumbimageFromMedia(product.media)?.urlPreSign}
              style={{ width: 75, height: 75 }}
              className={`mr-4 ${disabled ? "opacity-70" : ""}`}
              fileType={getThumbimageFromMedia(product.media)?.fileType}
              showIconVideo
            />
          </div>

          <div className="flex-1">
            <span className={disabled ? "text-lighterGray" : ""}>{product.productName}</span>
            <div className="flex flex-row items-center justify-between my-1">
              <NumberInputWithIcon
                value={product.qty}
                disabled={noSelect || disabled}
                onChange={onChange}
                formatToNumber={formatToNumber}
              />

              {!noSelect && (
                <div className="">
                  <IconButton className="p-0" onClick={() => setIsOpenConfirm(true)}>
                    <DeleteOutlineIcon className="text-red" />
                  </IconButton>
                </div>
              )}
            </div>

            <div className="flex flex-row items-start justify-between">
              <div className="flex flex-col">
                <NumberFormatCustome
                  value={product[priceFieldName]}
                  prefix={symbol}
                  className={`${isLoggedIn && "float-left ml-2 text-orange"} `}
                />
                {showPublicPrice && (
                  <NumberFormatCustome
                    className="text-lighterGray text-sm line-through pl-2 mt-1 float-left"
                    value={product.personalPrice}
                    prefix={symbol}
                  />
                )}
              </div>
              {isLoggedIn && (
                <div
                  className={`col-span-2 text-center text-xs sm:text-base text-brown ml-4 ${
                    disabled ? "text-lighterGray" : ""
                  }`}
                >
                  <NumberFormatCustome value={product.pv} suffix=" PV" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <Divider />
      <ModalConfirm
        open={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        confirmType="delete-confirm"
        onConfirm={() => onClickDelete?.(product.productCode)}
      />
    </div>
  );
}
