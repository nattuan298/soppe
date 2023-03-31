// import SelectCountryPage from "./SelectCountry";
import { useSelector } from "react-redux";
import { RootState } from "src/state/store";
import UploadCard from "./UploadCard";
import Bank from "./Bank";
import BankUpload from "./BankUpload";

export default function ThaiPage() {
  const { childStep4 } = useSelector((state: RootState) => state.signup);
  return (
    <div>
      {childStep4 === 0 && <UploadCard />}
      {childStep4 === 1 && <Bank />}
      {childStep4 === 2 && <BankUpload />}
    </div>
  );
}
