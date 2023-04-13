import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Select, SelectPriceRange } from "src/components";
import { Navbar } from "src/components/navbar/index";
import { Product } from "../../types";

interface NavbarProductListProps {
  productData: Product[];
  loading: boolean;
  setFilter?: (filter: object) => void;
}

type M = { title: string; value: string };

const MIN = 0;
const MAX = 100000;

export function NavbarProductList({ productData, loading, setFilter }: NavbarProductListProps) {
  const { t } = useTranslation("common");
  const [range, setRange] = useState({ start: MIN, end: MAX });
  const [category, setCategory] = useState<string>("1");

  let options: M[] = [];
  for (let i = 0; i < productData.length; i++) {
    options = [
      ...options,
      { title: productData[i].productCode, value: productData[i].productCode },
    ];
  }

  const handleOnChangeSearch = (inputSearch: string) => {};

  const handleChangeCategory = (value: any) => {
    setCategory(value);
  };

  useEffect(() => {});

  return (
    <Navbar isAuth={false} goBackLink="">
      <div className=" w-full bg-white shadow-navbar flex justify-between items-center search-filter">
        <div className="filter-group flex mb-3.5 mt-3">
          <div className="filter mr-7.5">
            <p className="float-left medium:text-sm large:text-4xl pl-5 pb-1.5">{t`category`}</p>
            <div className="pl-5 select-dropdown">
              <Select
                className="dropdown w-72"
                options={options}
                defaultValue={category}
                placeholder={t("all-categories")}
                onChange={handleChangeCategory}
              />
            </div>
          </div>
          <div className="filter">
            <label className="">
              <p className="float-left medium:text-sm large:text-4xl pb-1.5">{t`price-range`}</p>
              <div className="">
                {/* <SelectPriceRange
                  className="dropdown"
                  min={MIN}
                  max={MAX}
                  range={range}
                  setRange={setRange}
                /> */}
              </div>
            </label>
          </div>
        </div>

        <div>
          <Search placeholder={t`search`} onSearch={handleOnChangeSearch} />
        </div>
      </div>
    </Navbar>
  );
}
