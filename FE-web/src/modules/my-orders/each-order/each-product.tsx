import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import Image from "src/components/image";
import Link from "src/components/text/link";
import NumberFormatCustome from "src/components/text/number-format";
import { routeReviewProductBase } from "src/constants/routes";
import { useLocationBase } from "src/hooks";
import { OrderProductDetailType, OrderStatusType } from "types/orders";

export default function RowCart({
  product,
  orderStatus,
  orderNumber,
}: {
  product: OrderProductDetailType;
  orderStatus: OrderStatusType;
  orderNumber?: string;
}) {
  const { t } = useTranslation("common");
  const isReviewed = product.isReviewed;
  const router = useRouter();
  const { symbol } = useLocationBase();

  const handleClickReview = () => {
    // router.push(makeUrlObjectFromRouteBase(routeReviewProductBase));
    router.push({
      pathname: routeReviewProductBase,
      query: {
        orderNumber,
        sku: product.productCode,
        name: product.productName,
        image: product.productImage,
        fileType: product.fileType,
      },
    });
  };

  return (
    <div>
      <div className="hidden sm:grid grid-cols-10 mt-4" style={{ height: 85 }}>
        <div className="grid grid-cols-12 col-span-10 gap-[10px]">
          <div className="col-span-8 mb-2.5 flex items-center">
            <div className="flex pl-3">
              <Image
                src={product.mediaUrl}
                className="mr-4 w-[75px] min-h-[75px]"
                fileType={"IMAGE"}
              />
              <div>
                <span>{product.productName}</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 text-center">{product.quantity}</div>
          <div className="col-span-2 text-center text-orange">
            <NumberFormatCustome value={(product?.quantity || 0) * product.price} prefix={symbol} />
          </div>
        </div>

        {orderStatus === "To Review" && (
          <div className="col-span-1 text-right">
            {!isReviewed && (
              <Link className="text-blue" onClick={handleClickReview}>{t`review`}</Link>
            )}
            {isReviewed && <span className="text-lighterGray">{t`reviewed`}</span>}
          </div>
        )}

        {orderStatus === "Complete" && (
          <div className="col-span-1 text-right">
            {isReviewed && <span className="text-lighterGray">{t`reviewed`}</span>}
          </div>
        )}
      </div>
      {/* mobile */}
      <div className="block sm:hidden mt-4 min-h-[85px]">
        <div className="grid grid-cols-12 gap-[10px]">
          <div className="col-span-3 mb-2.5 flex items-center">
            <div className="flex sm:pl-3">
              <Image
                src={product.mediaUrl}
                className="mr-4 w-[75px] min-h-[75px]"
                fileType={"IMAGE"}
              />
            </div>
          </div>
          <div className="col-span-9">
            <div>
              <span>{product.productName}</span>
            </div>
            <div className="flex text-sm justify-between">
              <div className="flex">
                <div>{t`quantity`}:</div> <div>{product.quantity}</div>
              </div>
              <div className=" text-orange">
                {" "}
                <NumberFormatCustome
                  value={(product.quantity || 0) * product.price}
                  prefix={symbol}
                />{" "}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                {orderStatus === "To Review" && (
                  <div className="col-span-1 text-right">
                    {!isReviewed && (
                      <Link
                        className="text-blue text-sm"
                        onClick={handleClickReview}
                      >{t`review`}</Link>
                    )}
                    {isReviewed && <span className="text-lighterGray">{t`reviewed`}</span>}
                  </div>
                )}

                {orderStatus === "Complete" && (
                  <div className="col-span-1 text-right">
                    {isReviewed && <span className="text-lighterGray">{t`reviewed`}</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
