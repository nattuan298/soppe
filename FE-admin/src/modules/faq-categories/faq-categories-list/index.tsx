/* eslint-disable indent */
import { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useStyles } from "./styles";
import { ActionButton, ChipType, Modal, Pagination, ResultFor, Spinner } from "src/components";
import "./styles.css";
import { NoDataIcon } from "src/components/icons";
import { ArticleCategorySearchBox } from "./faq-category-search-box";
import { SearchParams } from "src/types/common.modal";
import { useAppDispatch, useAppSelector } from "src/hooks/redux.hook";
import { formatNumber, getTotalPage, renderRangeDateStr } from "src/lib/common.lib";
import { identity, pickBy } from "lodash";
import { getDeleteCategoryAction, getListCategoryAction } from "src/store/faq-category.action";

export default function FAQCategoryList() {
  const [confirmContent, setConfirmContent] = useState("");
  const [modalType, setModalType] = useState<"delete" | "confirm">("delete");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCateId, setSelectedCateId] = useState("");
  const [searchParams, setSearchParams] = useState<SearchParams>({
    page: 1,
    pageSize: 5,
  });
  const { t } = useTranslation("common");
  const { root, body } = useStyles();
  const dispatch = useAppDispatch();
  const { FAQCategoryData, loading } = useAppSelector((state) => state.faqCategory);
  const { data, total } = FAQCategoryData;
  const totalPage = getTotalPage(total, searchParams.pageSize);

  useEffect(() => {
    dispatch(getListCategoryAction(searchParams));
  }, [JSON.stringify(searchParams)]);

  function handlePageChange(page: number, pageSize: number) {
    handleUpdateParams({ page, pageSize });
  }

  function handleUpdateParams(newParams: SearchParams) {
    const params = { ...searchParams, page: 1, ...newParams };
    setSearchParams(params);
  }

  function handleDeleteCates() {
    if (modalType === "confirm") {
      setOpenDeleteModal(false);
      setModalType("delete");
      return;
    }
    selectedCateId &&
      dispatch(
        getDeleteCategoryAction({
          id: selectedCateId,
          onSuccess() {
            const newParams = {
              ...searchParams,
              page:
                data.length === 1 && searchParams.page! > 1
                  ? searchParams.page! - 1
                  : searchParams.page,
            };
            setSearchParams(newParams);
            dispatch(getListCategoryAction(newParams));
            setOpenDeleteModal(false);
          },
          onError(err) {
            setConfirmContent(err?.message || "");
            setOpenDeleteModal(true);
            setModalType("confirm");
          },
        }),
      );
  }

  function handleDeleteResult(key: keyof SearchParams | "date" | "all") {
    const paramsMap = { ...searchParams };
    if (key === "date") {
      delete paramsMap["startDate"];
      delete paramsMap["endDate"];
    } else if (key === "all") {
      delete paramsMap["startDate"];
      delete paramsMap["endDate"];
      delete paramsMap["keyword"];
      delete paramsMap["status"];
    } else delete paramsMap[key];
    setSearchParams(paramsMap);
  }

  const RESULTS_SEARCH: ChipType[] = (() => {
    const { startDate, endDate, status, keyword } = searchParams;
    const dateStr = renderRangeDateStr(startDate, endDate, "DD-MM-YYYY");
    const trulyParams = pickBy(
      {
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

  const dateSlice = (date: string) => {
    let result = "";

    result =
      date.slice(0, 3) + t(date.slice(3, 6).toLocaleLowerCase() as "to_ship") + date.slice(6);
    console.log("result", result);

    return result;
  };

  return (
    <div className="faq-list px-5">
      <ArticleCategorySearchBox
        searchParams={searchParams}
        onSearchValueChange={handleUpdateParams}
      />
      {RESULTS_SEARCH.length > 0 && (
        <ResultFor
          arrayResult={RESULTS_SEARCH}
          onDelete={(key) => handleDeleteResult(key as keyof SearchParams | "date" | "all")}
          onClearAll={() => handleDeleteResult("all")}
        />
      )}
      <div className="bg-white shadow-boxWrapper rounded-primary px-5 pt-5">
        <Table className={root}>
          <TableHead>
            <TableRow>
              <TableCell className="w-[25%]">{t("category-name")}</TableCell>
              <TableCell>{t("created-date")}</TableCell>
              <TableCell align="center">{t("number_of_faq")}</TableCell>
              <TableCell align="center">{t("total-views")}</TableCell>
              <TableCell align="center">{t("action")}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell style={{ border: "none" }} colSpan={10}>
                  <Spinner />
                </TableCell>
              </TableRow>
            ) : (
              (data || []).map((categories) => (
                <TableRow className={body}>
                  <TableCell className="max-w-[300px]">
                    <div className="truncate-2-line break-words">{categories.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[120px]">
                      {dateSlice(dayjs(categories.createdAt).format("DD MMM YYYY HH:mm:ss"))}
                    </div>
                  </TableCell>
                  <TableCell align="center">{formatNumber(categories.totalFAQs)}</TableCell>
                  <TableCell align="center">{formatNumber(categories.totalViews)}</TableCell>
                  <TableCell>
                    <div className="flex justify-center action-buttons-wrapper space-x-2">
                      <Link
                        to={`/admin-dashboard/category-management/faq-category/edit-faq-category/${categories._id}`}
                      >
                        <ActionButton action="edit" />
                      </Link>
                      <ActionButton
                        action="delete"
                        onClick={() => {
                          setOpenDeleteModal(true);
                          setSelectedCateId(categories._id);
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
          open={openDeleteModal}
          confirmType={modalType}
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDeleteCates}
          content={confirmContent}
        />
      </div>
    </div>
  );
}
