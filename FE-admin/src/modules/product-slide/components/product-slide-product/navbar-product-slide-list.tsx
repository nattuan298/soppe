import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";

import { ChipType, GoBack, ResultFor, Search, Select, SelectPriceRange } from "src/components";
import { Navbar } from "src/components/navbar/index";
import { ParamInventoryProductModel } from "src/types/params-list-request.model";
import { CategoryModel } from "src/types/category.model";
import { getMaxPriceAction } from "src/store/max-price.action";

const MIN = 0;
const MAX = 1;
const defaultRange = { start: MIN, end: MAX };

interface NavbarProductSlideListProps {
  setFilter?: (filter: object) => void;
}
interface ParamsType {
  id: string;
}

export function NavbarProductSlideList({ setFilter }: NavbarProductSlideListProps) {
  const { t } = useTranslation("common");
  const { id } = useParams<ParamsType>();
  const [range, setRange] = useState(defaultRange);
  const [rangeFilter, setRangeFilter] = useState(defaultRange);

  const [category, setCategory] = useState<string>("all-category");
  const [keyword, setKeyword] = useState<string>("");
  const [searchFilterChips, setSearchFilterChips] = useState<Array<ChipType>>([]);
  const [maxPrice, setMaxPrice] = useState<number>(MAX);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const { internalProductSection } = useSelector(
    (state: RootState) => state.internalProductSection,
  );
  const { categoryData } = useSelector((state: RootState) => state.categories);
  const { maxprice } = useSelector((state: RootState) => state.maxPriceLocation);
  const countryCode = internalProductSection.countryCode;

  useEffect(() => {
    if (countryCode) {
      dispatch(getMaxPriceAction({ country: countryCode, type: "Product" }));
    }
  }, [countryCode]);

  useEffect(() => {
    const { maxPrice } = maxprice;
    setMaxPrice(maxPrice);
    setRange({ start: MIN, end: maxPrice });
  }, [maxprice.maxPrice]);

  const goBackUrl = useMemo(
    () =>
      `/admin-dashboard/appearance-management/section-product-slide-management/slide-list/product-list/${id}`,
    [id],
  );
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
    if (id === "category") {
      setCategory("all-category");
    }
    if (id === "keyword") {
      setKeyword("");
    }
    if (id === "range") {
      setRange({ start: MIN, end: maxPrice });
      setRangeFilter({ start: MIN, end: maxPrice });
    }
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));
  };

  const handleClearAll = () => {
    setSearchFilterChips([]);
    setKeyword("");
    setCategory("all-category");
    setRange({ start: MIN, end: maxPrice });
    setRangeFilter({ start: MIN, end: maxPrice });
    const pathname = location.pathname;
    history.push({ pathname, search: "?page=1" });
  };

  const handleOnChangeSearch = (inputSearch: string) => {
    const keyword = inputSearch.trim();
    if (keyword === "") {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "keyword"));
    }
    setKeyword(keyword);
  };

  const handleFilterCategory = (value: string | null) => {
    if (value === "all-category") {
      setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "category"));
    }
    setCategory(value || "all-category");
  };

  const handleChangePrice = () => {
    setRangeFilter(range);
  };

  const optionCategories = useMemo(() => {
    const categories = categoryData.map((item: CategoryModel) => ({
      title: item.categoryName,
      value: item.categoryId,
    }));
    return [{ title: t("all-categories"), value: "all-category" }, ...categories];
  }, [categoryData, t]);

  useEffect(() => {
    const condition: ParamInventoryProductModel = {};
    const { start, end } = rangeFilter;
    if (category !== "all-category") {
      condition.category = category;
      const { title } = optionCategories.find(({ value }) => value === category) || {
        title: "All",
      };
      setFilterChips("category", title);
    }
    if (keyword !== "") {
      condition.keyword = keyword;
      setFilterChips("keyword", keyword);
    }
    if (start !== MIN || end !== MAX) {
      condition.minPrice = start;
      condition.maxPrice = end;
      setFilterChips(
        "range",
        `${Intl.NumberFormat().format(start)}-${Intl.NumberFormat().format(end)}`,
      );
    }
    setFilter && setFilter(condition);
  }, [category, keyword, optionCategories, setFilter, rangeFilter]);

  useEffect(() => {
    const { start, end } = rangeFilter;
    if (category !== "all-category" || keyword !== "" || start !== MIN || end !== MAX) {
      const pathname = location.pathname;
      history.push({ pathname, search: "?page=1" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, keyword, rangeFilter]);

  return (
    <div className="w-97/100 m-auto">
      <Navbar isAuth={false} goBackLink="">
        <GoBack
          url={goBackUrl}
          className="h-24 w-full rounded-navbar bg-white shadow-navbar mt-5 flex justify-between items-center"
        >
          <div className="flex float-left flex-grow">
            <div className="flex-1 h-24 flex justify-end mx-7.5">
              <label>
                <span className="float-left medium:text-sm large:text-4xl wide:pl-5 pt-2.5 pb-1.5">
                  {t("all-categories")}
                </span>
                <div className="wide:pl-5">
                  <Select
                    className="float-left w-72 h-12 rounded-md banner-filter"
                    defaultValue={category}
                    options={optionCategories}
                    placeholder={t("all-categories")}
                    onChange={handleFilterCategory}
                  />
                </div>
              </label>
              <label>
                <span className="float-left medium:text-sm large:text-4xl pl-5 pt-2.5 pb-1.5">{t`price-range`}</span>
                <div className="pl-5">
                  <SelectPriceRange
                    className="dropdown"
                    min={MIN}
                    max={maxPrice}
                    range={range}
                    setRange={setRange}
                    handleChangePrice={handleChangePrice}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-end seach-component">
            <Search
              className="w-full search-banner right-0 mr-1.5"
              placeholder={t`search`}
              onSearch={handleOnChangeSearch}
              value={keyword}
            />
          </div>
        </GoBack>
      </Navbar>
      {searchFilterChips.length > 0 && (
        <ResultFor
          arrayResult={searchFilterChips}
          onDelete={handleDeleteChip}
          onClearAll={handleClearAll}
        />
      )}
    </div>
  );
}
