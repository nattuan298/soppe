import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { format } from "date-fns";

import { Button, ChipType, InputDatePicker, ResultFor, Search, Select } from "src/components";
import { SelectCountry2 } from "src/components/select-country-2";
import { Navbar } from "src/components/navbar/index";
import { ParamListRequestBannerLoopModel } from "src/types/params-list-request.model";
import { clearSelectBannerLoop } from "src/store/internal-selected-banner-loop.slice";
import { ListCountryPhoneCode } from "src/constants/country_phone_code";

interface NavbarBannerListTypeProps {
  setFilter?: (filter: object) => void;
}

const DEFAULTLOCATION = {
  id: "locationBase",
  name: "All",
};

export function NavbarBannerList({ setFilter }: NavbarBannerListTypeProps) {
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
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChangeSearch = (inputSearch: string) => {
    const keyword = inputSearch.trim();
    setKeyword(keyword);
  };

  const handleChangeStatus = (value: any) => {
    setStatus(value);
  };

  const handleCreateNewBanner = () => {
    dispatch(clearSelectBannerLoop());
    history.push(
      "/admin-dashboard/appearance-management/home-banner-management/banner-loop-list/create-new-banner-loop",
    );
  };

  useEffect(() => {
    const condition: ParamListRequestBannerLoopModel = {};
    if (status !== "1") {
      condition.status = status === "2" ? "ACTIVE" : "INACTIVE";
      setFilterChips("status", condition.status);
    } else {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "status"));
    }
    if (keyword !== "") {
      condition.keyword = keyword;
      setFilterChips("keyword", keyword);
    } else {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "keyword"));
    }
    if (from && to) {
      const now = new Date(to.getFullYear(), to.getMonth(), to.getDate(), 23, 59, 59);
      const past = new Date(from.getFullYear(), from.getMonth(), from.getDate(), 0, 0, 0);
      condition.startDate = past.toISOString();
      condition.endDate = now.toISOString();

      const newValue = `${format(from, "dd-MM-yyyy")} ${t("to") as "to_ship"} ${format(
        to,
        "dd-MM-yyyy",
      )}`;
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
                    className="float-left wide:w-72 w-40 h-12 rounded-md banner-filter"
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
             Create New Banner
            </Button>
          </div>
        </div>
      </Navbar>

    </div>
  );
}
