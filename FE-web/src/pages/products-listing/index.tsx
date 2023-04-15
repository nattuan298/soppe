import classnames from "classnames";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { FilterBlack, PageLayout, Products, Select } from "src/components";
import NoDataIcon from "src/components/svgs/no-data";
import { apiRoute } from "src/constants/apiRoutes";
import { notifyToast } from "src/constants/toast";
import { updateKeySort } from "src/feature/searching/searching.slice";
import { useLocationBase } from "src/hooks";
import axios from "src/lib/client/request";
import paramsSerializer from "src/lib/paramsSerializer";
import { RootState } from "src/state/store";
import { getLocationBaseFromCookieSever } from "src/utils";
import { GetServerSideProps } from "next";
import { ProductsType } from "types/api-response-type";
import FilterNavination from "./filter-nav";
import { LoadingIndicator } from "src/components/animation/loading-indicator";
import cls from "./styles.module.css";
import useGetScreenWidth from "../../hooks/useGetScreenWidth";
import { isString } from "lodash";
import { setTimeout } from "timers";

const MIN = 0;

interface ParamUrlType {
  page: number;
  pageSize: number;
  countryCode?: string;
  keySort: string;
  categoryId?: string;
  keyword?: string;
  minPrice?: string;
  maxPrice?: string;
}

const defaultParams = {
  pageSize: 12,
};

interface ProductsListingType {
  maxRangePrice: number;
}

