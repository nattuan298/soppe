import { useCallback, useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "src/store";
import { notifyToast } from "src/constants/toast";
import {
  ActionButton,
  ChipType,
  CollapsibleBodyRow,
  CollapsibleHeadRow,
  InputDatePicker,
  Modal,
  Pagination,
  ResultFor,
  Search,
  Spinner,
  TableBody,
} from "src/components";
import "./styles.css";
import { format } from "date-fns";
import { ReviewModel } from "src/types/review.model";
import { NoDataIcon, StarIcon } from "src/components/icons";
import { ImageError } from "src/components/image-error/image-error";
import { UserCard } from "src/components/user-card-review";
import { RejectReview, approveReview } from "src/services/reviews.services";
import { LightBox } from "react-lightbox-pack";
import "react-lightbox-pack/dist/index.css";
import { TableContainer } from "@material-ui/core";
import { getListReviewAction } from "src/store/review.action";
const queryString = require("query-string");

// function Preview({
//   detail,
//   image,
//   toggle,
//   handleClickImage,
//   setSIndex,
// }: {
//   detail: string;
//   image: string[];
// }) {
//   const { t } = useTranslation("common");
//   return (

//   );
// }

export default function ReviewList() {
  const [toggle, setToggle] = useState(false);
  const [sIndex, setSIndex] = useState(0);
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);
  const [selectedReview, setSelectedReview] = useState<ReviewModel>({
    _id: "",
    productMedia: "",
    memberName: "",
    memberAvatar: "",
    productName: "",
    sku: "",
    memberId: "",
    productQuality: 0,
    shippingQuality: 0,
    detail: "",
    createdAt: "",
    photos: [],
  });
  const [searchFilterChips, setSearchFilterChips] = useState<ChipType[]>([]);
  const [search, setSearch] = useState({
    id: "",
    name: "",
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"approve" | "reject">("approve");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const { t } = useTranslation("common");
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { ReviewData, loading, errorMessage } = useSelector((state: RootState) => state.review);

  const locationSearch = queryString.parse(location.search);
  const getData = useCallback(async () => {
    dispatch(
      getListReviewAction({
        page,
        pageSize,
        keyword: search.name,
        startDate: from?.toISOString(),
        endDate: to?.toISOString(),
      }),
    );
  }, [dispatch, search.name, page, pageSize, from, to]);
  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    if (ReviewData?.data?.length === 0 && !loading && errorMessage) {
      return;
    }
  }, [ReviewData, loading, errorMessage, t]);
  useEffect(() => {
    if (locationSearch.page) {
      setPage(locationSearch.page);
    }
  }, [locationSearch.page]);
  const handleClickImage = (state: boolean, sIndex: number) => {
    setToggle(state);
    setSIndex(sIndex);
  };
  const handleSelectDate = useCallback(
    (startDate, endDate) => {
      setFrom(startDate);
      setTo(endDate);
      if (startDate) {
        const newValue = `${startDate && format(startDate, "dd-MM-yyyy")} to ${
          endDate ? format(endDate, "dd-MM-yyyy") : "Unexpired"
        }`;
        setSearchFilterChips((prevState) => {
          for (let i = 0; i < prevState.length; i++) {
            if (prevState[i] && prevState[i].id === "Date") prevState.splice(i, 1);
          }
          return [
            ...prevState,
            {
              id: "Date",
              name: newValue,
            },
          ];
        });
        history.push({
          search: "?page=1",
        });
        setPage(1);
      } else {
        setFrom(null);
        setTo(null);
        setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== "Date"));
      }
    },
    [history],
  );
  function handleDeleteSearchFilter(id: string) {
    setSearchFilterChips((prevState) => prevState.filter((result) => result.id !== id));

    if (id === "search") {
      setSearch({
        id: "",
        name: "",
      });
    }
    if (id === "Date") {
      setFrom(null);
      setTo(null);
    }
  }
  function handleClearAll() {
    setSearchFilterChips([]);
    setSearch({
      id: "",
      name: "",
    });
    setFrom(null);
    setTo(null);
  }
  function handleApproveAction(data: ReviewModel) {
    setIsOpenModal(true);
    setConfirmType("approve");
    setSelectedReview(data);
  }
  function handleRejectAction(data: ReviewModel) {
    setIsOpenModal(true);
    setConfirmType("reject");
    setSelectedReview(data);
  }

  function handleCancelConfirm() {
    setIsOpenModal(false);
  }
  async function handleConfirm() {
    if (confirmType === "approve") {
      try {
        await approveReview(selectedReview._id);
        setIsOpenModal(false);
        handleUpdateTable();
        handleDelete();
      } catch (e) {
        //
      }
    }
    if (confirmType === "reject") {
      try {
        await RejectReview(selectedReview._id);
        setIsOpenModal(false);
        handleUpdateTable();
        handleDelete();
      } catch (e) {
        //
      }
    }
  }
  function handleSubmitSearch(search: string) {
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
  function handleChangePage(pageNumber: number) {
    setPage(pageNumber);
  }
  function handleChangePageSize(pageSizeNumber: number) {
    setPageSize(pageSizeNumber);
  }
  function handleUpdateTable() {
    getData();
  }
  function handleDelete() {
    if (ReviewData.data.length === 1 && page > 1) {
      setPage((page) => page - 1);
    } else {
      getData();
    }
  }

  const chipResult = useMemo(
    () =>
      searchFilterChips.map((chip: ChipType) => {
        if (chip.id === "date") {
          return {
            id: chip.id,
            name: `${chip.name.slice(1, 11)} ${t("to")} ${chip.name.slice(15)}`,
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
    <div className="faq-list">
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className="bg-white mb-5 px-5 search-filter"
      >
        <Grid item container xl={8} lg={8} spacing={2} sm={8} className="filter-group">
          <Grid item xl={4} lg={4} sm={4} className="filter">
            <p>{t("date-range")}</p>
            <InputDatePicker
              handleSelect={handleSelectDate}
              className="h-12 w-full focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
              defaultFrom={from}
              defaultTo={to}
              placeholder={t`all`}
            />
          </Grid>
        </Grid>
        <Grid item container xl={3} lg={3} sm={3} className="search-group">
          <Search
            className="w-full"
            placeholder={t`search`}
            onSearch={handleSubmitSearch}
            value={search.name}
          />
        </Grid>
      </Grid>

      {chipResult.length > 0 && (
        <ResultFor
          arrayResult={chipResult}
          onDelete={handleDeleteSearchFilter}
          onClearAll={handleClearAll}
        />
      )}

      <div className="faq-table bg-white">
        <TableContainer style={{ minWidth: "100%" }}>
          <Table>
            <TableHead>
              <CollapsibleHeadRow>
                <TableCell>{t("product-name")}</TableCell>
                <TableCell>{t("sku")}</TableCell>
                <TableCell>{t("reviewer")}</TableCell>
                <TableCell>{t("product-quality")}</TableCell>
                <TableCell>{t("shipping-handling")}</TableCell>
                <TableCell>{t("date")}</TableCell>
                <TableCell align="center">{t("action")}</TableCell>
                <TableCell />
              </CollapsibleHeadRow>
            </TableHead>
            <TableBody loading={loading} colSpan={8} dataLength={ReviewData?.data?.length}>
              {ReviewData?.data?.map((Review: ReviewModel) => (
                <CollapsibleBodyRow
                  colSpan={11}
                  key={Review._id}
                  preview={
                    <div className="preview jodit my-7.5">
                      <div>
                        <label>
                          <p className="text-base font-medium">{t`review`}</p>
                        </label>
                        <label>
                          <p className="text-base mt-2.5 text-detail">{Review.detail}</p>
                        </label>
                      </div>
                      <div className="mt-5">
                        <div className="flex">
                          {Review.photos?.map((image, index) => (
                            <img
                              key={index}
                              alt="err"
                              className="image mr-2.5"
                              src={image}
                              onClick={() => handleClickImage(true, index)}
                            />
                          ))}
                        </div>
                      </div>
                      <LightBox
                        state={toggle}
                        event={handleClickImage}
                        data={Review.photos?.map((url) => ({
                          image: url,
                        }))}
                        imageWidth="60vw"
                        imageHeight="70vh"
                        thumbnailHeight={50}
                        thumbnailWidth={50}
                        setImageIndex={setSIndex}
                        imageIndex={sIndex}
                      />
                    </div>
                  }
                >
                  <TableCell>
                    <div className="flex product-name">
                      <div className="float-left product">
                        {Review.productMedia ? (
                          <img alt="err" className="image" src={Review.productMedia} />
                        ) : (
                          <ImageError />
                        )}
                      </div>
                      <div className="float-left flex justify-between items-center">
                        <label>
                          <p className="txt-name truncate-2-line">{Review.productName}</p>
                        </label>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{Review.sku}</TableCell>
                  <TableCell>
                    <UserCard
                      memberId={Review.memberId}
                      avatar={Review.memberAvatar}
                      name={Review.memberName}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="wide:pl-7 min-w-max">
                      <StarIcon className="star" />
                      {Review.productQuality}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="wide:pl-4 min-w-max">
                      <StarIcon className="star" />
                      {Review.shippingQuality}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px]">
                    <div className="max-w-[120px]">
                      {Review.createdAt && dayjs(Review.createdAt).format("DD MMM YYYY HH:mm:ss")}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center action-buttons-wrapper">
                      <div
                        className="approve"
                        onClick={() => {
                          handleApproveAction(Review);
                        }}
                      >
                        {t`approve`}
                      </div>
                      <div className="line"></div>
                      <div
                        className="reject"
                        onClick={() => {
                          handleRejectAction(Review);
                        }}
                      >
                        {t`reject`}
                      </div>
                    </div>
                  </TableCell>
                </CollapsibleBodyRow>
              ))}
              {ReviewData.data.length === 0 && !loading && (
                <TableRow>
                  <TableCell style={{ border: "none" }} colSpan={10}>
                    <div className="text-center">
                      <NoDataIcon className="mx-auto mb-5" />
                      <span className="text-base">{t`no-data`}</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          totalPage={Math.ceil(ReviewData?.total / ReviewData?.limit)}
          onPageChange={handleChangePage}
          onPageSizeChange={handleChangePageSize}
          notPreventChangeRoute
          selectedPage={page}
        />

        <Modal
          open={isOpenModal}
          confirmType={confirmType}
          onClose={handleCancelConfirm}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
