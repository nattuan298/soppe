import { Chip } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useStyles } from "./styles";
import "./styles.css";

interface ResultForProps {
  arrayResult: ChipType[];
  onDelete?: (id: string) => void;
  onClearAll?: () => void;
}

export interface ChipType {
  id: string;
  name: string;
}

export function ResultFor({ arrayResult, onDelete, onClearAll, ...props }: ResultForProps) {
  const { t } = useTranslation("common");
  const classes = useStyles();

  const handleDelete = (idRemove: string) => () => {
    onDelete?.(idRemove);
  };
  const handleClearAll = () => {
    onClearAll?.();
  };

  return (
    <>
      <div className="h-14 m-auto mt-5" {...props}>
        <label className="float-left pt-3">
          <span>{t`results-for`}</span>
        </label>
        <div className={`${classes.root} float-left`}>
          {arrayResult.map((data: ChipType) => {
            return (
              <li key={data.id}>
                <Chip label={data.name} onDelete={handleDelete(data.id)} className={classes.chip} />
              </li>
            );
          })}
        </div>
        <label className="float-left pt-3">
          <span
            className="font-medium clear-all hover:text-orange-hover"
            role="button"
            onClick={handleClearAll}
          >{t`clear-all`}</span>
        </label>
      </div>
    </>
  );
}
