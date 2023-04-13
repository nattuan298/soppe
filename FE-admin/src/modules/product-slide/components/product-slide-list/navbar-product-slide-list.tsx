import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

import { Button, ChipType, InputDatePicker, ResultFor, Search, Select } from "src/components";
import { SelectCountry2 } from "src/components/select-country-2";
import { Navbar } from "src/components/navbar/index";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { clearSelectedProductSectionLoop } from "src/store/internal-product-section-loop.slice";
import { routeSectionProductCreateSlide } from "src/constants/routes";
import { ListCountryPhoneCode } from "src/constants/country_phone_code";

const DEFAULTLOCATION = {
  id: "locationBase",
  name: "All",
};

interface NavbarProductSlideListProps {
  setFilter?: (filter: object) => void;
}

export function NavbarProductSlideList({ setFilter }: NavbarProductSlideListProps) {
  const { t } = useTranslation("common");

  const date = new Date();
  const now = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  const past = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate(), 0, 0, 0);
  const [from, setFrom] = useState<Date | null>(past);
  const [to, setTo] = useState<Date | null>(now);

  const [status, setStatus] = useState<string>("1");
  const [keyword, setKeyword] = useState<string>("");
  const [searchFilterChips, setSearchFilterChips] = useState<Array<ChipType>>([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [locationFilter, setLocationFilter] = useState(DEFAULTLOCATION);

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
    if (id === "status") {
      setStatus("1");
    }
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
    setStatus("1");
    setFrom(null);
    setTo(null);
    setLocationFilter(DEFAULTLOCATION);
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
  };

  const handleSelectDate = useCallback((startDate, endDate) => {
    setFrom(startDate);
    setTo(endDate);
    if (!startDate || !endDate) {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "dateRange"));
    }
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeSearch = (inputSearch: string) => {
    const keyword = inputSearch.trim();
    if (keyword === "") {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "keyword"));
    }
    setKeyword(keyword);
  };

  const handleChangeStatus = (value: any) => {
    if (value === "1") {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "status"));
    }
    setStatus(value);
  };

  const handleCreateNewBanner = () => {
    dispatch(clearSelectedProductSectionLoop());
    history.push(routeSectionProductCreateSlide);
  };

  useEffect(() => {
    const condition: ParamListRequestBannerLoopModel = {};
    if (status !== "1") {
      condition.status = status === "2" ? "Active" : "Inactive";
      setFilterChips("status", condition.status);
    }
    if (keyword !== "") {
      condition.keyword = keyword;
      setFilterChips("keyword", keyword);
    }
    if (from && to) {
      condition.startDate = from.toISOString();
      condition.endDate = to.toISOString();

      const newValue = `${format(from, "dd-MM-yyyy")} to ${format(to, "dd-MM-yyyy")}`;
      setFilterChips("dateRange", newValue);
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
  }, [status, keyword, from, to, locationFilter, setFilter]);

  useEffect(() => {
    if (status !== "1" || keyword !== "") {
      const pathname = location.pathname;
      history.push({ pathname, search: "?page=1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, keyword]);

  const chipResult = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "status") {
          return {
            id: chip.id,
            name: t(chip.name.toLocaleLowerCase() as "to_ship"),
          };
        } else if (chip.id === "dateRange") {
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
              <label>
                <span className="float-left medium:text-sm large:text-4xl pl-5 pt-2.5 pb-1.5">{t`status`}</span>
                <div className="pl-5">
                  <Select
                    className="float-left wide:w-72 w-48 h-12 rounded-md banner-filter"
                    options={[
                      { title: t`all-statuses`, value: "1" },
                      { title: t`active`, value: "2" },
                      { title: t`inactive`, value: "3" },
                    ]}
                    defaultValue={status}
                    onChange={handleChangeStatus}
                  />
                </div>
              </label>
              <label className="ml-1.5">
                <span className="float-left medium:text-sm large:text-4xl wide:pl-6 pl-3 pt-2.5 pb-1.5">{t`create-date`}</span>
                <div className="wide:pl-6 pl-3 pt-9">
                  <InputDatePicker
                    handleSelect={handleSelectDate}
                    className="h-12 float-left wide:w-72 w-60 pl-4 placeholder-italic"
                    defaultFrom={from}
                    defaultTo={to}
                    placeholder={t`all`}
                  />
                </div>
              </label>
              <label className="ml-1.5">
                <span className="float-left medium:text-sm large:text-4xl wide:pl-6 pl-3 pt-2.5 pb-1.5">{t`location-base`}</span>
                <div className="wide:pl-6 pl-3 pt-9">
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
                    className="wide:w-72 w-48"
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
              className="bg-orange-light text-base	text-white wide:ml-6 ml-3 wide:px-6 px-2 max-w-xs hover:bg-orange-hover"
              onClick={handleCreateNewBanner}
            >
              {t`create-new-product-slide`}
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
