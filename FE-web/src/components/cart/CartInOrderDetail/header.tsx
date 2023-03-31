import useTranslation from "next-translate/useTranslation";

export default function Header() {
  const { t } = useTranslation("common");
  return (
    <div className="grid grid-cols-10 mt-4">
      <div className="grid grid-cols-12 col-span-9 mt-4">
        <div className="col-span-6 flex items-center">
          <span className="ml-2.5 mr-2 text-sm">{t`product`}</span>
        </div>
        <div className="col-span-2 text-center text-sm">{t`quantity`}</div>

        <div className="col-span-2 text-center text-sm">{t`price`}</div>
        <div className="col-span-2 text-center text-sm">{t`received_PV`}</div>
      </div>
      <div className="col-span-1" />
    </div>
  );
}
