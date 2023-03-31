import { CircularProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { LeftNavination } from "src/components";
import { ModalUserSummaryInfo } from "src/components/user-summary";
import { getAddressFromOrderAddress } from "src/utils";
import { OrderTrackingType } from "types/orders";
import Header from "./Header";
import TrackStep from "./track-step";

export default function TrackingOrder({
  tracking,
  isError,
}: {
  tracking: OrderTrackingType | null;
  isError: boolean;
}) {
  const { t, lang } = useTranslation("common");
  const { userInfor, address } = getAddressFromOrderAddress(
    tracking?.order?.shippingAddress || null,
    lang,
  );

  return (
    <div className="mx-4 sm:mx-auto w-auto sm:w-1216 relative mb-8">
      <div className="hidden sm:block">
        <ModalUserSummaryInfo />
      </div>
      <div className="flex mt-6">
        <div className="hidden sm:block col-span-2">
          <LeftNavination />
        </div>
        <div className="pl-0 sm:pl-20 flex-grow">
          {tracking && (
            <>
              <Header
                trackingNumber={tracking.order?.trackingNumber}
                shippingCompanyName={tracking.order?.courierName}
                orderId={tracking.order.orderNumber}
                userInfor={userInfor}
                address={address}
                orderStatus={tracking.order.status}
              />

              <div className="mt-6">
                <TrackStep
                  steps={tracking.trackingStatus}
                  firstStep={{
                    statusCode: t`packed_by_seller_warehouse`,
                    statusDesc: t`your_package_is_packed`,
                    updateDate: tracking.order.createdAt,
                  }}
                />
              </div>
            </>
          )}

          {!tracking && isError && <div>{t`coming_soon`}</div>}
          {!tracking && !isError && (
            <div className="flex items-center justify-center w-full h-80">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
