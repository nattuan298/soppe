import { LogoSidebar } from "../icons";
import SidebarItem from "./sidebar-item";
import "./styles.css";
import { sidebarItems } from "./constants";
import AppearanceMenu from "./appearance-menu";
import CategoriesMenu from "./categories-menu";
import PlatformStatMenu from "./platform-stat-menu";

export function Sidebar() {
  return (
    <div className="sidebar fixed h-full bg-orange-light z-10">
      <div className="logo flex justify-center items-center wide:mb-5 mb-2">
        <LogoSidebar />
      </div>
      <div className="menu">
        {sidebarItems.map(({ url, title, icon, name }) => {
          if (name !== "Appearance" && url) {
            return <SidebarItem url={url} title={title} icon={icon} />;
          }
          if (name === "Categories") return <CategoriesMenu />;
          if (name === "platforms_stat") return <PlatformStatMenu />;
          return <AppearanceMenu />;
        })}
      </div>
    </div>
  );
}
