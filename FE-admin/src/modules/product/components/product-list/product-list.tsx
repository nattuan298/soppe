/* eslint-disable indent */
/* eslint-disable jsx-a11y/anchor-has-content */
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActionButton,
  Button,
  ButtonLink,
  ChipType,
  CollapsibleBodyRow,
  CollapsibleHeadRow,
  Pagination,
  ResultFor,
  Search,
  Select,
  SelectPriceRange,
  Spinner,
  Status,
} from "src/components";
import "./styles.css";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import StarIcon from "src/components/icons/StarIcon";
import NoDataIcon from "src/components/icons/noDataIcon";
import { PreviewProduct } from "../../types";
import { ProductModel } from "src/types/inventory-management.model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/store";
import { useHistory, useLocation } from "react-router-dom";
import { FormatNumber } from "src/lib/format-number";
import { ImageError } from "src/components/image-error/image-error";
import { IconPlay, NewCollectionIcon } from "src/components/icons";
import { get, orderBy } from "lodash";
import { CategoryModel } from "src/types/category.model";
import { useDebounceValue } from "src/hooks";
import { getProductAction } from "src/store/inventory-management.action";
import { getCategoryAction } from "src/store/category.ation";
import { getMaxPriceAction } from "src/store/max-price.action";
import { routeInventoryManagementProductCreateBase } from "../../../../constants/routes";

interface RatingComponentProps {
  rating: number;
  countApprovedReviews: number;
}
interface ImageInventoryProps {
  product: ProductModel;
}

function RatingComponent({ rating, countApprovedReviews }: RatingComponentProps) {
  return (
    <div className="">
      <label>
        <StarIcon className="star" />
        <span>
          <FormatNumber value={rating} />
        </span>
        <span className="font-light txt-rating">
          {" "}
          (
          <FormatNumber value={countApprovedReviews} />)
        </span>
      </label>
    </div>
  );
}

function Preview({ categoryName, description }: PreviewProduct) {
  const { t } = useTranslation("common");
  return (
    <div className="preview jodit my-7.5">
      <div>
        <label>
          <p className="text-base font-medium">{t`category`}</p>
        </label>
        <label>
          <p className="text-base mt-2.5">{categoryName}</p>
        </label>
      </div>
      <div className="mt-5">
        <label>
          <p className="text-base font-medium">{t`description`}</p>
        </label>
        <label>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </label>
      </div>
    </div>
  );
}

function ImageInventory({ product }: ImageInventoryProps) {
  const { t } = useTranslation("common");

  const { mediaUrl } = product;

  return (
    <div className="relative flex product-name">
      {mediaUrl ? (
        <img alt="err" className="image" src={mediaUrl} />
      ) : null}
      {!mediaUrl ? <ImageError /> : null}
      {product.isNewProduct && product.mediaUrl ? (
        <div className="absolute top-0 newCollection">
          <NewCollectionIcon />
        </div>
      ) : null}
      <div className="float-left flex justify-between items-center">
        <label>
          <p className="txt-name">{product.productName}</p>
        </label>
      </div>
    </div>
  );
}

const MIN = 0;
const MAX = 1;
const defaultRange = { start: MIN, end: MAX };

