import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import { ButtonMui } from "src/components";
import Image from "src/components/image";
import InputNumberWithIcon from "src/components/input/number-with-icon";
import NumberFormat from "src/components/text/number-format";
import { useLocationBase } from "src/hooks";
import useLoggedIn from "src/hooks/useLoggedIn";
import { getThumbimageFromMedia } from "src/utils/product";
import { ProductType } from "types/api-response-type";

interface OrderProductDetailType {
  productDetail: ProductType;
  defaultQty?: number;
  handleAddToCart: (product: ProductType, qty: number) => void;
  handleBuyNow: (qty: number) => void;
  disabled?: boolean;
}

export default function OrderProductDetail({
  productDetail,
  defaultQty = 1,
  handleAddToCart,
  handleBuyNow,
  disabled,
}: OrderProductDetailType) {
  const { t } = useTranslation("common");
  const [value, setValue] = useState(defaultQty);
  const { priceFieldName } = useLoggedIn();
  const { symbol } = useLocationBase();

  useEffect(() => {
    setValue(1);
  }, [productDetail.productCode]);

  const handleChange = (val: number) => {
    setValue(val);
  };
  return (
    <div className="w-full sm:w-72 sm:z-0 z-10 pt-3 pb-3 sm:pb-6 pl-4 pr-4 rounded-0.625 shadow-modal bg-white fixed sm:sticky bottom-0 right-0 sm:top-24">
      <p className="hidden sm:block font-medium text-lg">{t`order_summary`}:</p>
      <div className="hidden sm:flex justify-between overflow-hidden mt-2">
        <Image
          src={getThumbimageFromMedia(productDetail.media)?.urlPreSign}
          style={{ width: 57, height: 57 }}
          fileType={getThumbimageFromMedia(productDetail.media)?.fileType}
          showIconVideo
        />

        <div className="overflow-hidden break-all" style={{ width: "calc(100% - 67px)" }}>
          <span className="line-clamp-2 font-light">{productDetail.productName}</span>
        </div>
      </div>

      <div className="flex mt-2 sm:mt-5 justify-between items-center">
        <span className="font-medium text-lg text-black-dark">
          {t`total`}:
          <NumberFormat
            className="pl-2"
            value={(productDetail[priceFieldName] * value).toFixed(2)}
            prefix={symbol}
          />
        </span>
        <InputNumberWithIcon inputClassName="w-24" value={value} onChange={handleChange} />
      </div>

      <div className="mt-[21px] sm:mt-6 flex sm:block items-center">
        <ButtonMui
          height={45}
          textClassName="font-normal"
          onClick={() => handleBuyNow(value)}
          disabled={disabled}
          showCircle={disabled}
        >
          {t`buy_now`}
        </ButtonMui>
        <ButtonMui
          variant="outlined"
          className="ml-[21px] sm:ml-0 sm:mt-5 hidden sm:block"
          textClassName="font-normal"
          height={45}
          // onClick={() => handleAddToCart(value)}
          onClick={() => handleAddToCart(productDetail, value)}
        >
          {t`add_to_cart`}
        </ButtonMui>
        <ButtonMui
          variant="outlined"
          colorSecondary
          className="ml-[21px] sm:ml-0 sm:mt-5 block sm:hidden"
          textClassName="font-normal"
          height={45}
          // onClick={() => handleAddToCart(value)}
          onClick={() => handleAddToCart(productDetail, value)}
        >
          {t`add_to_cart`}
        </ButtonMui>
      </div>
    </div>
  );
}
