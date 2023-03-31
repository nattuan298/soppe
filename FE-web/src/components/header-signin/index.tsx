import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { BackIcon } from "src/components";
import { REPORT_PATHS } from "src/constants/app";
import {
  routeHomeBase,
  routeReportAnalysisBase,
  routeSponsoredUserHistoryBase,
} from "src/constants/routes";
import { RootState } from "src/state/store";
import { InputDatePicker } from "../date-picker/date-range-picker";
import { SearchHelpCenter } from "../search/search-help-center";
import { SelectYear } from "../select/select-year";
import { HistoryIcon } from "../svgs";
import useGetScreenWidth from "src/hooks/useGetScreenWidth";
interface HeaderSignInPropTypes {
  title: string;
  onClickBack?: () => void;
  iconHistory?: boolean;
  search?: boolean;
  showDateRange?: boolean;
  refresh?: boolean;
  handleSearch?: (value: string) => void;
  onClickHistory?: () => void;
  handleSelectDateRange?: (from: Date, to: Date) => void;
  hidden?: boolean;
  dateData?: {
    from: Date;
    to: Date;
  };
  searchPlaceHoder?: string;
  showSelectYear?: boolean;
  handleSelectYear?: (year: number) => void;
  optionsYear?: number[];
  year?: number;
  diableSearch?: boolean;
  userInfo?: ReactNode;
  classNameContainer?: string;
}

export function HeaderSignIn({
  title,
  onClickBack,
  iconHistory,
  search,
  refresh,
  hidden,
  handleSearch,
  onClickHistory,
  showDateRange,
  handleSelectDateRange,
  dateData,
  searchPlaceHoder,
  showSelectYear,
  handleSelectYear,
  year,
  optionsYear,
  diableSearch,
  userInfo,
  classNameContainer,
}: HeaderSignInPropTypes) {
  const router = useRouter();
  const preUrl = useSelector((state: RootState) => state.user.preUrl);
  const { t } = useTranslation("common");
  const handleUserHistory = () => {
    if (onClickHistory) {
      return onClickHistory();
    }

    if (refresh) {
      return window.location.reload();
    }
    router.push(routeSponsoredUserHistoryBase);
  };

  const handleClickBack = () => {
    if (onClickBack) {
      onClickBack();
    } else {
      if (REPORT_PATHS.has(router.pathname)) {
        return router.push(routeReportAnalysisBase);
      }

      if (preUrl) {
        return router.back();
      }

      return router.push(routeHomeBase);
    }
  };

  const handleSelectDate = (from: Date | null, to: Date | null) => {
    if (from && to) {
      handleSelectDateRange?.(from, to);
    }
    // handleSelectDateRange({})(from: Date | null, to: Date | null) => void;
  };
  const width = useGetScreenWidth();
  return (
    <div className={`${classNameContainer} breadcrumb`}>
      <div
        className={`sm:w-1216 sm:relative m-auto pt-9 md:pb-9 pb-[15px] flex w-full ${
          width === "Mobile" ? "relative" : ""
        }`}
      >
        {!hidden ? (
          <div
            className={`sm:ml-0 ml-2 back-icon hover:cursor-pointer ${
              width === "Mobile" ? "absolute" : ""
            }`}
            onClick={handleClickBack}
          >
            <BackIcon />
          </div>
        ) : null}
        <div
          className={`text-white text-xl font-medium ${
            title.length > 31 ? "ml-[50px]" : "mx-auto"
          } md:mx-0 max-w-[309px] truncate`}
        >
          {title}
        </div>
        {iconHistory && (
          <div onClick={handleUserHistory}>
            <HistoryIcon
              className={`sm:mr-0 mr-2 ml-5 md:ml-12 hover:cursor-pointer ${
                width === "Mobile" ? "absolute right-0" : ""
              }`}
            />
          </div>
        )}

        {search && width !== "Mobile" ? (
          // <div className="absolute right-0 -mt-1">
          <div className="absolute md:right-0 md:-mt-1 md:border-none rounded-[7px] right-1/2 translate-x-1/2 md:translate-x-0 top-48 md:top-9 z-20 border">
            <SearchHelpCenter
              disabled={diableSearch}
              handleSearch={handleSearch}
              placeholder={searchPlaceHoder || t`search`}
            />
          </div>
        ) : null}

        {showDateRange && width !== "Mobile" && (
          <div
            className="absolute md:right-0 md:border-none rounded-[7px] right-1/2 translate-x-1/2 md:translate-x-0 top-48 md:top-9 z-20 border"
            style={{ width: 257, top: "50%", transform: "translateY(-50%)" }}
          >
            <InputDatePicker
              defaultFrom={dateData?.from || new Date()}
              defaultTo={dateData?.to || new Date()}
              handleSelect={handleSelectDate}
              screen={width}
            />
          </div>
        )}

        {showSelectYear && year && optionsYear && width !== "Mobile" && (
          <div
            className="absolute md:right-0 right-3 z-10 top-[270px] md:w-[257px] md:top-[50%]"
            style={{ transform: "translateY(-50%)" }}
          >
            <SelectYear
              options={optionsYear}
              defaultValue={year}
              selectClassName="h-10"
              style={{ borderRadius: 7 }}
              onChangeYear={handleSelectYear}
            />
          </div>
        )}
      </div>
      <div className="pb-[15px] px-4">
        {userInfo}
        {search && width !== "Desktop" ? (
          <div className="px-[2.688rem]">
            <SearchHelpCenter
              disabled={diableSearch}
              handleSearch={handleSearch}
              placeholder={searchPlaceHoder || t`search`}
              className="w-full"
            />
          </div>
        ) : null}

        {showDateRange && width !== "Desktop" && (
          <div
            className="px-[2.688rem]"
            // style={{ width: 257, top: "50%", transform: "translateY(-50%)" }}
          >
            <InputDatePicker
              defaultFrom={dateData?.from || new Date()}
              defaultTo={dateData?.to || new Date()}
              handleSelect={handleSelectDate}
              screen={width}
            />
          </div>
        )}

        {showSelectYear && year && optionsYear && width !== "Desktop" && (
          <div
            className="px-[2.688rem]"
            // style={{ transform: "translateY(-50%)" }}
          >
            <SelectYear
              options={optionsYear}
              defaultValue={year}
              selectClassName="h-10"
              style={{ borderRadius: 7 }}
              onChangeYear={handleSelectYear}
            />
          </div>
        )}
      </div>
    </div>
  );
}
