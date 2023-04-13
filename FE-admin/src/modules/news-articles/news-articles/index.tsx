/* eslint-disable indent */
import { useEffect, useMemo, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import {
  ActionButton,
  ChipType,
  Modal,
  Pagination,
  ResultFor,
  Spinner,
  StatusDropdown,
} from "src/components";
import { NoDataIcon } from "src/components/icons";
import { ArticleSearchBox } from "./article-search-box";
import { resetDetailNewsArticles } from "src/store/news-articles.slice";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { formatNumber, getTotalPage, renderRangeDateStr, toQueryString } from "src/lib/common.lib";
import { identity, pickBy } from "lodash";
import { routeArticleDetail, routeArticleEdit } from "src/constants/routes";
import { NewsArticle, NewsArticleParams } from "src/types/news-article.model";
import { useStyles } from "./styles";
import { activeService, inActiveService } from "src/services/news-articles.services";
import { getAllCategoryArtAction } from "src/store/news-article-categories.action";
import { deleteNewsAction, getNewsAction } from "src/store/news-articles.action";
import { notifyToast } from "src/constants/toast";

export default function NewsArticleList() {
  const [openActionModal, setOpenActionModal] = useState(false);
  const [actionModal, setActionModal] = useState<"delete" | "action" | "confirm">("action");
  const [contentConfirm, setContentConfirm] = useState<string | undefined>();
  const [selectedNewsArt, setSelectedNewsArt] = useState<NewsArticle>();
  const [searchParams, setSearchParams] = useState<NewsArticleParams>({
    page: 1,
    pageSize: 5,
  });
  const [userStatus, setUserStatus] = useState("");
  const lang = localStorage.getItem("i18nextLng");
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const {
    newsArt: { newsArticles, isGettingNewsArt },
    newsArtCates: { allNewsArticleCates },
  } = useAppSelector((state) => state);
  const { data, total } = newsArticles;
  const totalPage = getTotalPage(total, searchParams.pageSize);
  const { root, body } = useStyles();

  useEffect(() => {
    dispatch(getAllCategoryArtAction());
    dispatch(resetDetailNewsArticles());
  }, []);

  useEffect(() => {
    dispatch(getNewsAction(searchParams));
  }, [JSON.stringify(searchParams)]);

  function handlePageChange(page: number, pageSize: number) {
    handleUpdateParams({ page, pageSize });
  }

  function handleUpdateParams(newParams: NewsArticleParams) {
    const params = { ...searchParams, page: 1, ...newParams };
    setSearchParams(params);
  }

  async function handleConfirm() {
    if (actionModal === "delete") handleDeleteCates();
    if (actionModal === "action") {
      if (userStatus === "active") {
        try {
          setOpenActionModal(false);
          const rs = await activeService(selectedNewsArt?._id);
          if (rs.status === 400) {
            notifyToast("error", rs?.data?.message ?? "error", t);
            return;
          }
          onSuccess();
        } catch (e) {
          //
        }
      }
      if (userStatus === "inactive") {
        try {
          setOpenActionModal(false);

          const rs = await inActiveService(selectedNewsArt?._id);
          if (rs.status === 400) {
            notifyToast("error", rs?.data?.message ?? "error", t);
            return;
          }
          onSuccess();
        } catch (e) {
          //
        }
      }
      setOpenActionModal(false);
    }
    if (actionModal === "confirm") setOpenActionModal(false);
  }

  function handleDeleteCates() {
    selectedNewsArt &&
      dispatch(
        deleteNewsAction({
          id: selectedNewsArt._id,
          onSuccess,
          onError: (err) => onError(err?.message),
        }),
      );
  }

  function onSuccess() {
    const newParams = {
      ...searchParams,
      page:
        data.length === 1 && searchParams.page! > 1 ? searchParams.page! - 1 : searchParams.page,
    };
    setSearchParams(newParams);
    dispatch(getNewsAction(newParams));
    setOpenActionModal(false);
  }
  function onError(err?: string) {
    setOpenActionModal(true);
    setActionModal("confirm");
    setContentConfirm(err);
  }

  function getCateNameById(cateId?: string) {
    if (!cateId) return "";
    return allNewsArticleCates.find((cate) => cate._id === cateId)?.name || "";
  }

  function handleDeleteResult(key: keyof NewsArticleParams | "date" | "all") {
    const paramsMap = { ...searchParams };
    if (key === "date") {
      delete paramsMap["startPublishDate"];
      delete paramsMap["endPublishDate"];
    } else if (key === "all") {
      delete paramsMap["startPublishDate"];
      delete paramsMap["endPublishDate"];
      delete paramsMap["keyword"];
      delete paramsMap["status"];
      delete paramsMap["category"];
    } else delete paramsMap[key];
    setSearchParams(paramsMap);
  }

  const RESULTS_SEARCH: ChipType[] = (() => {
    const { startPublishDate, endPublishDate, status, keyword, category } = searchParams;
    const dateStr = renderRangeDateStr(startPublishDate, endPublishDate, "DD-MM-YYYY");
    const trulyParams = pickBy(
      {
        category: getCateNameById(category),
        status,
        date: dateStr,
        keyword,
      },
      identity,
    );
    return Object.keys(trulyParams).map((key) => ({
      id: key + "",
      name: trulyParams[key] + "",
    }));
  })();

  const chipResult = useMemo(
    () =>
      RESULTS_SEARCH.map((chip: ChipType) => {
        if (chip.id === "status") {
          return {
            id: chip.id,
            name: t(chip.name.toLocaleLowerCase() as "to_ship"),
          };
        } else if (chip.id === "date") {
          return {
            id: chip.id,
            name: `${chip.name.slice(0, 11)} ${t("to") as "to_ship"} ${chip.name.slice(14)}`,
          };
        } else if (chip.id === "category") {
          return {
            id: chip.id,
            name: t(chip.name.toLocaleLowerCase() as "to_ship"),
          };
        }
        return {
          id: chip.id,
          name: chip.name,
        };
      }),
    [t, RESULTS_SEARCH],
  );

  const dateSlice = (date: string) => {
    let result = "";

    result =
      date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);

    return result;
  };

  const publicDateSlice = (date: string) => {
    let result = "";
    if (date.includes("Unexpired")) {
      result =
        date.slice(0, 3) +
        t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") +
        date.slice(6, 12) +
        t(date.slice(12, 14).toLocaleLowerCase() as "to_ship") +
        date.slice(14, 15) +
        t(date.slice(15).toLocaleLowerCase() as "to_ship");
    } else {
      result = result =
        date.slice(0, 3) +
        t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") +
        date.slice(6, 12) +
        t(date.slice(12, 14).toLocaleLowerCase() as "to_ship") +
        date.slice(14, 18) +
        t(date.slice(18, 21).toLocaleLowerCase() as "to_ship") +
        date.slice(21);
    }

    return result;
  };

  return (
    <div className="px-5">
      <ArticleSearchBox
        allNewsArticleCates={allNewsArticleCates}
        searchParams={searchParams}
        onSearchValueChange={handleUpdateParams}
      />
      {chipResult.length > 0 && (
        <ResultFor
          arrayResult={chipResult}
          onDelete={(key) => handleDeleteResult(key as keyof NewsArticleParams | "date" | "all")}
          onClearAll={() => handleDeleteResult("all")}
        />
      )}
      <div className="bg-white shadow-boxWrapper rounded-primary px-5 pt-5">
        <Table className={root}>
          <TableHead>
            <TableRow>
              <TableCell>{t("news-article-name")}</TableCell>
              <TableCell>{t("created-date")}</TableCell>
              <TableCell>{t("publish-period")}</TableCell>
              <TableCell>{t("views")}</TableCell>
              <TableCell>{t("category")}</TableCell>
              <TableCell>{t("status")}</TableCell>
              <TableCell align="center">{t("action")}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {isGettingNewsArt ? (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={10}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              (data || []).map((el) => (
                <TableRow className={body}>
                  <TableCell className="max-w-[300px] truncate-2-line">
                    <div className="flex items-center space-x-3 break-words">
                      <img
                        src={el.imageUrl}
                        alt="thumbnail"
                        className="w-20 h-20 object-cover flex-shrink-0 rounded-primary border border-warmGray-300"
                      />
                      <div className="truncate-2-line">
                        {lang === "en"
                          ? `${el.name.en ? el.name.en : el.name.th}`
                          : `${el.name.th ? el.name.th : el.name.en}`}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px]">
                    <div className="max-w-[120px]">
                      {dateSlice(dayjs(el.createdAt).format("DD MMM YYYY HH:mm:ss"))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[150px]">
                    <div className="max-w-[120px]">
                      {publicDateSlice(renderRangeDateStr(el.startPublishDate, el.endPublishDate))}
                    </div>
                  </TableCell>
                  <TableCell>{formatNumber(el.views)}</TableCell>
                  <TableCell className="max-w-[300px]">
                    <div className="truncate-2-line break-words">
                      {getCateNameById(el.category)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusDropdown
                      data={true}
                      statusOptions={["active", "inactive"]}
                      defaultValue={el.status.toLowerCase()}
                      onChange={(_, status) => {
                        if (status === el.status.toLowerCase()) return;
                        setActionModal("action");
                        setOpenActionModal(true);
                        setSelectedNewsArt(el);
                        setUserStatus(status);
                      }}
                      trans={t}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center action-buttons-wrapper space-x-2">
                      <Link
                        to={toQueryString(routeArticleDetail, {
                          id: el._id,
                        })}
                      >
                        <ActionButton action="view" />
                      </Link>
                      <Link
                        to={toQueryString(routeArticleEdit, {
                          id: el._id,
                          name:
                            lang === "en"
                              ? `${el.name.en ? el.name.en : el.name.th}`
                              : `${el.name.th ? el.name.th : el.name.en}`,
                        })}
                      >
                        <ActionButton action="edit" />
                      </Link>
                      <ActionButton
                        action="delete"
                        onClick={() => {
                          setActionModal("delete");
                          setOpenActionModal(true);
                          setSelectedNewsArt(el);
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))
            )}
            {(!data || data.length === 0) && (
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

        <div className="py-10">
          <Pagination
            totalPage={totalPage}
            onPageChange={(page, size) => handlePageChange(page, size)}
            onPageSizeChange={() => {}}
            notPreventChangeRoute={true}
            selectedPage={searchParams.page}
          />
        </div>

        <Modal
          content={contentConfirm}
          open={openActionModal}
          confirmType={actionModal}
          onClose={() => setOpenActionModal(false)}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}
