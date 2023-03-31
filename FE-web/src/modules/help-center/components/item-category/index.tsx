import { Divider } from "@material-ui/core";
import { AllowRight } from "src/components/svgs";
import styles from "./item-category.module.css";

interface ItemCategoryProps {
  nameSubCategory?: string;
}

export function ItemCategory({ nameSubCategory, ...props }: ItemCategoryProps) {
  return (
    <>
      <div
        className={`${styles.item} w-full flex md:flex-none justify-between items-center`}
        {...props}
        role="button"
      >
        <div role="button" className={`${styles.txtEllipsis}`}>
          <span className="text-sm">{nameSubCategory}</span>
        </div>
        <div className="md:float-right">
          <AllowRight />
        </div>
      </div>
      <Divider />
    </>
  );
}
