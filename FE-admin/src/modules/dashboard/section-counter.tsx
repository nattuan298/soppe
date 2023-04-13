import { useTranslation } from "react-i18next";
import { ButtonLink } from "src/components";
import {
  routePlatformHome,
  routesOrderManagement,
  routesUserManagement,
} from "src/constants/routes";
interface SectionProps {
  conversionRate: number;
  numberOrder: number;
  numberUser: number;
  totalTraction: number;
}

export default function SectionCounter({
  conversionRate,
  numberOrder,
  numberUser,
  totalTraction,
}: SectionProps) {
  const { t } = useTranslation("common");

  return (
    <div className="w-full pl-5 pr-5 m-auto">
      <div className="w-full gap-12 grid grid-cols-2 wide:grid-cols-4">
        <ButtonLink
          to={routePlatformHome}
          className="rounded-navbar bg-white shadow-navbar col-span-1 py-6 pl-9 h-32 focus:outline-none"
        >
          <div className="text-left w-full">
            <div className="text-lg text-black-primary mb-4 font-medium">{t`total-traction`}</div>
            <div className="text-summary font-medium text-orange-light">
              {totalTraction.toLocaleString()}
            </div>
          </div>
        </ButtonLink>
        <ButtonLink
          to={routesOrderManagement}
          className="h-32 rounded-navbar bg-white shadow-navbar col-span-1 py-6 pl-9 focus:outline-none"
        >
          <div className="text-left w-full">
            <div className="text-lg text-black-primary mb-4 font-medium">{t`total-orders`}</div>
            <div className="text-summary font-medium text-orange-light">
              {numberOrder.toLocaleString()}
            </div>
          </div>
        </ButtonLink>
        <div className="h-32 rounded-navbar bg-white shadow-navbar col-span-1 py-6 pl-9">
          <div className="text-lg text-black-primary mb-4 font-medium">{t`conversion-rate`}</div>
          <div className="text-summary font-medium text-orange-light">{`${conversionRate.toLocaleString()} %`}</div>
        </div>
        <ButtonLink
          to={routesUserManagement}
          className="h-32 rounded-navbar bg-white shadow-navbar col-span-1 py-6 pl-9 focus:outline-none"
        >
          <div className="text-left w-full">
            <div className="text-lg text-black-primary mb-4 font-medium">{t`total-user-accounts`}</div>
            <div className="text-summary font-medium text-orange-light">
              {numberUser.toLocaleString()}
            </div>
          </div>
        </ButtonLink>
      </div>
    </div>
  );
}
