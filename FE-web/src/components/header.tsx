import { MenuItem, Popover, Popper } from "@material-ui/core";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { MouseEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { ButtonNavagation, ButtonNotification, LeftNavination, Select } from "src/components";
import {
  AccountIcon,
  CartIcon,
  Close,
  FavouriteIcon,
  MyOrderIcon,
  NavBarIcon,
  SearchIcon,
  // SmallLogo,
} from "src/components/svg";
import { LogoConnextIcons } from "src/components/svgs";
import {
  routeAccountBase,
  routeCartUrl,
  routeFavoriteProductBase,
  routeMyOrderUrl,
  routeSigninUrl,
} from "src/constants/routes";
import { CategoryModel } from "src/feature/categories/types";
// import { PopularKeyWord } from "src/feature/searching/searching.slice";

import { RootState } from "src/state/store";
import DialogCustome from "./dialog";
import useLoggedIn from "src/hooks/useLoggedIn";
import { handleChangeField } from "src/feature/shopping-cart/slice";
import { csrfToken } from "src/lib/csrf";
import classnames from "classnames";
import { PopularKeyWord } from "src/feature/searching/searching.type";
import ExpandIcon from "@material-ui/icons/ExpandMore";
import LeftNavinationReport from "./left-navigation/left_navigation_report";

const cookies = new Cookies();
let timeout: number = 0;

interface HeaderProps {
  categories: Array<CategoryModel>;
  popularKeyWords: Array<PopularKeyWord>;
  updateSearchValue: (value: string) => void;
  resetKeySort: () => void;
}

export function Header({
  categories,
  popularKeyWords,
  updateSearchValue,
  resetKeySort,
}: HeaderProps) {
  const { t, lang } = useTranslation("common");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [recentEl, setRecentEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [recentWords, setRecentWords] = useState([]);
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [showLeftMenuMobile, setShowLeftMenuMobile] = useState(false);
  const [showLeftMenuReport, setShowLeftMenuReport] = useState(false);
  const [openModalSignIn, setopenModalSignIn] = useState(false);
  const { isLoggedIn } = useLoggedIn();
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const token = cookies.get("token");

  const productsInCarts = useSelector((state: RootState) => state.cart.listProducts);
  const needToLogin = useSelector((state: RootState) => state.cart.needToLogin);
  const dispatch = useDispatch();

  const handleChangeLanguage = (newLang: string) => () => {
    handleClose();
    if (lang !== newLang) {
      setLanguage(newLang);
    }
  };

  const showMenuSelectLanguage = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccount = () => {
    token ? router.push(routeAccountBase) : router.push(routeSigninUrl);
    setIsShowMore(false);
  };

  const handleCloseRecentKeyWords = () => {
    setRecentEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submitSearch = (e: SyntheticEvent<HTMLFormElement> | null) => {
    e?.preventDefault();
    const value = valueSearch.trim();
    const newQuery: { keyword?: string } = {};
    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.blur();
    }

    if (value === "") {
      return;
    }

    if (value !== "") {
      if (typeof localStorage !== "undefined") {
        const recentWordsRest = [...new Set([value, ...recentWords])].slice(0, 5);
        localStorage.setItem("recentKeyWords", JSON.stringify(recentWordsRest));
      }
      newQuery.keyword = value;
    }
    resetKeySort();
    router.push({
      pathname: "/products-listing",
      query: newQuery,
    });
  };

  const handleRecentWordClick = (keyword: string) => {
    const newQuery = { keyword };
    if (typeof localStorage !== "undefined") {
      const recentWordsRest = [...new Set([keyword, ...recentWords])].slice(0, 5);
      localStorage.setItem("recentKeyWords", JSON.stringify(recentWordsRest));
    }
    timeout = window.setTimeout(() => setIsShowSearch(false), 1000);
    router.push({
      pathname: "/products-listing",
      query: newQuery,
    });
    resetKeySort();
    handleCloseRecentKeyWords();
  };

  const handleClickCart = () => {
    router.push(routeCartUrl);
  };

  const handleClickMyOrder = () => {
    if (!isLoggedIn) {
      setopenModalSignIn(true);
    } else {
      router.push(routeMyOrderUrl);
      setIsShowMore(false);
    }
  };

  useEffect(() => {
    const { keyword, category }: { keyword?: string; category?: string } = router.query;
    if (keyword) {
      setValueSearch(keyword);
    } else {
      setValueSearch("");
    }
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("");
    }
  }, [router.query]);

  useEffect(() => {
    updateSearchValue(valueSearch);
  }, [valueSearch, updateSearchValue]);

  const getRecentKeyWords = () => {
    if (typeof localStorage === "undefined") {
      return [];
    }
    const recentWords = localStorage.getItem("recentKeyWords") || "[]";
    return JSON.parse(recentWords);
  };

  useEffect(() => {
    const recentKeyWords = getRecentKeyWords();
    setRecentWords(recentKeyWords);
  }, [router.query]);

  const optionCategories = useMemo(
    () =>
      categories.map((item: CategoryModel) => ({
        title: item.categoryName,
        value: item.categoryId,
      })),
    [categories],
  );

  // const changeSelectCategory = ({ value }: { title: string; value: string }) => {
  //   setSelectedCategory(value);
  // };

  const redirectFilterCategory = ({ value: category }: { title: string; value: string }) => {
    if (category !== "" && category !== selectedCategory) {
      resetKeySort();
      router.push({
        pathname: "/products-listing",
        query: { category },
      });
    }
  };

  const clearSearchValue = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setValueSearch("");
    handleCloseRecentKeyWords();
  };

  const clearRecentKeyWords = () => {
    setRecentWords([]);
    localStorage.removeItem("recentKeyWords");
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  const defaultValueSelect = useMemo(() => {
    if (optionCategories?.length === 0 || !selectedCategory) {
      return undefined;
    }
    return selectedCategory;
  }, [optionCategories, selectedCategory]);

  const onFocusInput = () => {
    if (searchRef && searchRef.current && (recentWords.length > 0 || popularKeyWords.length > 0)) {
      setRecentEl(searchRef.current);
    }
  };
  const focusInputSearch = () => {
    if (valueSearch !== "") {
      submitSearch(null);
      setIsShowSearch(false);
      return;
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    if (searchInputRef && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };
  const handleGoHome = () => {
    router.push("/");
  };
  const handleFavorite = () => {
    if (!isLoggedIn) {
      setopenModalSignIn(true);
    } else {
      router.push(routeFavoriteProductBase);
      setIsShowMore(false);
    }
  };

  const handleClickNotification = (event: MouseEvent<HTMLElement>) => {
    if (!isLoggedIn) {
      event.stopPropagation();
      setopenModalSignIn(true);
    }
  };
  const handleCloseModal = () => {
    dispatch(handleChangeField({ needToLogin: false }));
    setopenModalSignIn(false);
  };

  const handleConfirmModal = () => {
    handleCloseModal();
    router.push(routeSigninUrl);
  };

  const fomartKeyWords = (keywords: string) => {
    if (keywords.length <= 40) {
      return keywords;
    }
    return `${keywords.slice(0, 40).trim()}...`;
  };
  const handleShowMenuMobile = () => {
    if (!showLeftMenuReport) {
      setShowLeftMenuMobile((prev) => !prev);
    } else if (!showLeftMenuMobile) {
      setShowLeftMenuMobile(false);
      setShowLeftMenuReport(false);
    }
  };
  const handleClickNavBar = () => {
    setIsShowMore((pre) => !pre);
    setShowLeftMenuMobile(false);
    setIsShowSearch(false);
    setShowLeftMenuReport(false);
  };

  useEffect(() => {
    if ((showLeftMenuMobile || showLeftMenuReport) && isShowMore) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [showLeftMenuMobile, isShowMore, showLeftMenuReport]);
  const moreOptions = (
    <div className="sm:flex sm:items-center sm:shadow-none sm:p-0 p-2 grid grid-rows-1 shadow-2xl bg-white">
      <Select
        className="header-select hidden sm:block"
        selectClassName={"border-0 text-black-dark sm:w-36 justify-end select-category"}
        classHolder={"text-base text-black-dark"}
        options={optionCategories}
        placeholder={t`product`}
        defaultValue={defaultValueSelect}
        onChange={redirectFilterCategory}
      />
      <div
        ref={searchRef}
        className="hidden sm:flex sm:mr-5 sm:w-[500px] bg-lighterGray h-10 items-stretch justify-between rounded-lg "
      >
        <div className="relative">
          <form className="pl-2.5" id="search" onSubmit={submitSearch}>
            <input type="hidden" name="CSRFToken" value={csrfToken} />
            <label htmlFor="searchInput" className="hidden">
              search
            </label>
            <input
              id="searchInput"
              ref={searchInputRef}
              placeholder={t`search-by-name-sku`}
              className="sm:w-26 h-10 border-0 focus:outline-none bg-lighterGray "
              value={valueSearch}
              onChange={(e) => setValueSearch(e.target.value)}
              autoComplete={"off"}
              maxLength={200}
              onFocus={onFocusInput}
              onBlur={() => {
                timeout = window.setTimeout(() => handleCloseRecentKeyWords(), 250);
              }}
            />
          </form>
        </div>
        {valueSearch !== "" && (
          <button
            type="button"
            form="clear"
            className="w-6 h-34 rounded-sm min-w-60 max-w-190"
            onClick={clearSearchValue}
          >
            <Close />
          </button>
        )}
        <button
          type="button"
          form="search"
          className="w-10 h-34 rounded-sm min-w-60 max-w-190"
          onClick={focusInputSearch}
        >
          <SearchIcon />
          <p className="hidden">search</p>
        </button>
      </div>
      <ul className="flex items-center text-sm text-center col-span-5 justify-center w-full min-h-[58px]">
        <li
          className={`${lang === "th" ? "mr-4" : "mr-2 sm:mr-6"} cursor-pointer w-1/5 sm:w-auto`}
          onClick={handleAccount}
        >
          <AccountIcon className="mx-auto" />
          {token ? (
            <div className="text-xs">{t`account`}</div>
          ) : (
            <div className="text-xs">{t`sign-in`}</div>
          )}
        </li>
        <li
          className={`${lang === "th" ? "mr-4" : "mr-2 sm:mr-6"} cursor-pointer w-1/5 sm:w-auto`}
          onClick={handleFavorite}
        >
          <FavouriteIcon className="mx-auto" />
          <div className="text-xs	">{t`favourite`}</div>{" "}
        </li>
        <li
          className={`${lang === "th" ? "mr-4" : "mr-2 sm:mr-6"} cursor-pointer w-1/5 sm:w-auto`}
          onClick={handleClickMyOrder}
        >
          <MyOrderIcon className="mx-auto" />
          <div className="text-xs	">{t`my-order`}</div>
        </li>
        <li
          className={`${lang === "th" ? "mr-4" : "mr-2 sm:mr-6"} cursor-pointer w-1/5 sm:w-auto`}
          onClick={handleClickNotification}
        >
          <ButtonNotification />
        </li>
        <li
          className={`${
            lang === "th" ? "mr-4" : "mr-2 sm:mr-6"
          } hidden cursor-pointer sm:flex flex-col items-center relative`}
          onClick={handleClickCart}
        >
          <CartIcon className="max-auto" />
          <div className="text-xs text-left">{t`cart`}</div>

          {productsInCarts.length > 0 && (
            <span className="badge2 absolute flex justify-center items-center rounded-full bg-red-500 text-white">
              {productsInCarts.length}
            </span>
          )}
        </li>
        <li className="w-1/5 sm:w-auto">
          <div
            onClick={showMenuSelectLanguage}
            className="ml-4 w-7 h-7 border-2 rounded-full border-lightestGray hover:cursor-pointer"
          >
            <img
              src={`/assets/images/country/${lang === "th" ? "thailand" : "united-states"}.svg`}
              alt="curentLang"
              className="w-full h-full"
            />
          </div>
        </li>

        <Popover
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={handleChangeLanguage("th")}>
            <img
              src="/assets/images/country/thailand.svg"
              alt="thaiLang"
              className="w-4 h-4 mr-2"
            />
            {t`thai_language`}
          </MenuItem>
          <MenuItem onClick={handleChangeLanguage("en")}>
            <img
              src="/assets/images/country/united-states.svg"
              alt="english"
              className="w-4 h-4 mr-2"
            />
            {t`english`}
          </MenuItem>
        </Popover>
        <Popper
          id="simple-menu"
          className="mt-2 z-50"
          anchorEl={recentEl}
          keepMounted
          open={Boolean(recentEl)}
        >
          <div className="header-search p-4 recent-popular sm:w-[500px] w-screen">
            {recentWords.length > 0 && (
              <div className="recent-keywords mb-2">
                <div className="header-title flex items-start justify-between">
                  <span className="font-medium text-base">{t`recent-keywords`}</span>
                  <button
                    className="font-normal text-sm text-red"
                    onClick={clearRecentKeyWords}
                  >{t`clear-keywords`}</button>
                </div>
                <div className="flex flex-wrap mt-2">
                  {recentWords.map((item: string) => {
                    const onClickRecent = () => handleRecentWordClick(item);
                    return (
                      <button
                        key={item}
                        className="pt-1 pb-1.5 pl-2.5 pr-2 my-1 mr-2 font-medium item text-center"
                        onClick={onClickRecent}
                      >
                        {fomartKeyWords(item)}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            {popularKeyWords.length > 0 && (
              <div className="popular-keywords">
                <div className="header-title flex items-start justify-between">
                  <span className="font-medium text-base">{t`popular-keywords`}</span>
                </div>
                {popularKeyWords.map((item: PopularKeyWord) => {
                  const onClickPopular = () => handleRecentWordClick(item.keyword);
                  return (
                    <button
                      key={item.keyword}
                      className="pt-1 pb-1.5 pl-2.5 pr-2 my-1 mr-2 font-medium item text-center"
                      onClick={onClickPopular}
                    >
                      {fomartKeyWords(item.keyword)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </Popper>
      </ul>
      <div
        className={classnames(
          showLeftMenuMobile ? "sm:hidden block" : "hidden",
          "col-span-5 h-menu-mobile overflow-y-scroll mt-4",
        )}
      >
        <LeftNavination
          handleCloseNavigation={() => {
            setIsShowMore(!isShowMore);
          }}
          handleClickReport={() => {
            setShowLeftMenuReport(true);
            setShowLeftMenuMobile(false);
          }}
          inHeader={true}
          isMobile
        />
      </div>
      <div
        className={classnames(
          showLeftMenuReport ? "sm:hidden block" : "hidden",
          "col-span-5 h-menu-mobile overflow-y-scroll mt-4",
        )}
      >
        <LeftNavinationReport
          hidden={false}
          onClose={() => {
            setIsShowMore(false);
          }}
          isMobile
        />
      </div>
      <div className="flex sm:hidden justify-center col-span-5">
        <div
          className={showLeftMenuMobile || showLeftMenuReport ? "rotate-180" : "rotate-0"}
          onClick={handleShowMenuMobile}
        >
          <ExpandIcon
            className="bg-[#F4F5FA] rounded-1/2"
            color={showLeftMenuMobile || showLeftMenuReport ? "primary" : "inherit"}
          />
        </div>
      </div>
    </div>
  );
  const moreSearch = (
    <div className="sm:items-center sm:shadow-none sm:p-0 p-2 flex flex-col h-screen bg-white">
      <div className="flex">
        <Select
          className="header-select"
          selectClassName={"border-0 text-black-dark sm:w-36 justify-end select-category"}
          classHolder={"text-base text-black-dark"}
          options={optionCategories}
          placeholder={t`product`}
          defaultValue={defaultValueSelect}
          onChange={redirectFilterCategory}
        />
        <div
          ref={searchRef}
          className="flex sm:mr-5 sm:w-[500px] bg-lighterGray h-10 items-stretch justify-between rounded-lg "
        >
          <div className="relative">
            <form className="pl-2.5" id="search" onSubmit={submitSearch}>
              <input type="hidden" name="CSRFToken" value={csrfToken} />
              <label htmlFor="searchInput" className="hidden">
                search
              </label>
              <input
                id="searchInput"
                ref={searchInputRef}
                placeholder={t`search-by-name-sku`}
                className="w-48 sm:w-26 h-10 border-0 focus:outline-none bg-lighterGray placeholder-shown:text-sm"
                value={valueSearch}
                onChange={(e) => setValueSearch(e.target.value)}
                autoComplete={"off"}
                maxLength={200}
              />
            </form>
          </div>
          {valueSearch !== "" && (
            <button
              type="button"
              form="clear"
              className="w-6 h-34 rounded-sm min-w-60 max-w-190"
              onClick={clearSearchValue}
            >
              <Close />
            </button>
          )}
          <button
            type="button"
            form="search"
            className="w-10 h-34 rounded-sm min-w-60 max-w-190"
            onClick={focusInputSearch}
          >
            <SearchIcon />
            <p className="hidden">search</p>
          </button>
        </div>
      </div>
      <div className="header-search p-4 recent-popular sm:w-[500px] w-screen">
        {recentWords.length > 0 && (
          <div className="recent-keywords mb-2">
            <div className="header-title flex items-start justify-between">
              <span className="font-medium text-sm sm:text-base">{t`recent-keywords`}</span>
              <button
                className="font-normal text-[10px] sm:text-sm text-red"
                onClick={clearRecentKeyWords}
              >{t`clear-keywords`}</button>
            </div>
            <div className="flex flex-wrap mt-2">
              {recentWords.map((item: string) => {
                const onClickRecent = () => handleRecentWordClick(item);
                return (
                  <button
                    key={item}
                    className="pt-1 pb-1.5 pl-2.5 pr-2 my-1 mr-2 font-medium text-sm item text-center"
                    onClick={onClickRecent}
                  >
                    {fomartKeyWords(item)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {popularKeyWords.length > 0 && (
          <div className="popular-keywords">
            <div className="header-title flex items-start justify-between">
              <span className="font-medium text-sm sm:text-base">{t`popular-keywords`}</span>
            </div>
            {popularKeyWords.map((item: PopularKeyWord) => {
              const onClickPopular = () => handleRecentWordClick(item.keyword);
              return (
                <button
                  key={item.keyword}
                  className="pt-1 pb-1.5 pl-2.5 pr-2 my-1 mr-2 font-medium text-sm item text-center"
                  onClick={onClickPopular}
                >
                  {fomartKeyWords(item.keyword)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <div>
      <div className="header z-50 fixed top-0 bg-white">
        <div className="header flex">
          <div className="px-[10px] sm:px-0 m-auto w-1216 flex items-center justify-between">
            <div className="flex items-center text-sm">
              <div className="hidden sm:block sm:ml-0 ml-2 icon-nav w-6 h-6">
                <ButtonNavagation />
              </div>
              <div onClick={handleGoHome} className="cursor-pointer">
                <LogoConnextIcons className="mr-4 w-16 sm:w-auto" />
              </div>
              {/* <a className="mr-5 text-base">{t`product`}</a> */}
            </div>
            <div className="sm:block hidden">{moreOptions}</div>
            <div className="sm:hidden block">
              <div
                className="relative"
                id="search"
                onClick={() => {
                  setIsShowMore(false);
                  setIsShowSearch((pre) => !pre);
                }}
              >
                <input type="hidden" name="CSRFToken" value={csrfToken} />
                <label htmlFor="searchInput" className="hidden">
                  search
                </label>
                <input
                  id="searchInput"
                  ref={searchInputRef}
                  placeholder={t`search`}
                  className="w-full h-10 border-0 focus:outline-none bg-lighterGray rounded-lg pl-4"
                  disabled
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm w-[30px]">
                  <SearchIcon />
                  <p className="hidden">search</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div
                className="sm:hidden flex flex-col mx-[20px] cursor-pointer items-center relative"
                onClick={handleClickCart}
              >
                <CartIcon className="max-auto" />
                <div className="text-xs text-left">{t`cart`}</div>

                {productsInCarts.length > 0 && (
                  <span className="badge2 absolute flex justify-center items-center rounded-full bg-red-500 text-white">
                    {productsInCarts.length}
                  </span>
                )}
              </div>

              <div className="sm:hidden flex items-center" onClick={handleClickNavBar}>
                <NavBarIcon fill={isShowMore ? "#FF7500" : "#231f20"} />
              </div>
            </div>
          </div>
        </div>
        {isShowMore && (
          <div className={classnames("sm:hidden", isShowMore ? "block" : "hidden")}>
            {moreOptions}
          </div>
        )}
        {isShowSearch && (
          <div className={classnames("sm:hidden", isShowSearch ? "block" : "hidden")}>
            {moreSearch}
          </div>
        )}
      </div>

      <DialogCustome
        open={openModalSignIn || needToLogin}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmModal}
      >
        <div className="text-center mb-8 mt-6 text-sm">{t`sign_in_to_use`}</div>
      </DialogCustome>
    </div>
  );
}
