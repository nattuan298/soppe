import { LogoSidebar } from "../icons";
import SidebarItem from "./sidebar-item";
import "./styles.css";
import { sidebarItems } from "./constants";


export function Sidebar() {
  return (
    <div className="sidebar fixed h-full bg-rose-700 z-10">
      <div className="logo flex justify-center items-center wide:mb-5 mb-2">
      </div>
      <div className="menu">
        {sidebarItems.map(({ url, title, icon, name }) => {
          if (name !== "Appearance" && url) {
            return <SidebarItem url={url} title={title} icon={icon} />;
          }
        })}
      </div>
    </div>
  );
}
