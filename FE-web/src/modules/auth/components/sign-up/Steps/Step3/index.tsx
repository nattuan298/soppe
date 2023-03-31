import { useSelector } from "react-redux";
import { RootState } from "src/state/store";
import ProvinePage from "./Provine";
import SelectCountryPage from "./SelectCountry";

export default function Step3() {
  const { isSelectCountry } = useSelector((state: RootState) => state.signup);
  return (
    <div>
      {isSelectCountry && <SelectCountryPage />}
      {!isSelectCountry && <ProvinePage />}
    </div>
  );
}
