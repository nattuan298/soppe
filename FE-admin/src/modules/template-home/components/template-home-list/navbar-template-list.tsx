import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

import { SelectCountry2 } from "src/components/select-country-2";
import { Button, ChipType, InputDatePicker, ResultFor, Search } from "src/components";
import { Navbar } from "src/components/navbar/index";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { clearSelectedHomeTemplate } from "src/store/template-home.slice";
import { ListCountryPhoneCode } from "src/constants/country_phone_code";

const DEFAULTLOCATION = {
  id: "locationBase",
  name: "All",
};

interface NavbarBannerListTypeProps {
  setFilter?: (filter: object) => void;
  addBannerLink: string;
  addBannerTitle: string;
}

export function NavbarTemplateHomePageList({
  setFilter,
  addBannerLink,
  addBannerTitle,
}: NavbarBannerListTypeProps) {
  const { t } = useTranslation("common");

  const date = new Date();
  const now = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  const past = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate(), 0, 0, 0);
  const [from, setFrom] = useState<Date | null>(past);
  const [to, setTo] = useState<Date | null>(now);
  const [locationFilter, setLocationFilter] = useState(DEFAULTLOCATION);

  const [keyword, setKeyword] = useState<string>("");
  const [searchFilterChips, setSearchFilterChips] = useState<Array<ChipType>>([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const setFilterChips = (id: string, value: string) => {
    setSearchFilterChips((prevState) => {
      const isExist = prevState.reduce((s: boolean, item: ChipType) => {
        if (item.id === id && !s) {
          return true;
        }
        return s;
      }, false);
      if (isExist) {
        return prevState.map((item: ChipType) => {
          if (item.id === id) {
            return { id, name: value };
          }
          return item;
        });
      }
      return [...prevState, { id, name: value }];
    });
  };

  const handleDeleteChip = (id: string) => {
    if (id === "keyword") {
      setKeyword("");
    }
    if (id === "dateRange") {
      setFrom(null);
      setTo(null);
    }
    if (id === "locationBase") {
      setLocationFilter(DEFAULTLOCATION);
    }
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));
  };

  const handleClearAll = () => {
    setSearchFilterChips([]);
    setKeyword("");
    setFrom(null);
    setTo(null);
    setLocationFilter(DEFAULTLOCATION);
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
  };

  const handleSelectDate = useCallback((startDate, endDate) => {
    setFrom(startDate);
    setTo(endDate);
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeSearch = (inputSearch: string) => {
    const keyword = inputSearch.trim();
    setKeyword(keyword);
  };

  const handleCreateNewBanner = () => {
    dispatch(clearSelectedHomeTemplate());
    history.push(addBannerLink);
  };

  useEffect(() => {
    const condition: ParamListRequestBannerLoopModel = {};
    if (keyword !== "") {
      condition.keyword = keyword;
      setFilterChips("keyword", keyword);
    } else {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "keyword"));
    }
    if (from && to) {
      condition.startDate = from.toISOString();
      condition.endDate = to.toISOString();

      const newValue = `${format(from, "dd-MM-yyyy")} to ${format(to, "dd-MM-yyyy")}`;
      setFilterChips("dateRange", newValue);
    } else {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "dateRange"));
    }

    if (locationFilter.name !== "All") {
      setFilterChips("locationBase", locationFilter.name);
      condition.countryCode = locationFilter.name;
    } else {
      setSearchFilterChips((prevState) =>
        prevState.filter((result) => result.id !== "locationBase"),
      );
    }
    setFilter && setFilter(condition);
  }, [keyword, from, to, locationFilter, setFilter]);

  useEffect(() => {
    if (keyword !== "") {
      const pathname = location.pathname;
      history.push({ pathname, search: "?page=1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  const chipResult = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "dateRange") {
          return {
            id: chip.id,
            name: `${chip.name.slice(0, 11)} ${t("to") as "to_ship"} ${chip.name.slice(14)}`,
          };
        }
        return {
          id: chip.id,
          name: chip.name,
        };
      }),
    [t, searchFilterChips],
  );

  const handleChangeLocation = (value: string) => {
    if (value) {
      setLocationFilter({
        id: "locationBase",
        name: value,
      });
    }
    if (value !== locationFilter.name) {
      const pathname = location.pathname;
      history.push({ pathname, search: "?page=1" });
    }
  };

  return (
    <div className="w-97/100 m-auto">
      <Navbar isAuth={false} goBackLink="">
        <div className="h-24 w-full rounded-navbar bg-white shadow-navbar mt-5 flex justify-between items-center">
          <div className="flex float-left ">
            <div className="flex-1 h-24 flex">
              <label className="ml-5">
                <span className="float-left medium:text-sm large:text-4xl pt-2.5 pb-1.5">{t`create-date`}</span>
                <div className="pt-9">
                  <InputDatePicker
                    handleSelect={handleSelectDate}
                    className="h-12 float-left wide:w-72 w-60 pl-4 placeholder-italic"
                    defaultFrom={from}
                    defaultTo={to}
                    placeholder={t("all")}
                  />
                </div>
              </label>
            </div>
            <div className="flex-1 h-24 flex">
              <label className="ml-1.5">
                <span className="float-left medium:text-sm large:text-4xl pl-6 pt-2.5 pb-1.5">{t`location-base`}</span>
                <div className="pl-6 pt-9">
                  <SelectCountry2
                    options={[
                      {
                        name: "all_countries",
                        code: "10000",
                        flag: "/assets/images/country/globe.png",
                        value: "All",
                      },
                      ...ListCountryPhoneCode,
                    ]}
                    country={locationFilter.name}
                    onSelect={handleChangeLocation}
                    className="wide:w-72 w-60"
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="flex w-62/100 justify-end seach-component mr-5">
            <Search
              className="w-full search-banner right-0 mr-1.5"
              placeholder={t`search`}
              onSearch={handleOnChangeSearch}
              value={keyword}
            />
            <Button
              variant="text"
              className="bg-orange-light text-base create-button	text-white ml-6 px-6 max-w-xs hover:bg-orange-hover"
              onClick={handleCreateNewBanner}
            >
              {addBannerTitle}
            </Button>
          </div>
        </div>
      </Navbar>
      {chipResult.length > 0 && (
        <ResultFor
          arrayResult={chipResult}
          onDelete={handleDeleteChip}
          onClearAll={handleClearAll}
        />
      )}
    </div>
  );
}
