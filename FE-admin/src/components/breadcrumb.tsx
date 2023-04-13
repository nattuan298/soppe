import { useLocation } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { RootState } from "src/store";
import { useTranslation } from "react-i18next";
import { forEach } from "lodash";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      fontFamily: "Kanit",
      fontSize: 18,
    },
  }),
);

export default function Breadcrumb() {
  const location = useLocation();
  const { t } = useTranslation("common");
  let path = location.pathname;
  path = path.replace(/\/$/, "");
  const splitPath = path.split("/");

  const { root } = useStyles();
  const { params } = useSelector((state: RootState) => state.routerParams);

  const filteredSplitPath = splitPath.filter((path) => path && path !== params);

  const changeLanguage = (pageName: string): string => {
    let str = "";
    for (let i = 0; i < pageName.length; i++) {
      if (pageName[i] !== " ") {
        str += pageName[i];
      } else {
        str += "-";
      }
    }

    return str.trim();
  };

  return (
    <Breadcrumbs separator=">" aria-label="breadcrumb" className={root}>
      {filteredSplitPath.map((breadcrumb) => {
        const pageName = breadcrumb.replace(/[-]+/g, " ");

        const txtBreadcrumb = changeLanguage(pageName) as "admin-dashboard";

        return <p className="capitalize">{t(txtBreadcrumb)}</p>;
      })}
    </Breadcrumbs>
  );
}
