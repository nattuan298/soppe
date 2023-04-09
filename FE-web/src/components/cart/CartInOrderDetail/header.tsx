import useTranslation from "next-translate/useTranslation";

export default function Header() {
  const { t } = useTranslation("common");
  return (
    <div className="grid grid-cols-12 mt-4">
      <div className="grid grid-cols-12 col-span-12 mt-4">
        <div className="col-span-6 flex items-center">
          <span className="ml-2.5 mr-2 text-sm">{t`product`}</span>
        </div>
        <div className="col-span-2 text-center text-sm">{t`quantity`}</div>

        <div className="col-span-4 text-center text-sm">{t`price`}</div>
      </div>
    </div>
  );
}
