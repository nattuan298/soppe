import { Divider } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { ButtonMui } from "src/components";
import NumberFormatCustome from "src/components/text/number-format";
import { useLocationBase } from "src/hooks";
import useLoggedIn from "src/hooks/useLoggedIn";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";

interface ModalOrderSummaryType {
  onClickPayment?: () => void;
  buttonTitle: string;
  totalPrice: number;
  totalPV: number;
  totalQty: number;
  disabledButton?: boolean;
  showCircleButton?: boolean;
}

export default function ModalOrderSummary({
  onClickPayment,
  buttonTitle,
  totalPV = 0,
  totalPrice = 0,
  totalQty = 0,
  disabledButton,
  showCircleButton,
}: ModalOrderSummaryType) {
  const { t } = useTranslation("common");
  const { symbol } = useLocationBase();
  const screen = useGetScreenWidth();
  const { isLoggedIn } = useLoggedIn();

  return (
    <div className="w-screen sm:w-72 fixed bottom-0 right-0 z-10 sm:z-0 sm:sticky bottom sm:top-24 pt-4 sm:pt-2 pb-4 sm:pb-6 pl-4 pr-4 rounded-0.625 shadow-modal bg-white">
      <p className="font-medium text-lg mb-4 text-black hidden sm:block">{t`order_summary`}</p>
      <div className=" grid-cols-5 gap-4 mb-2.5 hidden sm:grid">
        <div className="col-span-2">
          <span>{t`quantity`}:</span>
        </div>
        <div className="col-span-3">
          <NumberFormatCustome value={totalQty} />
        </div>
      </div>

      {/* {isLoggedIn && screen === "Desktop" && (
        <div className="hidden sm:grid grid-cols-5 gap-4 mb-2.5 ">
          <div className="col-span-2">
            <span className="text-brown">{t`total_pv`}:</span>
          </div>
          <div className="col-span-3">
            <span className="text-brown">
              <NumberFormatCustome value={totalPV} />
            </span>
          </div>
        </div>
      )} */}
      {screen === "Desktop" && (
        <div className="grid grid-cols-5 gap-4 mb-2.5">
          <div className="col-span-2">
            <span className="text-brown-dark font-medium">{t`total`}:</span>
          </div>
          <div className="col-span-3">
            <span className="font-medium text-brown-dark">
              <NumberFormatCustome value={totalPrice} prefix={symbol} />
            </span>
          </div>
        </div>
      )}
      <Divider className="mt-4 mb-6 hidden sm:block" />
      <div className="flex sm:block items-center justify-center">
        <div className="block sm:hidden mr-[50px]">
          <div className="flex">
            <div className="mr-2">
              <span className="text-brown-dark font-medium">{t`total`}:</span>
            </div>
            <div>
              <span className="font-medium text-brown-dark">
                <NumberFormatCustome value={totalPrice} prefix={symbol} />
              </span>
            </div>
          </div>
        </div>
        <ButtonMui
          onClick={onClickPayment}
          height={screen === "Desktop" ? 45 : 40}
          textClassName="font-normal"
          disabled={disabledButton}
          showCircle={showCircleButton}
        >
          {buttonTitle}
        </ButtonMui>
      </div>
    </div>
  );
}