export function ProductList() {
  const { t, i18n } = useTranslation("common");
  const history = useHistory();
  const location = useLocation();

  const [searchFilterChips, setSearchFilterChips] = useState<ChipType[]>([
    {
      id: "locationBase",
      name: "Thailand",
    },
  ]);
  const [range, setRange] = useState(defaultRange);
  const [rangeFilter, setRangeFilter] = useState(defaultRange);
  const [categoryFilter, setCategoryFilter] = useState({
    id: "",
    name: "",
    value: "",
  });
  const [searchFilter, setSearchFilter] = useState({
    id: "",
    name: "",
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [noData, setNoData] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(MAX);

  const dispatch = useDispatch();
  const { productData, loading } = useSelector((state: RootState) => state.inventoryManagements);
  const { categoryData } = useSelector((state: RootState) => state.categories);
  const { maxprice } = useSelector((state: RootState) => state.maxPriceLocation);

  useEffect(() => {
    const sesstionPage = sessionStorage.getItem("productPage") as string;
    if (sesstionPage) {
      const page = Number(sesstionPage);
      setTimeout(() => {
        setPage(page);
        sessionStorage.removeItem("productPage");
      }, 550);
    }
  }, [location.pathname]);



  useEffect(() => {
    const { maxPrice } = maxprice;
    setMaxPrice(maxPrice);
    setRange({ start: MIN, end: maxPrice });
  }, [maxprice.maxPrice]);

  const paramsObject = useDebounceValue(
    {
      page,
      pageSize,
      category: categoryFilter.name,
      minPrice: rangeFilter.start,
      maxPrice: rangeFilter.end,
      keyword: searchFilter.name,
      keySort: "MIN-MAX",
    },
    500,
  );

  const getData = useCallback(() => {
    if (paramsObject.maxPrice !== MAX && paramsObject.countryCode !== "") {
      dispatch(getProductAction(paramsObject));
    }
  }, [dispatch, JSON.stringify(paramsObject)]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    if (productData.data) {
      if (productData.data.length === 0 || !productData.data) {
        setNoData(true);
      } else if (productData.data.length > 0 && noData) {
        setNoData(false);
      }
    }
  }, [productData, loading, noData]);

  useEffect(() => {
    dispatch(getCategoryAction());
  }, [dispatch]);

  function handleChangePage(pageNumber: number) {
    setPage(pageNumber);
  }

  function handleChangePageSize(pageSizeNumber: number) {
    setPageSize(pageSizeNumber);
  }

  function handleDeleteSearchFilter(id: string) {
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));
    if (id === "category") {
      setCategoryFilter({
        id: "",
        name: "",
        value: "",
      });
    }
    if (id === "search") {
      setSearchFilter({
        id: "",
        name: "",
      });
    }
    if (id === "range") {
      setRangeFilter({ start: MIN, end: maxPrice });
      setRange({ start: MIN, end: maxPrice });
    }

    setPage(1);
  }
  function handleClearAll() {
    setSearchFilterChips([]);
    setSearchFilter({
      id: "",
      name: "",
    });
    setCategoryFilter({
      id: "",
      name: "",
      value: "",
    });
    setRangeFilter({ start: MIN, end: maxPrice });
    setRange({ start: MIN, end: maxPrice });
    setSearchFilterChips((prevState) => {
      return [
        ...prevState,
        {
          id: "locationBase",
          name: "Thailand",
        },
      ];
    });
    setPage(1);
  }

  function handleSubmitSearch(search: string) {
    const regex = /^ *$/;
    if (search && !regex.test(search)) {
      setSearchFilter({
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
            name: search,
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  }

  const handleChangePrice = () => {
    setRangeFilter(range);

    if (range.start === MIN && range.end === maxPrice) {
      return handleDeleteSearchFilter("range");
    }

    setSearchFilterChips((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i] && prevState[i].id === "range") prevState.splice(i, 1);
      }
      return [
        ...prevState,
        {
          id: "range",
          name: `${Intl.NumberFormat().format(range.start)}-${Intl.NumberFormat().format(
            range.end,
          )}`,
        },
      ];
    });
    setPage(1);
  };

  const handleFilterCategory = (category_id: string | null) => {
    if (category_id) {
      const categoryName = categoryData.find(
        (data: CategoryModel) => data._id === category_id,
      );
      setCategoryFilter({
        id: "category",
        name: categoryName ? categoryName._id : "",
        value: category_id,
      });
      setSearchFilterChips((prevState) => {
        for (let i = 0; i < prevState.length; i++) {
          if (prevState[i] && prevState[i].id === "category") prevState.splice(i, 1);
        }
        return [
          ...prevState,
          {
            id: "category",
            name: categoryName ? categoryName.category : "",
            value: category_id,
          },
        ];
      });
      history.push({
        search: "?page=1",
      });
      setPage(1);
    }
  };



  const { language } = i18n;

  const searchChips = useMemo(
    () =>
      searchFilterChips.map((item) => {
        if (item.id === "locationBase" && language === "th") {
          return { ...item, name: t(item.name?.toLocaleLowerCase() as "cambodia") };
        }
        return item;
      }),
    [language, searchFilterChips],
  );

  const redrectPage = async (product: ProductModel) => {

      sessionStorage.setItem("productPage", "" + page);
      setTimeout(() => {
        history.push(
          `/admin-dashboard/inventory-management/update-product-image-&-video/${product._id}`,
        );
      }, 100);

  };

  return (
    <div className="w-full">
      <div className="p-5 inventory-management ">
        <div className=" w-full bg-white shadow-navbar flex justify-between items-center search-filter">
          <div className="filter-group flex ">
            <div className="filter mr-7.5">
              <p className="float-left medium:text-sm large:text-4xl pl-5 pb-1.5">{t`category`}</p>
              <div className="pl-5 select-dropdown">
                <Select
                  className="w-[150px] 2xl:w-[343px]"
                  defaultValue={categoryFilter.name}
                  options={categoryData?.map((category: CategoryModel) => ({
                    title: category.category,
                    value: category._id,
                  }))}
                  placeholder={t("all-categories")}
                  onChange={handleFilterCategory}
                />
              </div>
            </div>
            <div className="filter">
              <label className="">
                <p className="float-left medium:text-sm large:text-4xl pb-1.5">{t`price-range`}</p>
                <div className="">
                  <SelectPriceRange
                    className="dropdown w-[250px] 2xl:w-[343px]"
                    min={MIN}
                    max={1000000}
                    range={range}
                    setRange={setRange}
                    handleChangePrice={handleChangePrice}
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="flex">
            <Search
              placeholder={t`search`}
              onSearch={handleSubmitSearch}
              value={searchFilter.name}
              className="w-[310px] 2xl:w-[350px]"
            />
           <Button
              variant="text"
              className="bg-orange-light text-base	text-white wide:ml-6 ml-3 wide:px-6 px-2 max-w-xs hover:bg-orange-hover"
              onClick={() => history.push(routeInventoryManagementProductCreateBase)}
            >
             Create New Product
            </Button>
          </div>
        </div>
        <div className="inventory-product-table mt-5">
          <Table>
            <TableHead>
              <CollapsibleHeadRow>
                <TableCell align="left">{t`product-name`}</TableCell>
                <TableCell>{t`price-retail`}</TableCell>
                <TableCell>{t`rating`}</TableCell>
                <TableCell align="center">{t`action`}</TableCell>
              </CollapsibleHeadRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell style={{ border: "none" }} colSpan={8}>
                    <Spinner />
                  </TableCell>
                </TableRow>
              ) : null}
              {!loading && productData.data
                ? productData.data.map((product: ProductModel) => {

                    const { category } =
                      categoryData.find(
                        (item: CategoryModel) => item._id === product.categoryId,
                      ) || {};

                    return (
                      <CollapsibleBodyRow
                        colSpan={9}
                        key={product._id}
                        preview={
                          <Preview
                            categoryName={category}
                            description={product.description}
                          />
                        }
                      >
                        <TableCell>
                          <div className="flex product-name">
                            <ImageInventory product={product} />
                          </div>
                        </TableCell>
                        <TableCell>{<FormatNumber value={product.price} />}</TableCell>

                        <TableCell>
                          <RatingComponent
                            rating={product.rating}
                            countApprovedReviews={product.ratingCount}
                          />
                        </TableCell>

                        <TableCell align="center">
                          <div className="flex action-buttons-wrapper">
                            <div className="m-auto flex">
                              <ActionButton action="edit" onClick={() => redrectPage(product)} />
                              <ActionButton action="delete" disabled />
                            </div>
                          </div>
                        </TableCell>
                      </CollapsibleBodyRow>
                    );
                  })
                : null}
            </TableBody>
          </Table>
          {!loading && noData ? (
            <div className="w-full h-72 grid justify-items-center text-center">
              <div className="mt-8">
                <NoDataIcon />
              </div>
              <p className="txt-no-data font-light">{t`no-data`}</p>
            </div>
          ) : null}

          <Pagination
            totalPage={Math.ceil(productData.total / productData.limit)}
            onPageChange={handleChangePage}
            onPageSizeChange={handleChangePageSize}
            selectedPage={productData.page}
          />
        </div>
      </div>
    </div>
  );
}
