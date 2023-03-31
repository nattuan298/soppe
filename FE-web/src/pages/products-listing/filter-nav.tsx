import { CheckBox, CollapsibleBlock, SelectPriceRange } from "src/components";
import useTranslation from "next-translate/useTranslation";
import { CategoryModel } from "src/feature/categories/types";
import CloseIcon from "@material-ui/icons/Close";

const MIN = 0;
interface FilterProps {
  categories: CategoryModel[];
  category: string | null;
  range: { start: number; end: number };
  maxRangePrice: number;
  setCategory: (category: string) => void;
  setRange: (range: { start: number; end: number }) => void;
  clearAllFilter: () => void;
  applyFilter: () => void;
  setLastInput: (input: string) => void;
  isMobile: boolean;
  onCloseFilter?: () => void;
}

export default function FilterNavination({
  categories = [],
  category,
  maxRangePrice,
  setCategory,
  range,
  setRange,
  clearAllFilter,
  applyFilter,
  setLastInput,
  isMobile = false,
  onCloseFilter,
}: FilterProps) {
  const { t } = useTranslation("common");

  const checkedOption = (name: string) => {
    if (category === "all-category") {
      return true;
    }
    return name === category;
  };

  const onChange = ({ name }: { name?: string | undefined; checked: boolean }) => {
    if (name) {
      setCategory(name);
    }
  };

  return (
    <div
      className={`${isMobile ? "block sm:hidden" : "hidden sm:block"} sm:w-80 sm:mr-6 sm:p-0 p-2`}
    >
      <div className="flex sm:block justify-between items-center">
        <h3 className="text-base font-medium">{t`filter`}</h3>
        {isMobile && (
          <CloseIcon
            className="text-black cursor-pointer"
            fontSize="small"
            onClick={onCloseFilter}
          />
        )}
      </div>
      <CollapsibleBlock className="border-b pl-0 pb-5" heading={t`category`}>
        <label htmlFor="all-category" className="flex items-center">
          <CheckBox
            name="all-category"
            checked={checkedOption("all-category")}
            onChange={onChange}
          />
          <span className="ml-2.5 mr-2">{t`all-category`}</span>
        </label>
        <div className="ml-6">
          {categories.map(({ categoryName, categoryId }) => (
            <label key={categoryId} htmlFor={categoryId} className="flex items-center mt-2.5">
              <CheckBox name={categoryId} checked={checkedOption(categoryId)} onChange={onChange} />
              <span className="ml-2.5 mr-2">{categoryName}</span>
            </label>
          ))}
        </div>
      </CollapsibleBlock>
      <CollapsibleBlock className="border-b pl-0 pb-5" heading={t`common:price-range`}>
        <SelectPriceRange
          min={MIN}
          max={maxRangePrice}
          range={range}
          setRange={setRange}
          setLastInput={setLastInput}
        />
      </CollapsibleBlock>
      <div className="w-full flex flex-col-reverse sm:flex-row justify-evenly items-center">
        <button
          className="text-base sm:text-lg mt-3 pt-3 text-orange text-center"
          onClick={clearAllFilter}
        >{t`common:clear-all-filters`}</button>
        <button
          className="text-base sm:text-lg mt-3 pt-0 sm:pt-3 bg-orange sm:bg-transparent text-white sm:text-orange text-center w-full  sm:w-auto h-[45px] sm:h-auto rounded"
          onClick={applyFilter}
        >{t`common:apply-filters`}</button>
      </div>
    </div>
  );
}
