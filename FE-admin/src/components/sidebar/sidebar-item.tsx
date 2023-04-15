/* eslint-disable object-curly-spacing */
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export interface SidebarItemProps {
  title: string | ReactNode;
  url: string;
  icon: ReactNode;
  name?: string;
}

export default function SidebarItem({ title, url, icon }: SidebarItemProps) {
  return (
    <NavLink
      exact
      to={url}
      className="flex flex-col justify-center items-center sidebar-item text-white"
      activeClassName="active-sidebar-item"
    >
      {icon}
      {title}
    </NavLink>
  );
}
