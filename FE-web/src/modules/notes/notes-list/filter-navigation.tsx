import { CheckBox, CollapsibleBlock } from "src/components";
import useTranslation from "next-translate/useTranslation";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

interface FilterProps {
  categories: string[];
  category: string | undefined;
  setCategory: (category: string) => void;
  setLastInput?: (input: string) => void;
}

export default function FilterNavination({ categories = [], category, setCategory }: FilterProps) {
  const { t } = useTranslation("common");
  const [userQuery, setUserQuery] = useState<string | undefined>(category);

  const updateQuery = () => {
    if (userQuery) {
      setCategory(userQuery);
    } else if (userQuery === "") {
      setCategory("");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(debounce(updateQuery, 900), [userQuery]);
  useEffect(() => {
    delayedQuery();
    return delayedQuery.cancel;
  }, [userQuery, delayedQuery]);
  const checkedOption = (name: string) => {
    if (category === "") {
      return true;
    }
    return name === category;
  };

  const onChange = ({ name }: { name?: string | undefined; checked: boolean }) => {
    setUserQuery(name);
  };

  return (
    <div className="mr-6">
      <h3 className="text-base font-medium">{t`filter`}</h3>
      <CollapsibleBlock className="border-b pl-0 pb-5" heading={t`category`}>
        <label htmlFor="all-category" className="flex items-center">
          <CheckBox name="" checked={checkedOption("")} onChange={onChange} />
          <span className="ml-2.5 mr-2">{t`all-category`}</span>
        </label>
        <div className="ml-6">
          {categories.map((categoryName, index) => (
            <label key={index} htmlFor={categoryName} className="flex items-center mt-2.5">
              <CheckBox
                name={categoryName}
                checked={checkedOption(categoryName)}
                onChange={onChange}
              />
              <span className="ml-2.5 mr-2">
                {t(categoryName.toLowerCase().replaceAll(" ", "_"))}
              </span>
            </label>
          ))}
        </div>
      </CollapsibleBlock>
    </div>
  );
}
