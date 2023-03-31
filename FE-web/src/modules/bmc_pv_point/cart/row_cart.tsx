import useTranslation from "next-translate/useTranslation";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from "src/components";
import Image from "src/components/image";
import NumberFormatCustome from "src/components/text/number-format";
import { toggleSelectedProduct } from "src/feature/transfer-bmc/slice";
import { RootState } from "src/state/store";
import { OrderProductDetailType } from "types/orders";

export default function RowCart({
  product,
  orderId,
  saType,
}: {
  product: OrderProductDetailType;
  orderId: string;
  saType: "BMC" | "ROC";
}) {
  const dispatch = useDispatch();
  const { selectedProduct, orderId: orderIdSelected } = useSelector(
    (state: RootState) => state.transferBMC,
  );
  const { t } = useTranslation("common");

  const handleClickCheckBox = () => {
    dispatch(toggleSelectedProduct({ product, orderId }));
  };

  return (
    <div>
      <div className="grid grid-cols-11 mt-2.5 text-black" style={{ height: 85 }}>
        <div className="col-span-11 sm:col-span-6 flex items-center">
          <div>
            <CheckBox
              className="w-4 h-4"
              classNameChecked="w-3 h-3"
              checked={
                selectedProduct?.productCode === product.productCode && orderId === orderIdSelected
              }
              disabled={product.timesTransferLeft === 0 || saType !== "BMC"}
              onChange={handleClickCheckBox}
            />
          </div>

          <div className="flex pl-3 h-full w-full sm:w-auto">
            <div>
              <Image
                src={product.productImage}
                style={{ width: 75, height: 75 }}
                fileType={product.fileType}
                showIconVideo
              />
            </div>
            <div className="pl-3 w-full sm:w-auto">
              <span className="w-full sm:w-auto">{product.productName}</span>
              <div className="flex flex-wrap justify-between">
                <div className="sm:hidden block ">
                  <div className="flex">
                    <div className="pr-1 text-sm sm:text-base text-black-dark">{`${t`quantity`}: `}</div>
                    <NumberFormatCustome
                      value={product.timesTransferLeft}
                      className="text-sm sm:text-base text-black-dark"
                    />
                    <NumberFormatCustome
                      value={product.quantity}
                      className="text-s sm:text-xs text-brown"
                      prefix=" / "
                    />
                  </div>
                </div>
                <div className="sm:hidden block text-black-dark ">
                  <div className="flex items-center text-sm sm:text-base">
                    <NumberFormatCustome
                      value={product.timesTransferLeft * product.pv}
                      className="text-sm sm:text-base"
                    />
                    <NumberFormatCustome
                      value={product.quantity * product.pv}
                      prefix=" / "
                      className="text-s sm:text-xs"
                    />
                    <div className="pl-1 text-sm sm:text-base text-brown">PV</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:block col-span-11 sm:col-span-2 text-center text-black-dark">
          <NumberFormatCustome value={product.timesTransferLeft} />
          <NumberFormatCustome value={product.quantity} className="text-xs" prefix=" / " />
        </div>
        <div className="hidden sm:block col-span-11 sm:col-span-3 text-center text-brown">
          <NumberFormatCustome value={product.timesTransferLeft * product.pv} suffix=" / " />
          <NumberFormatCustome value={product.quantity * product.pv} className="text-xs" />
          {" PV"}
        </div>
      </div>
    </div>
  );
}
