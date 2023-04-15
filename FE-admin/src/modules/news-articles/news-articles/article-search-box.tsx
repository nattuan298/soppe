import { Grid } from "@material-ui/core";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { ButtonLink, Label, OptionType, Search, Select } from "src/components";
import { InputDatePicker2 } from "src/components/date-range-2";
import { getStatus } from "src/constants/common.constants";
import { routeArticleCreate } from "src/constants/routes";
import { textChangeLanguage } from "src/lib/format";
import { ArticleCategory, NewsArticleParams } from "src/types/news-article.model";

export interface ArticleSearchBoxProps {
  searchParams: NewsArticleParams;
  onSearchValueChange: (searchValue: NewsArticleParams) => void;
  allNewsArticleCates: ArticleCategory[];
}
export function ArticleSearchBox({
  onSearchValueChange,
  searchParams,
  allNewsArticleCates,
}: ArticleSearchBoxProps) {
  const { t } = useTranslation("common");
  const { status, startPublishDate, endPublishDate, category } = searchParams;

  function handleSelectDateChange(startDate: Date | undefined, endDate: Date | undefined) {
    onSearchValueChange({
      startPublishDate: startDate ? startDate.toISOString() : "",
      endPublishDate: endDate ? endDate.toISOString() : "",
    });
  }

  function handleKeywordChange(keyword: string) {
    onSearchValueChange({ keyword: keyword.trim() });
  }

  function getCateArtOptions(): OptionType[] | [] {
    return [
      { title: t("all-categories"), value: "All" },
      ...(allNewsArticleCates || []).map((cate) => ({
        title: cate.name,
        value: cate._id,
      })),
    ];
  }

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className="bg-white mb-5 my-5 px-5 shadow-boxWrapper rounded-primary py-[10px]"
    >
      <Grid item container xl={7} lg={7} spacing={2} className="filter-group">
        <Grid item xl={3} lg={3} className="filter">
          <Label>{t("status")}</Label>
          <Select
            className="w-full"
            placeholder={t("status")}
            defaultValue={status || "All"}
            options={getStatus(t)}
            onChange={(status) => {
              const searchValue = status === "All" ? "" : status;
              onSearchValueChange({ status: searchValue || "" });
            }}
          />
        </Grid>
        <Grid item xl={3} lg={3} className="filter">
          <Label>{t("category")}</Label>
          <Select
            className="w-full"
            placeholder={t("category")}
            defaultValue={category || "All"}
            options={getCateArtOptions()}
            onChange={(cateId) => {
              const searchValue = cateId === "All" ? "" : cateId;
              onSearchValueChange({ category: searchValue || "" });
            }}
          />
        </Grid>
        <Grid item xl={5} lg={5} className="filter">
          <Label>{t("publish-date-range")}</Label>
          <InputDatePicker2
            handleSelect={(startDate, endDate) => handleSelectDateChange(startDate, endDate)}
            className="h-12 w-full focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
            placeholder={t`all`}
            defaultFrom={startPublishDate ? dayjs(startPublishDate).toDate() : undefined}
            defaultTo={endPublishDate ? dayjs(endPublishDate).toDate() : undefined}
          />
        </Grid>
      </Grid>
      <Grid item container xl={4} lg={5} className="search-group">
        <Grid item xl={7} lg={7}>
          <Search
            className="w-full"
            placeholder={t`search`}
            onSearch={(keyword) => handleKeywordChange(keyword)}
            value={searchParams.keyword}
          />
        </Grid>
        <Grid item xl={5} lg={5}>
          <ButtonLink
            to={routeArticleCreate}
            variant="text"
            className="bg-orange-light text-white h-12 hover:bg-orange-hover"
          >
            {t("create-news-article")}
          </ButtonLink>
        </Grid>
      </Grid>
    </Grid>
  );
}
