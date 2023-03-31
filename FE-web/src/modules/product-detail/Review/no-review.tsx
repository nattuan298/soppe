import { Divider } from "@material-ui/core";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import useTranslation from "next-translate/useTranslation";

export default function NoReview() {
  const { t } = useTranslation("common");
  return (
    <div className="mt-6">
      <div className="flex justify-center items-center flex-col text-lighterGray mb-6">
        <ChatOutlinedIcon />
        <span>{t`no_review`}</span>
      </div>
      <Divider />
    </div>
  );
}
