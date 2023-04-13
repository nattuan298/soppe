import { GoBack } from "src/components";
import { Navbar } from "src/components/navbar/index";
import "./styles.css";

interface NavbarProductUpdateProps {
  url?: string;
  setCountry?: Function;
}

export function NavbarProductUpdate({ url, setCountry, ...props }: NavbarProductUpdateProps) {
  return (
    <Navbar
      isAuth={false}
      goBackLink="/admin-dashboard/inventory-management/product-list"
      {...props}
    >
      <div className="w-full navbar-product-update relative">
        <GoBack className="h-24" url={url} />
        <div className="dropdown-language absolute right-8 top-6"></div>
      </div>
    </Navbar>
  );
}
