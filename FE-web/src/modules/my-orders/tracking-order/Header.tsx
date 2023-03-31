import { IconButton } from "@material-ui/core";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { notifyToast } from "src/constants/toast";

interface HeaderProps {
  trackingNumber: string;
  orderId: string;
  userInfor: string;
  address: string;
  shippingCompanyName: string;
  orderStatus: string;
}

const getLogo: { [key: string]: string } = {
  "Kerry Express": "/assets/images/ship_company/Kerry_Express_Logo.png",
  "DHL Express": "/assets/images/ship_company/DHL_Logo.png",
  "Teleport Express": "/assets/images/ship_company/teleport-logo.jpg",
};

export default function Header({
  trackingNumber,
  orderId,
  userInfor,
  address,
  shippingCompanyName,
  orderStatus,
}: HeaderProps) {
  const { t } = useTranslation("common");

  const handleClickCopy = () => {
    navigator.clipboard.writeText(trackingNumber);
    notifyToast("default", "copy_success", t);
  };

  const showTrackingNumber = orderStatus === "To Receive";

  return (
    <div className="relative">
      <div className="flex flex-col">
        <div className="mr-2 mb-[10px] sm:mb-0">
          <span className="font-medium">{`${t("order_id")}:`}</span>
          <span className="text-orange ml-2">{orderId}</span>
        </div>
        <div className="block sm:hidden">
          {showTrackingNumber && (
            <Image
              src={getLogo[shippingCompanyName] || ""}
              alt={shippingCompanyName}
              width={100}
              height={51}
            />
          )}
        </div>
      </div>

      {showTrackingNumber && (
        <div className="mt-4">
          <p className="mb-1 text-sm">{t("tracking_number")}</p>

          <div className="h-50 pl-4 pr-4 flex items-center justify-between rounded border border-solid border-lightestGray w-auto sm:w-[343px]">
            <span className="text-sm">{trackingNumber}</span>
            <IconButton onClick={handleClickCopy}>
              <FileCopyOutlinedIcon className="text-black" />
            </IconButton>
          </div>
        </div>
      )}

      <div className="mt-4">
        <p className="text-sm mt-2 font-medium">{t`ship_to`}:</p>
        <p className="text-sm mt-1 font-medium">{userInfor}</p>
        <div className="mt-2 grid grid-cols-3">
          <div className="col-span-2">
            <p className="text-sm text-brown">{address}</p>
          </div>
        </div>
      </div>

      <div className="hidden sm:block absolute top-0 right-0">
        {showTrackingNumber && (
          <Image
            src={getLogo[shippingCompanyName] || ""}
            alt={shippingCompanyName}
            width={100}
            height={51}
          />
        )}
      </div>
    </div>
  );
}
