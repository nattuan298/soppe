import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { GoBack, Modal } from "src/components";
import { routeFAQManagement } from "src/constants/routes";
import { FAQForm } from "src/modules/FAQ-management";
import { RootState } from "src/store";
import { setCanSwitch } from "src/store/faq.slice";

export default function FAQEdit() {
  const [lang, setLang] = useState<string>("English");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const url = new URL(window.location.href);
  const link = url.searchParams.get("languageContent");
  const { CanSwitch } = useSelector((state: RootState) => state.faq);
  const handleChangeLanguage = (country?: string) => {
    if (CanSwitch) {
      country && setLang(country);
    } else {
      setIsOpenModal(true);
    }
  };
  const handleConfirm = () => {
    dispatch(setCanSwitch(false));
    link === "English" ? setLang("Thai") : setLang("English");
    setIsOpenModal(false);
  };
  useEffect(() => {
    history.push(`?languageContent=${lang}`);
  }, [lang]);
  return (
    <main className="p-5">
      <GoBack
        url={routeFAQManagement}
        SelectLang
        onChange={handleChangeLanguage}
        CanSwitch={CanSwitch}
      />
      <FAQForm mode="edit"></FAQForm>
      <Modal
        open={isOpenModal}
        confirmType={"langContent"}
        onClose={() => {
          setIsOpenModal(false);
        }}
        onConfirm={handleConfirm}
      />
    </main>
  );
}
