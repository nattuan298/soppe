import useTranslation from "next-translate/useTranslation";
import { Title } from "src/components";
import { Logo } from "src/components/svgs";
import NumberWithIcon from "src/components/input/number-with-icon";
import useGetScreenWidth from "../../../../hooks/useGetScreenWidth";

interface OrderSummaryType {
  totalPrice: number;
}

export default function OrderSummary({ totalPrice }: OrderSummaryType) {
  const { t } = useTranslation("common");
  const screen = useGetScreenWidth();
  return (
    <div className="mb-2">
      <p className="text-lg font-medium">{t`order_summary`}</p>
      <div className="grid-cols-4 gap-4 mt-4 hidden sm:grid">
        <div className="col-span-2">
          <Title title={t`product`} />
        </div>
        <div className="col-span-1 flex justify-center">
          <Title title={t`quantity`} />
        </div>
        <div className="col-span-1 flex justify-center">
          <Title title={t`price`} />
        </div>
      </div>
      {screen === "Desktop" && (
        <div className="grid grid-cols-4 gap-4 items-center">
          <div className="col-span-2 flex items-center">
            <Logo />
            <span className="sm:text-base text-sm sm:w-full w-1/2">{t`SCM_subscription`}</span>
          </div>
          <div className="col-span-1 flex justify-center">
            <NumberWithIcon value={1} disabled stillShowColorTextInput />
          </div>
          <div className="col-span-1 text-orange text-center">฿{totalPrice}</div>
        </div>
      )}
      <div className="sm:hidden flex gap-4 mb-4 mt-3">
        <Logo />
        <div className=" sm:hidden flex flex-col gap-1">
          <div className="mb-[13px] sm:mb-0">{t`SCM_subscription`}</div>
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <NumberWithIcon value={1} disabled stillShowColorTextInput />
            </div>
            <div className="text-orange mt-[10px] sm:mt-0">฿{totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