export default function ProductsListing({ maxRangePrice }: ProductsListingType) {
  const [productsPage, setProductPage] = useState<ProductsType>([]);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);
  const [range, setRange] = useState({ start: MIN, end: maxRangePrice });
  const [loading, setLoading] = useState(false);
  const [lastInput, setLastInput] = useState<string>("");
  const { locationBase } = useLocationBase();

  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.categoriesState.categories);
  const { searchValue, keySort } = useSelector((state: RootState) => state.searchValue);
  const { userInfor } = useSelector((state: RootState) => state.user);
  const { memberId } = userInfor || {};
  const [isShowFilter, setIsShowFilter] = useState(false);
  const screen = useGetScreenWidth();
  const getlistProduct = useCallback(
    async (config: ParamUrlType) => {
      const params = paramsSerializer(config);
      const paramsURL =
        params !== "" ? `?${params}` : "";
      try {
        setLoading(true);
        const response = await axios.get(`${apiRoute.products.searchListProduct}${paramsURL}`);
        setLoading(false);
        return response.data;
      } catch (err) {
        setLoading(false);
      }
    },
    [locationBase],
  );

  useEffect(() => {
    const featchData = async () => {
      const configParam = {
        page: 1,
        minPrice: "" + MIN,
        maxPrice: "" + maxRangePrice,
        ...defaultParams,
        keySort,
        ...router.query,
      };
      const response = await getlistProduct(configParam);
      setProductPage(response.data);
      setTotal(response.total);
      setPage(1);
    };
    if (router.isReady) {
      setProductPage([]);
      featchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, keySort, router.isReady, memberId, getlistProduct]);

  useEffect(() => {
    const {
      categoryId = "all-category",
      minPrice = MIN,
      maxPrice = maxRangePrice,
    }: { categoryId?: string; minPrice?: number; maxPrice?: number } = router.query;

    setCategory(categoryId);
    if (minPrice <= maxRangePrice && maxPrice <= maxRangePrice) {
      setRange({ start: minPrice, end: maxPrice });
    }
  }, [router.query, maxRangePrice]);

  const searchResult = useMemo(() => {
    const { query } = router;
    if (!query?.keyword) {
      return null;
    }
    return (
      <div className={cls.searchResult}>
        {`${total} ${t`search_result`}${total <= 1 ? "" : "s"} ${t`for_keyword`} "${
          query.keyword
        }"`}
      </div>
    );
  }, [router, t, total]);

  const hasMore = useMemo(() => productsPage && productsPage.length < total, [productsPage, total]);

  const getMoreProducts = async () => {
    if (productsPage?.length === 0) {
      return;
    }
    const { query } = router;
    const configParam = {
      page: page + 1,
      ...defaultParams,
      keySort,
      minPrice: "" + MIN,
      maxPrice: "" + maxRangePrice,
      ...query,
      memberId,
    };
    const response = await getlistProduct(configParam);
    const products = response.data;
    setProductPage((preProducts) => [...preProducts, ...products]);
    setPage((page) => page + 1);
  };

  const clearAllFilter = () => {
    setCategory("all-category");
    setRange({ start: MIN, end: maxRangePrice });
  };

  const onChangeKeySort = (keySort: { title: string; value: string }) => {
    if (["MIN-MAX", "MAX-MIN", "A-Z", "Z-A"].includes(keySort.value)) {
      dispatch(updateKeySort(keySort.value));
    }
  };

  const applyFilter = (categoryParameter?: string) => {
    const { start, end } = range;
    const { minPrice = MIN, maxPrice = maxRangePrice } = router.query;
    const newQuery = { ...router.query };
    if (end > maxRangePrice) {
      notifyToast(
        "error",
        `${t("price_cant_be_higher_than")} ${new Intl.NumberFormat("en-US").format(maxRangePrice)}`,
      );
      setRange({ start, end: maxRangePrice });
      return;
    }
    if (start > end) {
      notifyToast("error", "please_input_the_proper_price_range", t);
      if (lastInput === "start") {
        setRange({ start: MIN, end });
      } else if (lastInput === "end") {
        setRange({ start, end: maxRangePrice });
      } else {
        setRange({ start: end, end: start });
      }
      return;
    }
    if (searchValue !== "") {
      newQuery.keyword = searchValue;
    } else {
      delete newQuery.keyword;
    }
    if (isString(categoryParameter) && categoryParameter !== category) {
      newQuery.categoryId = categoryParameter;
    } else if (category && category !== "all-category") {
      newQuery.categoryId = category;
    } else {
      delete newQuery.categoryId;
    }
    if (minPrice !== start || maxPrice !== end) {
      if (start > MIN) {
        newQuery.minPrice = "" + start;
      } else if (start === MIN) {
        delete newQuery.minPrice;
      }

      if (end < maxRangePrice) {
        newQuery.maxPrice = "" + end;
      } else if (end === maxRangePrice) {
        delete newQuery.maxPrice;
      }
    }
    dispatch(updateKeySort(""));
    router.push({ pathname: "/products-listing", query: newQuery });
    setTimeout(() => {
      setIsShowFilter(false);
    }, 1000);
  };


  return (
    <div className="w-full">
      <main className="w-full flex flex-wrap justify-center">
        {isShowFilter && screen !== "Desktop" ? (
          <div className="w-screen px-4">
            <FilterNavination
              categories={categories}
              category={category}
              maxRangePrice={100000000}
              setCategory={setCategory}
              range={range}
              setRange={setRange}
              clearAllFilter={clearAllFilter}
              applyFilter={applyFilter}
              setLastInput={setLastInput}
              isMobile
              onCloseFilter={() => setIsShowFilter(false)}
            />
          </div>
        ) : (
          <PageLayout className="mx-auto sm:w-1216 sm:my-8 flex flex-col sm:flex-row">
            <div className="block sm:hidden">
              <div className="grid grid-cols-1 mt-[20px]">
                <div id="nav" className="overflow-auto whitespace-nowrap col-span-1 ">
                  <div className="flex w-max items-center">
                    <div
                      id={category === "all-category" ? "active" : "inactive"}
                      key={0}
                      className={`cursor-pointer w-[14px] h-[20px] inline-block items-center text-center ml-[16px] mr-5 ${
                        category === "all-category" ? "border-b text-orange border-orange" : ""
                      }`}
                      onClick={() => {
                        setCategory("all-category");
                        applyFilter("all-category");
                      }}
                    >
                      <div className="w-full h-full text-xs"> {t`all`}</div>
                    </div>
                    {categories.map((item) => (
                      <div
                        id={category === item._id ? "active" : "inactive"}
                        key={item._id}
                        className={`cursor-pointer w-[71px] h-[20px] inline-block mx-2 ${
                          category === item._id ? "border-b border-orange pb-1" : ""
                        }`}
                        onClick={() => {
                          setCategory(item._id);
                          applyFilter(item._id);
                        }}
                      >

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <FilterNavination
              categories={categories}
              category={category}
              maxRangePrice={100000000}
              setCategory={setCategory}
              range={range}
              setRange={setRange}
              clearAllFilter={clearAllFilter}
              applyFilter={applyFilter}
              setLastInput={setLastInput}
              isMobile={false}
            />
            <div className="w-full py-6 px-[13px] sm:py-0 sm:px-0">
              <div className="w-full flex flex-row-reverse justify-between mb-0 sm:mb-6">


                {searchResult && <div>{searchResult}</div>}
              </div>
              {loading && !productsPage?.length && (
                <div className="w-full flex justify-center">
                  <LoadingIndicator size={36} className={cls.LoadingIndicator} />
                </div>
              )}
              {!productsPage?.length && !loading && (
                <div className="mt-12 mb-5 flex flex-col justify-center items-center">
                  <div>
                    <NoDataIcon />
                  </div>
                  <span className="mt-4">{t`no_data`}</span>
                </div>
              )}
              <div>
                <InfiniteScroll
                  dataLength={productsPage?.length || 0}
                  next={getMoreProducts}
                  hasMore={hasMore}
                  loader={null}
                  className={cls.InfiniteScroll}
                >
                  <Products products={productsPage} type="listing" />
                </InfiniteScroll>
              </div>
            </div>
          </PageLayout>
        )}
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie;

  const maxRangePrice = 100000000;

  return {
    props: {
      maxRangePrice,
    },
  };
};
