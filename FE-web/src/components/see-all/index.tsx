import React from "react";
import cls from "./see-all.module.css";
import Link from "next/link";
import { PageLayout } from "..";
import Countdown from "react-countdown";
import { pad } from "src/utils";
import { range } from "lodash";
import useTranslation from "next-translate/useTranslation";

export function SeeAll({
  iconSrc,
  isFlashSale,
  titleText,
  link,
  endDate = "2021-12-24",
}: {
  iconSrc?: string;
  isFlashSale: boolean;
  titleText: String;
  link: string;
  endDate?: string;
}) {
  const { t } = useTranslation("common");

  return (
    <PageLayout>
      <div className={cls.see_all}>
        {iconSrc && <img className={cls.icon} width="24" height="24" src={iconSrc} alt="" />}
        <div className={cls.title}>{titleText}</div>
        {isFlashSale && (
          <div className={cls.flash_sale}>
            <FlashSale targetDate={new Date(endDate)} />
          </div>
        )}
        {link && (
          <div className={cls.see_all_link}>
            <Link href={link}>{t`see_all`}</Link>
          </div>
        )}
      </div>
    </PageLayout>
  );
}

const FlashSale = ({ targetDate }: { targetDate: Date }) => {
  const { t } = useTranslation("common");
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    return (
      <div className={cls.countdown}>
        {renderTimeComponent(days >= 100 ? String(days) : pad(days, 2))}
        <span className={cls.colon}>:</span>
        {renderTimeComponent(pad(hours, 2))}
        <span className={cls.colon}>:</span>
        {renderTimeComponent(pad(minutes, 2))}
        <span className={cls.colon}>:</span>
        {renderTimeComponent(pad(seconds, 2))}
      </div>
    );
  };

  const renderTimeComponent = (str: string) => {
    return (
      <>
        {range(str.length).map((item, index) => (
          <span key={index} className={cls.number_countdown}>
            {str.substr(index, 1)}
          </span>
        ))}
      </>
    );
  };
  return (
    <>
      <span className={cls.endin}>{t`end_in`}:</span>
      {/* <Countdown date={Date.now() + 186400000} renderer={renderer} /> */}
      <Countdown date={targetDate} renderer={renderer} />
    </>
  );
};
