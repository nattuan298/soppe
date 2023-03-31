import useTranslation from "next-translate/useTranslation";
import { Title } from "src/components";

interface TitleEditRowType {
  title: string;
  onClick: () => void;
  className?: string;
  isRequired?: boolean;
}

export default function TitleEditRow({ title, onClick, className, isRequired }: TitleEditRowType) {
  const { t } = useTranslation("common");
  return (
    <div className={`flex justify-between items-center mb-1 ${className}`}>
      <Title title={title} isRequired={isRequired} />
      <span
        className="font-normal text-sm text-blue"
        role="button"
        onClick={onClick}
      >{t`edit`}</span>
    </div>
  );
}
