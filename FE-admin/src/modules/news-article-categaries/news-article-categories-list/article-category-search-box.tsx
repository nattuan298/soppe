import { Grid } from "@material-ui/core";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { ButtonLink, Label, Search } from "src/components";
import { InputDatePicker2 } from "src/components/date-range-2";
import { routeArticleCategoryCreate } from "src/constants/routes";
import { SearchParams } from "src/types/common.modal";

export interface ArticleCategorySearchBoxProps {
  searchParams: SearchParams;
  onSearchValueChange: (searchValue: SearchParams) => void;
}
export function ArticleCategorySearchBox({
  onSearchValueChange,
  searchParams,
}: ArticleCategorySearchBoxProps) {
  const { t } = useTranslation("common");
  const { startDate, endDate } = searchParams;

  function handleSelectDateChange(startDate: Date | undefined, endDate: Date | undefined) {
    onSearchValueChange({
      startDate: startDate ? startDate.toISOString() : "",
      endDate: endDate ? endDate.toISOString() : "",
    });
  }

  const handleKeywordChange = (keyword: string) => {
    onSearchValueChange({ keyword: keyword.trim() });
  };
  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      className="bg-white mb-5 my-5 px-5 search-filter"
    >
      <Grid item container xl={7} lg={7} spacing={2} className="filter-group">
        <Grid item xl={5} lg={5} className="filter">
          <Label>{t("created-date")}</Label>
          <InputDatePicker2
            handleSelect={(startDate, endDate) => handleSelectDateChange(startDate, endDate)}
            className="h-12 w-full focus:outline-none focus:ring-orange-light focus:ring-1 rounded pl-4 placeholder-italic"
            placeholder={t`all`}
            defaultFrom={startDate ? dayjs(startDate).toDate() : undefined}
            defaultTo={endDate ? dayjs(endDate).toDate() : undefined}
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
            to={routeArticleCategoryCreate}
            variant="text"
            className="bg-orange-light text-white h-full hover:bg-orange-hover"
          >
            {t("create-new-category")}
          </ButtonLink>
        </Grid>
      </Grid>
    </Grid>
  );
}
