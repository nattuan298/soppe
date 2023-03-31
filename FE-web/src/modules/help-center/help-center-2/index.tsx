/* eslint-disable indent */
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchHelpCenter } from "src/components/search/search-help-center";
import { fetchGetFAQList } from "src/feature/help-center/help-center-2/faqs.action";
import { RootState } from "src/state/store";
import { ItemCategory } from "../components/item-category";
import Link from "next/link";
import { FAQModel } from "src/feature/help-center/types";
import { LeftNavination } from "src/components";
import NoDataIcon from "src/components/svgs/no-data";
import { Divider } from "@material-ui/core";

export function HelpCenter2() {
  const { t, lang } = useTranslation("common");
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch();
  const { faqsData, loading } = useSelector((state: RootState) => state.faqs);
  const { id } = router.query;

  const getData = useCallback(() => {
    id && dispatch(fetchGetFAQList({ keyword: search.trim(), category: id }));
  }, [dispatch, search, id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="md:mx-auto w-auto md:w-1216 mb-8 px-4 md:px-0">
      <div className="float-left w-1/4 mb-8 hidden md:block">
        <LeftNavination />
      </div>
      <div className="md:float-left md:w-3/4 relative">
        <div className="absolute hidden sm:block md:right-0 md:-top-26 top-4 border md:border-0 right-[50%] translate-x-[50%] rounded-[7px] md:rounded-none md:translate-x-0">
          <SearchHelpCenter placeholder={t`search`} handleSearch={handleSearch} />
        </div>
        <div className="w-full pt-[15px] md:pt-0">
          <label>
            <p className="text-base font-medium">{faqsData.faqCategory.name}</p>
          </label>
          <Divider className="mt-[10px] block sm:hidden" />
          <div className="sm:mt-2">
            {faqsData?.faqs.length
              ? faqsData.faqs.map((item: FAQModel) => (
                  <Link
                    key={item._id}
                    href={{ pathname: "/help-center-3/[id]", query: { id: item._id } }}
                  >
                    <ItemCategory
                      nameSubCategory={
                        lang === "en"
                          ? `${item.question.en ? item.question.en : item.question.th}`
                          : `${item.question.th ? item.question.th : item.question.en}`
                      }
                    />
                  </Link>
                ))
              : null}
            {!loading && faqsData?.faqs.length === 0 ? (
              <div className="w-full">
                <div className="w-48 m-auto text-center mt-8">
                  <NoDataIcon />
                  <p>{t`no_data`}</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
