import { MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

import { Button, ChipType, InputDatePicker, ResultFor, Search, Select } from "src/components";
import { Navbar } from "src/components/navbar/index";
import { ParamListRequestPushNotificationModel } from "src/types/params-list-request.model";
import { routeCreateNewPushNotification } from "src/constants/routes";
import { clearSelectedPushNotification } from "src/store/notification.slice";
import { textChangeLanguage } from "src/lib/format";

interface NavbarBannerListTypeProps {
  setFilter?: (filter: object) => void;
  addNewPushNotify: string;
}

type OptionType = {
  title: string;
  value: string | number | boolean;
};

export default function NotificationListNavbar({ setFilter }: NavbarBannerListTypeProps) {
  const { t } = useTranslation("common");

  // const date = new Date();
  // const now = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
  // const past = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate(), 0, 0, 0);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  const [target, setTarget] = useState<string>("");
  // const [chanel, setChanel] = useState<Array<string>>([]);
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
    if (id === "target") {
      setTarget("");
    }
    // if (["Message", "Email", "Mobile App", "Web App"].includes(id)) {
    //   setChanel((current) => current.filter((item) => item !== id));
    // }
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));
  };

  const handleClearAll = () => {
    setSearchFilterChips([]);
    setKeyword("");
    setTarget("");
    // setChanel([]);
    setFrom(null);
    setTo(null);
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

  const handleChangeTarget = (value: any) => {
    setTarget(value);
  };

  // const handleChangeChanel = (values: Array<OptionType>) => {
  //   const channels = values.map(({ value }) => value) as Array<string>;
  //   const deletedChannels = chanel.filter((item) => !channels.includes(item));

  //   channels.forEach((el) => setFilterChips(el, el));
  //   deletedChannels.forEach((el) => handleDeleteChip(el));

  //   setChanel(channels);
  // };

  useEffect(() => {
    const condition: ParamListRequestPushNotificationModel = {};
    if (keyword !== "") {
      condition.keyword = keyword;
      setFilterChips("keyword", keyword);
    } else {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "keyword"));
    }

    condition.target = target;

    if (target !== "") {
      setFilterChips("target", target);
    } else {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "target"));
    }

    if (from && to) {
      condition.startDate = from.toISOString();
      condition.endDate = to.toISOString();

      const newValue = `${format(from, "dd-MM-yyyy")} to ${format(to, "dd-MM-yyyy")}`;
      setFilterChips("dateRange", newValue);
    } else {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "dateRange"));
    }
    setFilter && setFilter(condition);
  }, [keyword, target, from, to, setFilter]);

  useEffect(() => {
    if (target !== "1" || keyword !== "") {
      const pathname = location.pathname;
      history.push({ pathname, search: "?page=1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, keyword]);

  const handleCreateNewPushNotification = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(clearSelectedPushNotification());
    history.push(routeCreateNewPushNotification);
  };

  const chipResult = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "target") {
          return {
            id: chip.id,
            name: t(textChangeLanguage(chip.name) as "to_ship"),
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

  return (
    <div className="w-97/100 m-auto nav-notification-management">
      <Navbar>
        <div className="h-24 w-full rounded-navbar bg-white shadow-navbar mt-5 flex justify-between items-center">
          <div className="flex float-left ">
            <div className="flex-1 h-24 flex">
              <label>
                <span className="float-left medium:text-sm pl-5 pt-2.5 pb-1.5 lable-notification">{t`target`}</span>
                <div className="pl-5">
                  <Select
                    className="float-left wide:w-72 w-56 h-50 rounded-md lable-notification"
                    options={[
                      { title: t`users`, value: "Users" },
                      { title: t`internal_users`, value: "Internal Users" },
                    ]}
                    placeholder={t`all-targets`}
                    onChange={handleChangeTarget}
                    defaultValue={target}
                  />
                </div>
              </label>
              {/* <label className="ml-1.5">
                <span className="float-left medium:text-sm large:text-4xl wide:pl-6 pl-3 pt-2.5 pb-1.5">{t`channel`}</span>
                <div className="wide:pl-5 pl-2">
                  <MultipleSelect
                    className="float-left wide:w-72 w-56 h-12 rounded-md"
                    placeholder={t`select-publish-channel`}
                    options={[
                      { title: t`web_app`, value: "Web App" },
                      { title: t`mobile_app`, value: "Mobile App" },
                      { title: t`email`, value: "Email" },
                      { title: t`message`, value: "Message" },
                    ]}
                    selectedValues={chanel}
                    onChange={handleChangeChanel}
                  />
                </div>
              </label> */}
              <label className="ml-1.5">
                <span className="float-left medium:text-sm wide:pl-6 pl-3 pt-2.5 pb-1.5 lable-notification">{t`publish-date-range`}</span>
                <div className="wide:pl-6 pl-3 pt-9">
                  <InputDatePicker
                    handleSelect={handleSelectDate}
                    className="h-50 float-left wide:w-72 w-58 pl-4 placeholder-italic"
                    defaultFrom={from}
                    defaultTo={to}
                    placeholder={t("all")}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="flex wide:w-5/12 w-1/2 h-[50px] justify-end seach-component mr-5">
            <Search
              className="wide:w-84 w-72 wide:mr-1.5 mr-0 right-0 h-50"
              placeholder={t`search`}
              onSearch={handleOnChangeSearch}
              value={keyword}
            />
            <Button
              variant="text"
              className="bg-orange-light text-base h-[50px]	text-white wide:ml-6 ml-3 px-6 max-w-xs hover:bg-orange-hover"
              onClick={handleCreateNewPushNotification}
            >
              {t`create-new-push-notification`}
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
