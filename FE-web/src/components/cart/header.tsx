import useTranslation from "next-translate/useTranslation";
import useLoggedIn from "src/hooks/useLoggedIn";
import { CheckBox } from "../checkbox";

interface HeaderType {
  noSelect?: boolean;
  totalProduct: number;
  numberSelected: number;
  handleSelect: (checked: boolean) => void;
}

export default function Header({
  noSelect,
  totalProduct,
  numberSelected,
  handleSelect,
}: HeaderType) {
  const { t } = useTranslation("common");
  const { isLoggedIn } = useLoggedIn();
  return (
    <div className="grid grid-cols-10 sm:mt-4 text-black">
      <div className="grid grid-cols-12 col-span-9 sm:mt-4">
        <div className="hidden sm:flex col-span-12 sm:col-span-6 items-center">
          {!noSelect && (
            <CheckBox
              checked={totalProduct === numberSelected && totalProduct > 0}
              onChange={(e) => totalProduct > 0 && handleSelect(e.checked)}
              disabled={totalProduct === 0}
            />
          )}

          <span className="ml-2.5 mr-2 text-sm">{t`product`}</span>

          {!noSelect && (
            <span className="text-sm text-lighterGray">
              {totalProduct > 0 ? `(${numberSelected}/${totalProduct} ` : "(0 "} {t`selected`})
            </span>
          )}
        </div>
        <div className="flex sm:hidden col-span-12 sm:col-span-6 items-center px-2">
          {!noSelect && (
            <CheckBox
              checked={totalProduct === numberSelected && totalProduct > 0}
              onChange={(e) => totalProduct > 0 && handleSelect(e.checked)}
              disabled={totalProduct === 0}
            />
          )}

          <span className="ml-2.5 mr-2 text-base">{t`select_all`}</span>
        </div>
        <div className="hidden sm:block col-span-2 text-center text-sm">{t`quantity`}</div>

        {isLoggedIn && <p className="hidden sm:block col-span-4 text-center text-sm">{t`price`}</p>}
        {!isLoggedIn && (
          <div
            key="price"
            className="hidden sm:block col-span-4 text-center text-sm"
          >{t`price`}</div>
        )}

        {/* <div
          className={`${isLoggedIn ? "col-span-2" : "col-span-4"} text-center text-sm`}
        >{t`auth:price`}</div> */}
        {/* {isLoggedIn && (
          <p
            key="received_PV"
            className=" hidden sm:block col-span-2 text-center text-sm ml-4"
          >{t`received_PV`}</p>
        )} */}
      </div>
      <div className="col-span-1" />
    </div>
  );
}
