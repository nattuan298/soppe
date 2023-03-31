import { BackIcon } from "../svg";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
interface props {
  url: string;
}
export function TopBarBack(props: props) {
  const url = props;
  const { t } = useTranslation("common");
  const history = useRouter();
  const gotoPreviousPath = (): void => {
    history.push(`${url.url}`, undefined, { shallow: true });
  };
  return (
    <div className="breadcrumb">
      <div className="relative sm:static m-auto w-auto sm:w-1216 pt-9 pb-9 flex">
        <div
          className="absolute sm:static sm:ml-0 ml-2 back-icon cursor-pointer"
          onClick={gotoPreviousPath}
        >
          <BackIcon />
        </div>
        <div className="text-white text-xl font-bold flex justify-center w-full sm:w-auto">{t`common:signin`}</div>
      </div>
    </div>
  );
}
