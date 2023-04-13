import { MouseEvent, ReactNode } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import { GroupBack } from "../svg";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { SelectLanguage } from "..";

interface GoBackProps {
  className?: string;
  children?: ReactNode;
  url?: string;
  SelectLang?: boolean;
  couponHistory?: boolean;
  onChange?: (country?: string) => void;
  CanSwitch?: boolean;
}

export function GoBack({
  className,
  children,
  url,
  CanSwitch,
  SelectLang,
  couponHistory,
  onChange,
  ...props
}: GoBackProps) {
  const { t } = useTranslation("common");
  const history = useHistory();
  const goBackClass = clsx(
    className && className,
    "w-full bg-white go-back flex items-center p-5 mb-5",
  );

  function handleClickGoBack(event: MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    if (url) {
      history.push(url);
      return;
    }
    history.goBack();
  }
  const handleChange = (country?: string) => {
    onChange?.(country);
  };
  return (
    <div>
      <div className={goBackClass} {...props}>
        <div
          className={`flex ${
            couponHistory ? "goBack-couponHistory mr-[86px] 2xl:mr-[137px]" : "w-full"
          } justify-between items-center`}
          role="button"
        >
          <div
            className="flex text-orange-light hover:text-orange-hover text-xl font-medium flex-shrink-0"
            onClick={handleClickGoBack}
          >
            <GroupBack className="mr-5" /> {t("go-back")}
          </div>
          {SelectLang && <SelectLanguage onSelect={handleChange} CanSwitch={CanSwitch} />}
        </div>
        {children && children}
      </div>
    </div>
  );
}
