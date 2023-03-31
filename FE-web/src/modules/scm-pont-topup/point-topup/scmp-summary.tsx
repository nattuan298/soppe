import { Paper } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "src/state/store";
import styles from "./style.module.css";

export function ScmpSummary() {
  const { t } = useTranslation("common");
  const totalSCMP = useSelector((state: RootState) => state.scmPoint.totalSCMP);
  return (
    <Paper variant="outlined" className="py-1 px-2 rounded-0.625 shadow-modalSummary">
      <div className="flex items-center h-3.75">
        <div className={`${styles.small_scm_logo} text-orange bg-orange bg-opacity-10 text-center`}>
          <div className={`${styles.scmp_text}`}>SCMP</div>
        </div>
        <div>{new Intl.NumberFormat("en-US").format(totalSCMP.data.scmPoint)}</div>
        <div className={`${styles.points}`}>
          <div>{t`points`}</div>
        </div>
      </div>
    </Paper>
  );
}
