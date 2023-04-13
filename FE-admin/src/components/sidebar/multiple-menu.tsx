import { Fragment, MouseEvent, ReactElement, useMemo, useState } from "react";
import Popover from "@material-ui/core/Popover";
import { NavLink, useLocation } from "react-router-dom";

export type MultipleMenuProps = {
  title: string;
  icon: ReactElement;
  routes: {
    route: string;
    name: string;
  }[];
  rootRoute?: string;
};
export default function MultipleMenu({ title, routes, icon, rootRoute }: MultipleMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleToggle = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const location = useLocation();

  const classNav = useMemo(() => {
    const isInclude = rootRoute && location.pathname.includes(rootRoute);
    if (open || isInclude) {
      return "flex flex-col justify-center items-center sidebar-item text-white cursor-pointer active-sidebar-item";
    }
    return "flex flex-col justify-center items-center sidebar-item text-white cursor-pointer";
  }, [open, location, rootRoute]);

  return (
    <Fragment>
      <div
        aria-controls="simple-menu"
        aria-haspopup="true"
        className={classNav}
        onClick={handleToggle}
      >
        {icon}
        {title}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className="appearance-popover"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {routes.map(({ route, name }) => (
          <NavLink
            exact
            to={route}
            onClick={handleClose}
            activeClassName="active-menu-item"
            className="flex flex-col justify-center items-start menu-item hover:bg-orange-light hover:text-white"
          >
            {name}
          </NavLink>
        ))}
      </Popover>
    </Fragment>
  );
}
