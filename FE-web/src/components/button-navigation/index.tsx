import { Fragment, MouseEvent, useState } from "react";
import { Popover } from "@material-ui/core";

import { LeftNavination } from "src/components";
import { NavBarIcon } from "src/components/svg";

export function ButtonNavagation() {
  const [open, setOpen] = useState<null | HTMLElement>(null);

  const handleCloseNavigation = () => {
    setOpen(null);
  };

  const showNavigation = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  return (
    <Fragment>
      <button onClick={showNavigation} className="p-0 outline-none">
        <NavBarIcon />
      </button>
      <Popover
        id="navigation-menu"
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={handleCloseNavigation}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <LeftNavination handleCloseNavigation={handleCloseNavigation} inHeader={true} />
      </Popover>
    </Fragment>
  );
}
