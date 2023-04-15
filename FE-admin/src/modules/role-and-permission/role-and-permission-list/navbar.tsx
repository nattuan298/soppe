import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { Button, ChipType, ResultFor, Search, Select } from "src/components";
import { Navbar } from "src/components/navbar/index";
import { routesCreateRoleAndPermission } from "src/constants/routes";

interface NavbarRolePermissionProps {
  setFilter?: (filter: object) => void;
}

export function NavbarRolePermission({ setFilter }: NavbarRolePermissionProps) {
  const { t } = useTranslation("common");
  const [statusFilter, setStatusFilter] = useState({
    id: "",
    name: "",
  });
  const [search, setSearch] = useState({
    id: "",
    name: "",
  });
  const rootOptions = [
    {
      title: "active",
      value: "Active",
    },
    {
      title: "inactive",
      value: "Inactive",
    },
  ];

  const statusOptions = rootOptions.map(({ value, title }) => ({
    value,
    title: t(title as "to_pay"),
  }));

  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchFilterChips, setSearchFilterChips] = useState<ChipType[]>([]);
  const history = useHistory();
  const savedSearchHistory = localStorage.getItem("roleSearchHistory");

  useEffect(() => {
    const filterOptions = {
      status: statusFilter.name,
      keyword: search.name,
    };
    setFilter && setFilter(filterOptions);
  }, [statusFilter.name, search.name, setFilter]);
  useEffect(() => {
    if (savedSearchHistory) {
      setSearchHistory(JSON.parse(savedSearchHistory));
    }
  }, [savedSearchHistory]);
  useEffect(() => {
    if (searchHistory.length > 0) {
      localStorage.setItem("roleSearchHistory", JSON.stringify(searchHistory));
    }
  }, [searchHistory]);

  function handleSelectStatusFilter(status: string | null) {
    if (status) {
      const { title } = rootOptions.find(({ value }) => value === status) || { title: "" };

      setStatusFilter({
        id: "status",
        name: status,
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "status") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "status",
            name: title,
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
    }
  }
  function handleSearch(search: string) {
    const regex = /^ *$/;
    if (search && !regex.test(search)) {
      setSearch({
        id: "search",
        name: search.trim(),
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "search") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "search",
            name: search.trim(),
          },
        ];
      });
      setSearchHistory((prevState) => [...new Set([...prevState, search])]);
      history.push({
        search: "?page=1",
      });
    }
  }
  function handleDeleteSearchFilter(id: string) {
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));
    if (id === "status") {
      setStatusFilter({
        id: "",
        name: "",
      });
    }
    if (id === "search") {
      setSearch({
        id: "",
        name: "",
      });
    }
  }
  function handleClearAll() {
    setSearchFilterChips([]);
    setSearch({
      id: "",
      name: "",
    });
    setStatusFilter({
      id: "",
      name: "",
    });
  }

  const handleCreateNewRole = () => {
    history.push(routesCreateRoleAndPermission);
  };

  const chipResult = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "status") {
          return {
            id: chip.id,
            name: t(chip.name as "to_ship"),
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
    <>
      <Navbar isAuth={false} goBackLink="">
        <div className="h-24 w-97/100 m-auto rounded-navbar bg-white shadow-navbar mt-5 flex justify-between items-center">
          <div className="flex float-left ">
            <div className="flex-1 h-24 flex">
              <label>
                <span className="float-left medium:text-sm large:text-4xl pl-5 pt-2.5 pb-1.5">{t`status`}</span>
                <div className="pl-5">
                  <Select
                    className="float-left w-72 h-12 rounded-md banner-filter"
                    placeholder={t("all-statuses")}
                    options={statusOptions}
                    onChange={handleSelectStatusFilter}
                    defaultValue={statusFilter.name}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="flex mx-5">
            <Search
              className="w-343px"
              placeholder={t`search`}
              onSearch={handleSearch}
              onSelectSearchHistory={handleSearch}
              value={search.name}
              searchHistory={searchHistory}
            />
            <Button
              variant="text"
              className="bg-orange-light text-white px-6 w-72 hover:bg-orange-hover"
              onClick={handleCreateNewRole}
            >
              {t("create-new-role")}
            </Button>
          </div>
        </div>
      </Navbar>
      {chipResult.length > 0 && (
        <div className="w-97/100 m-auto">
          <ResultFor
            arrayResult={chipResult}
            onDelete={handleDeleteSearchFilter}
            onClearAll={handleClearAll}
          />
        </div>
      )}
    </>
  );
}
